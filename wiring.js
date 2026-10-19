// DeskBotStack Dynamic Wiring & LittleG Popup Clean
(function () {

  // 1. Force-remove any previous bulky showcase banner from DOM
  function purgeOldShowcase() {
    const old = document.getElementById('little-g-showcase');
    if (old) old.remove();
  }

  // 2. Ensure the technical modal exists in body
  function getModal() {
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

      const close = () => modal.classList.add('hidden');
      document.getElementById('close-teaser-modal')?.addEventListener('click', close);
      document.getElementById('modal-close-btn')?.addEventListener('click', close);
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    }
    return modal;
  }

  // 3. Insert compact button inside LittleG's active BOM bar
  function injectCompactButton() {
    purgeOldShowcase();

    // Check if LittleG BOM is currently on screen
    const bomTitle = Array.from(document.querySelectorAll('h3, h4, div')).find(el => 
      el.textContent && el.textContent.includes('LittleG (Tri-Arm Edition)') && el.textContent.includes('Physical Setup')
    );

    if (!bomTitle) {
      const existingBtn = document.getElementById('btn-tile-exploded');
      if (existingBtn) existingBtn.remove();
      return;
    }

    if (document.getElementById('btn-tile-exploded')) return;

    const btn = document.createElement('button');
    btn.id = 'btn-tile-exploded';
    btn.className = 'ml-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 font-mono text-xs font-bold transition-all cursor-pointer shadow-sm align-middle';
    btn.innerHTML = `<span>⚡</span> Inspect Exploded Blueprint`;
    btn.onclick = (e) => {
      e.stopPropagation();
      const m = getModal();
      m.classList.remove('hidden');
    };

    bomTitle.appendChild(btn);
  }

  // 4. Build Tray dynamic pinouts
  function getWorkbenchDrawer() {
    const buttons = Array.from(document.querySelectorAll('button'));
    const checklistBtn = buttons.find(b => 
      b.textContent.includes('Workbench Checklist') || 
      b.textContent.includes('1-Click Computer Setup')
    );
    return checklistBtn ? checklistBtn.closest('div.fixed, aside, [class*="tray"], div') : null;
  }

  function updateDiagram() {
    const drawer = getWorkbenchDrawer();
    if (!drawer) return null;

    let box = document.getElementById('workbench-wiring-diagram');
    if (!box) {
      box = document.createElement('div');
      box.id = 'workbench-wiring-diagram';
      box.className = 'mt-4 p-3 bg-slate-900/95 border border-indigo-500/40 rounded-xl text-left font-mono text-xs text-indigo-300 shadow-xl';
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
    }

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

  function tick() {
    purgeOldShowcase();
    injectCompactButton();
    updateDiagram();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tick);
  } else {
    tick();
  }

  setInterval(tick, 600);
  document.addEventListener('click', () => setTimeout(tick, 100));

  window.renderBuildWiringDiagram = updateDiagram;
})();
