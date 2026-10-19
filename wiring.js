// DeskBotStack Dynamic Wiring & LittleG Tile Button Extension
(function () {

  // 1. Technical Exploded Blueprint Modal (Self-Contained)
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

  // 2. Put the button directly INSIDE the LittleG Starter Blueprint Tile
  function attachButtonToLittleGTile() {
    // If button already exists on the tile, do nothing
    if (document.getElementById('btn-tile-blueprint-view')) return;

    // Find the LittleG card in the Starter Blueprints grid
    const allCards = Array.from(document.querySelectorAll('div, section, article'));
    const littleGCard = allCards.find(el => {
      const h3 = el.querySelector('h3, h4, .font-bold');
      return h3 && h3.textContent.includes('LittleG');
    });

    if (!littleGCard) return;

    // Find the bottom row of the card (where "Active Blueprint" or "Load Blueprint" sits)
    const bottomRow = littleGCard.querySelector('.flex.items-center.justify-between') ||
                      littleGCard.querySelector('.flex') ||
                      littleGCard.lastElementChild;

    const btn = document.createElement('button');
    btn.id = 'btn-tile-blueprint-view';
    btn.type = 'button';
    btn.className = 'mt-3 w-full py-1.5 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm';
    btn.innerHTML = `<span>⚡</span> View Exploded Blueprint`;
    btn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      const m = getModal();
      m.classList.remove('hidden');
    };

    if (bottomRow && bottomRow.parentElement) {
      bottomRow.insertAdjacentElement('beforebegin', btn);
    } else {
      littleGCard.appendChild(btn);
    }
  }

  // 3. Dynamic Build Tray Pinouts
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

  // Continuous safe watcher so re-renders never lose the button
  function refresh() {
    attachButtonToLittleGTile();
    updateDiagram();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refresh);
  } else {
    refresh();
  }

  // Runs every 400ms to guarantee it catches renderStarterStacks() whenever blueprints change
  setInterval(refresh, 400);

  window.renderBuildWiringDiagram = updateDiagram;
})();
