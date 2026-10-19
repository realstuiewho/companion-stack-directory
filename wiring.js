// DeskBotStack Dynamic Wiring & LittleG Popup Clean
(function () {

  // 1. Purge any stray legacy banners
  function purgeOldShowcase() {
    const old = document.getElementById('little-g-showcase');
    if (old) old.remove();
  }

  // 2. Ensure modal exists
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
            <img src="watermarked_img_12370607140268248611.jpg" alt="LittleG Exploded Blueprint View" class="w-full h-auto rounded-lg border border-slate-800 shadow-md">
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

  // 3. Inject clickable Blueprint Action Button into the BOM card grid
  function injectBlueprintCard() {
    purgeOldShowcase();

    // Check if LittleG BOM is currently on screen
    const isLittleG = Array.from(document.querySelectorAll('h1, h2, h3, h4, div')).some(el => 
      el.textContent && el.textContent.includes('Physical Setup: LittleG')
    );

    const existingCard = document.getElementById('card-exploded-blueprint');

    if (!isLittleG) {
      if (existingCard) existingCard.remove();
      return;
    }

    if (existingCard) return;

    // Find the BOM cards container (holding the 3 hardware cards)
    const hardwareCards = Array.from(document.querySelectorAll('button, a')).filter(el => 
      el.textContent && el.textContent.includes('Find on AliExpress')
    );

    if (hardwareCards.length === 0) return;

    const parentGrid = hardwareCards[0].closest('.grid, div.flex, div');
    if (!parentGrid) return;

    const actionCard = document.createElement('div');
    actionCard.id = 'card-exploded-blueprint';
    actionCard.className = 'relative p-4 rounded-xl border border-cyan-500/50 bg-gradient-to-br from-slate-900 to-indigo-950/70 shadow-lg flex flex-col justify-between cursor-pointer transition-transform hover:scale-[1.02]';
    actionCard.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] uppercase font-mono font-bold tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">CAD SCHEMATIC</span>
          <span class="text-[11px] font-mono text-emerald-400">Interactive</span>
        </div>
        <h4 class="text-sm font-bold text-white mb-1">DBS-LG-001 Exploded Blueprint</h4>
        <p class="text-xs text-slate-300 font-mono">Inspect all 16 modular subsystems, fastener schedules & wire harnesses.</p>
      </div>
      <button class="mt-4 w-full py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono shadow-md transition-all cursor-pointer">
        ⚡ Open Exploded Blueprint
      </button>
    `;

    actionCard.onclick = () => {
      const m = getModal();
      m.classList.remove('hidden');
    };

    parentGrid.appendChild(actionCard);
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
    if (!drawer) return;

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
    injectBlueprintCard();
    updateDiagram();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tick);
  } else {
    tick();
  }

  setInterval(tick, 500);
  document.addEventListener('click', () => setTimeout(tick, 100));

  window.renderBuildWiringDiagram = updateDiagram;
})();
