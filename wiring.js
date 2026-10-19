// DeskBotStack Dynamic Wiring & LittleG Popup Extension
(function () {

  // ==========================================
  // PART 1: EXPLODED VIEW MODAL & TILE BUTTON
  // ==========================================
  function ensureModal() {
    let modal = document.getElementById('little-g-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'little-g-modal';
      modal.className = 'fixed inset-0 z-[100] hidden bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4';
      modal.innerHTML = `
        <div class="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
          <div class="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div>
              <h3 class="text-sm font-bold text-white uppercase tracking-wider font-mono">DBS-LG-001: Master Exploded Assembly</h3>
              <p class="text-xs text-slate-400 font-mono">16 Functional Subsystems &bull; Metric Fastener Schedule</p>
            </div>
            <button id="close-teaser-modal" class="text-slate-400 hover:text-white text-2xl font-bold px-2 cursor-pointer">&times;</button>
          </div>
          <div class="overflow-auto p-4 flex items-center justify-center bg-slate-950">
            <img src="watermarked_img_12370607140268248611.jpg" alt="LittleG Exploded Blueprint View" class="w-full h-auto rounded-lg border border-slate-800">
          </div>
          <div class="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
            <span class="text-xs text-slate-400 font-mono">Drawing No: DBS-LG-001</span>
            <button id="modal-close-btn" class="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase rounded-lg cursor-pointer">
              Close Preview
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const closeModal = () => modal.classList.add('hidden');
      document.getElementById('close-teaser-modal')?.addEventListener('click', closeModal);
      document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    }
    return modal;
  }

  function injectBlueprintTileButton() {
    ensureModal();

    // Remove old bulky showcase if present
    const oldShowcase = document.getElementById('little-g-showcase');
    if (oldShowcase) oldShowcase.remove();

    // Look for the LittleG card in Starter Blueprints or the Physical BOM header
    const littleGCard = Array.from(document.querySelectorAll('.blueprint-card, div')).find(el => 
      el.textContent && el.textContent.includes('LittleG') && el.querySelector('p, span')
    );

    // Look for the Physical BOM header when LittleG is active
    const bomHeader = Array.from(document.querySelectorAll('h3, h4, div')).find(el => 
      el.textContent && el.textContent.includes('Physical Setup: LittleG')
    );

    // Target either the BOM header bar or the LittleG blueprint card
    const target = bomHeader || littleGCard;
    if (!target) return;

    if (document.getElementById('btn-tile-exploded')) return;

    const btn = document.createElement('button');
    btn.id = 'btn-tile-exploded';
    btn.className = 'ml-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 font-mono text-xs font-bold transition-all cursor-pointer shadow-sm align-middle';
    btn.innerHTML = `<span>⚡</span> Inspect Exploded Blueprint`;
    btn.onclick = () => {
      const m = ensureModal();
      m.classList.remove('hidden');
    };

    if (bomHeader) {
      bomHeader.appendChild(btn);
    } else if (littleGCard) {
      littleGCard.appendChild(btn);
    }
  }

  // ==========================================
  // PART 2: DYNAMIC WIRING SCHEMATIC IN TRAY
  // ==========================================
  function getWorkbenchDrawer() {
    const buttons = Array.from(document.querySelectorAll('button'));
    const checklistBtn = buttons.find(b => 
      b.textContent.includes('Workbench Checklist') || 
      b.textContent.includes('1-Click Computer Setup')
    );
    return checklistBtn ? checklistBtn.closest('div.fixed, aside, [class*="tray"], div') : null;
  }

  function createDiagramBox() {
    const drawer = getWorkbenchDrawer();
    if (!drawer) return null;

    let box = document.getElementById('workbench-wiring-diagram');
    if (!box) {
      box = document.createElement('div');
      box.id = 'workbench-wiring-diagram';
      box.className = 'mt-4 p-3 bg-slate-900/95 border border-indigo-500/40 rounded-xl text-left font-mono text-xs text-indigo-300 shadow-xl';
    }

    box.innerHTML = `
      <div class="flex items-center justify-between pb-2 mb-2 border-b border-indigo-500/30">
        <span class="font-bold text-indigo-400 uppercase tracking-wider text-[11px]">⚡ Dynamic Pinout Schematic</span>
        <span id="diagram-status" class="text-[10px] text-emerald-400">Live Circuit</span>
      </div>
      <pre id="diagram-ascii-content" class="overflow-x-auto text-[11px] leading-relaxed text-emerald-300 whitespace-pre p-2 bg-slate-950/90 rounded border border-slate-800">Select hardware modules to view wiring...</pre>
    `;

    const buttons = Array.from(drawer.querySelectorAll('button'));
    const lastBtn = buttons.find(b => b.textContent.includes('Workbench Checklist')) || buttons[buttons.length - 1];
    if (lastBtn && lastBtn.parentElement) {
      lastBtn.parentElement.insertAdjacentElement('afterend', box);
    } else {
      drawer.appendChild(box);
    }

    return box;
  }

  function updateDiagram() {
    const box = createDiagramBox();
    const asciiBox = document.getElementById('diagram-ascii-content');
    if (!asciiBox) return;

    const toolsData = window.tools || window.toolsData || [];
    let activeIds = [];

    if (window.userBuild && typeof window.userBuild.forEach === 'function') {
      window.userBuild.forEach(id => activeIds.push(id));
    } else {
      try {
        const saved = localStorage.getItem('deskbot_user_build');
        if (saved) activeIds = JSON.parse(saved);
      } catch (e) {}
    }

    const wireParts = activeIds
      .map(id => toolsData.find(t => t.id === id))
      .filter(t => t && t.specs && t.specs.wiring);

    if (wireParts.length === 0) {
      asciiBox.textContent = "┌──────────────────────────────────────────────┐\n│ Select hardware modules to view live pinouts │\n└──────────────────────────────────────────────┘";
      return;
    }

    let schematic = "┌──────────────────────────────────────────────┐\n";
    schematic += "│           HOST CONTROLLER / ESP32            │\n";
    schematic += "└──────────────────────┬───────────────────────┘\n";

    wireParts.forEach((part, idx) => {
      const isLast = idx === wireParts.length - 1;
      const branch = isLast ? " └──► " : " ├──► ";
      const cleanWiring = part.specs.wiring.replace(/\s+/g, ' ');
      schematic += `${branch}[${part.name}]\n`;
      schematic += `       Pinout: ${cleanWiring}\n`;
      if (!isLast) schematic += " │\n";
    });

    schematic += " └─────────────────────────────────────────────► Common GND & 5V Rail";
    asciiBox.textContent = schematic;
  }

  function init() {
    injectBlueprintTileButton();
    updateDiagram();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  setTimeout(init, 300);
  setTimeout(init, 1000);
  setTimeout(init, 2500);

  document.addEventListener('click', (e) => {
    setTimeout(init, 200);
  });

  window.renderBuildWiringDiagram = updateDiagram;
})();
