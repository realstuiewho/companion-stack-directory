// DeskBotStack Dynamic Wiring & LittleG Showcase Extension
(function () {

  // ==========================================
  // PART 1: AUTO-INJECT LITTLE G SHOWCASE BANNER
  // ==========================================
  function injectShowcaseBanner() {
    if (document.getElementById('little-g-showcase')) return;

    // Find the best anchor: either below the blueprints grid or right above the main tools section
    const blueprintsSection = document.querySelector('[id*="blueprint"], [class*="blueprint"]') ||
                              Array.from(document.querySelectorAll('section, div')).find(el => 
                                el.textContent && el.textContent.includes('Starter Blueprints')
                              );

    const showcase = document.createElement('section');
    showcase.id = 'little-g-showcase';
    showcase.className = 'my-10 px-4 max-w-7xl mx-auto w-full';
    showcase.innerHTML = `
      <div class="relative overflow-hidden rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 p-6 sm:p-8 shadow-2xl">
        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Left: Thumbnail & Trigger -->
          <div class="lg:col-span-5 flex flex-col items-center">
            <div id="open-teaser-card" class="relative group cursor-pointer w-full max-w-md rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-lg">
              <img src="littleG3.png" alt="LittleG Tri-Arm Edition" class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105">
              <div class="absolute bottom-3 left-3 right-3 bg-slate-900/90 border border-cyan-500/50 rounded-lg p-2.5 flex items-center justify-between text-xs font-mono">
                <span class="flex items-center gap-2 text-cyan-300 font-bold">
                  <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  EXPLODED CAD PREVIEW
                </span>
                <span class="text-slate-300 text-[11px] group-hover:text-white">&rarr; Click to Inspect</span>
              </div>
            </div>
            <p class="text-[11px] font-mono text-slate-400 mt-2 text-center">350mm Height &bull; Symmetrical Tri-Arm System</p>
          </div>

          <!-- Right: Details & Action Button -->
          <div class="lg:col-span-7 flex flex-col justify-center text-left">
            <div class="flex flex-wrap items-center gap-2 mb-3">
              <span class="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">Flagship Maker Blueprint</span>
              <span class="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">SO-101 Modular Tooling</span>
            </div>

            <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              LittleG: <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Tri-Arm Sentinel</span> Edition
            </h2>
            
            <p class="mt-3 text-sm text-slate-300 leading-relaxed">
              Bimanual manipulating arms, an expressive 4" AMOLED face on an articulated 6-axis camera neck, and an infinite 360&deg; rotating base with spatial audio ears.
            </p>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5 font-mono text-xs">
              <div class="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                <span class="text-slate-400 block text-[10px] uppercase">Limb Mechanics</span>
                <strong class="text-indigo-300 text-sm">3x Hiwonder Bus</strong>
              </div>
              <div class="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                <span class="text-slate-400 block text-[10px] uppercase">Base Station</span>
                <strong class="text-cyan-300 text-sm">360&deg; Slip Ring Hub</strong>
              </div>
              <div class="p-3 bg-slate-950/80 rounded-lg border border-slate-800 col-span-2 sm:col-span-1">
                <span class="text-slate-400 block text-[10px] uppercase">Workspace Brain</span>
                <strong class="text-emerald-300 text-sm">Pi CM5 + Ollama</strong>
              </div>
            </div>

            <div class="pt-2">
              <button id="btn-inspect-exploded" class="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all cursor-pointer">
                ⚡ Inspect Exploded Blueprint
              </button>
            </div>
          </div>

        </div>
      </div>
    `;

    // Modal creation
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
    }

    // Insert showcase banner
    if (blueprintsSection && blueprintsSection.parentElement) {
      blueprintsSection.insertAdjacentElement('afterend', showcase);
    } else {
      const main = document.querySelector('main') || document.body;
      main.insertBefore(showcase, main.firstChild);
    }

    // Event hooks
    function openModal() { modal.classList.remove('hidden'); }
    function closeModal() { modal.classList.add('hidden'); }

    document.getElementById('open-teaser-card')?.addEventListener('click', openModal);
    document.getElementById('btn-inspect-exploded')?.addEventListener('click', openModal);
    document.getElementById('close-teaser-modal')?.addEventListener('click', closeModal);
    document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
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

  // Run on load and poll slightly to ensure DOM is ready
  function init() {
    injectShowcaseBanner();
    updateDiagram();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  setTimeout(init, 500);
  setTimeout(init, 1500);

  document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('.blueprint-card') || e.target.closest('[onclick]')) {
      setTimeout(updateDiagram, 200);
    }
  });

  window.renderBuildWiringDiagram = updateDiagram;
})();
