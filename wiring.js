// DeskBotStack Dynamic Layout Upgrade: Visual Robotics Carousel + Tool Filter Search + LittleG
(function () {

  // =========================================================================
  // 1. REORGANIZE HEADER: INSERT VISUAL PLATFORM CAROUSEL & RESTORE SEARCH
  // =========================================================================
  function reorganizeLayout() {
    // Hide the old bulky empty hero text to save space
    const heroTitle = Array.from(document.querySelectorAll('h1, h2, div')).find(el => 
      el.textContent && el.textContent.trim().startsWith('Build Your Own Desk Companion') && el.children.length <= 2
    );
    if (heroTitle && heroTitle.parentElement) {
      heroTitle.parentElement.style.display = "none";
    }

    // A. Insert the Visual Commercial Carousel (if not already present)
    if (!document.getElementById('commercial-robot-carousel')) {
      const allCards = Array.from(document.querySelectorAll('section, div'));
      const blueprintsCard = allCards.find(el => {
        const heading = el.querySelector('h2, h3, div');
        return heading && heading.textContent.includes('Starter Blueprints') && el.classList.contains('border');
      }) || document.querySelector('[id*="starter"], [class*="blueprint"]');

      if (blueprintsCard) {
        const carouselSection = document.createElement('section');
        carouselSection.id = 'commercial-robot-carousel';
        carouselSection.className = 'my-6 px-4 max-w-7xl mx-auto w-full';
        carouselSection.innerHTML = `
          <div class="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-4 sm:p-5 shadow-xl">
            <div class="flex items-center justify-between pb-3 mb-4 border-b border-indigo-500/20">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span class="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">Embodied &amp; Commercial AI Platforms</span>
              </div>
              <span class="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">Click Image to Explore Hardware</span>
            </div>

            <!-- 3 High-Impact Visual Cards (Whole Card is Link) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

              <!-- 1. Unitree G1 -->
              <a href="https://www.aliexpress.com/wholesale?SearchText=Unitree+G1+Humanoid+Robot" target="_blank" rel="noopener noreferrer" 
                 class="group relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden hover:border-cyan-400 transition-all flex flex-col justify-between shadow-lg">
                <div class="relative w-full h-44 bg-slate-900/80 flex items-center justify-center p-3 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80" 
                       alt="Unitree G1 Humanoid" 
                       class="w-full h-full object-cover rounded-lg opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300">
                  <div class="absolute top-2.5 left-2.5 bg-indigo-950/90 border border-indigo-400/40 text-[9px] font-mono font-bold uppercase text-indigo-300 px-2 py-0.5 rounded">
                    Humanoid Biped
                  </div>
                  <div class="absolute bottom-2.5 right-2.5 bg-slate-950/90 border border-emerald-500/50 text-[11px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded">
                    $13,500 USD
                  </div>
                </div>
                <div class="p-3 bg-slate-950 flex items-center justify-between border-t border-slate-800/80">
                  <div>
                    <h4 class="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">Unitree G1 Humanoid</h4>
                    <p class="text-[10px] text-slate-400 font-mono">23–43 DOF &bull; 3D LiDAR &bull; 2 m/s Walk</p>
                  </div>
                  <span class="text-xs text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </a>

              <!-- 2. Unitree Go2 -->
              <a href="https://www.aliexpress.com/wholesale?SearchText=Unitree+Go2+Quadruped+Robot" target="_blank" rel="noopener noreferrer" 
                 class="group relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden hover:border-cyan-400 transition-all flex flex-col justify-between shadow-lg">
                <div class="relative w-full h-44 bg-slate-900/80 flex items-center justify-center p-3 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=600&q=80" 
                       alt="Unitree Go2 Robot Dog" 
                       class="w-full h-full object-cover rounded-lg opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300">
                  <div class="absolute top-2.5 left-2.5 bg-cyan-950/90 border border-cyan-400/40 text-[9px] font-mono font-bold uppercase text-cyan-300 px-2 py-0.5 rounded">
                    AI Quadruped
                  </div>
                  <div class="absolute bottom-2.5 right-2.5 bg-slate-950/90 border border-emerald-500/50 text-[11px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded">
                    $2,350+ USD
                  </div>
                </div>
                <div class="p-3 bg-slate-950 flex items-center justify-between border-t border-slate-800/80">
                  <div>
                    <h4 class="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">Unitree Go2 Robot Dog</h4>
                    <p class="text-[10px] text-slate-400 font-mono">4D LiDAR &bull; 3.7 m/s &bull; Auto-Stair Climb</p>
                  </div>
                  <span class="text-xs text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </a>

              <!-- 3. Elephant Robotics myCobot 280 -->
              <a href="https://www.aliexpress.com/wholesale?SearchText=Elephant+Robotics+myCobot+280" target="_blank" rel="noopener noreferrer" 
                 class="group relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden hover:border-amber-400 transition-all flex flex-col justify-between shadow-lg">
                <div class="relative w-full h-44 bg-slate-900/80 flex items-center justify-center p-3 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80" 
                       alt="myCobot 280 Arm" 
                       class="w-full h-full object-cover rounded-lg opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300">
                  <div class="absolute top-2.5 left-2.5 bg-amber-950/90 border border-amber-400/40 text-[9px] font-mono font-bold uppercase text-amber-300 px-2 py-0.5 rounded">
                    Desktop Cobot Arm
                  </div>
                  <div class="absolute bottom-2.5 right-2.5 bg-slate-950/90 border border-emerald-500/50 text-[11px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded">
                    $649+ USD
                  </div>
                </div>
                <div class="p-3 bg-slate-950 flex items-center justify-between border-t border-slate-800/80">
                  <div>
                    <h4 class="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">myCobot 280 Desk Arm</h4>
                    <p class="text-[10px] text-slate-400 font-mono">6-Axis Articulated &bull; Pi 4B &bull; ROS2 Support</p>
                  </div>
                  <span class="text-xs text-amber-400 font-bold group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </a>

            </div>
          </div>
        `;
        blueprintsCard.insertAdjacentElement('beforebegin', carouselSection);
      }
    }

    // B. Place Search Bar alongside the Category Filters (All, Brains, Ears)
    const searchBar = document.getElementById('search-input')?.closest('div.relative, div.w-full, div') ||
                      document.querySelector('input[placeholder*="Search"]')?.closest('div');

    const allPill = Array.from(document.querySelectorAll('button, div')).find(el => 
      el.textContent && el.textContent.trim() === 'All' && el.parentElement
    );
    const filterRow = allPill ? allPill.closest('div.flex, div') : null;

    if (searchBar && filterRow && !filterRow.querySelector('input')) {
      searchBar.style.display = "block";
      searchBar.className = "w-full sm:w-64 relative";
      filterRow.className = "flex flex-wrap items-center justify-between gap-3 mb-6";
      filterRow.appendChild(searchBar);
    }
  }

  // =========================================================================
  // 2. MODAL & LITTLE G BLUEPRINT BUTTON
  // =========================================================================
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
            <img src="littleg-exploded.jpg" alt="LittleG Exploded Blueprint View" class="w-full h-auto rounded-lg border border-slate-800 shadow-md">
          </div>
          <div class="p-4 border-t border-slate-800 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span class="text-xs text-slate-400 font-mono">Drawing No: DBS-LG-001</span>
            
            <a href="https://www.etsy.com/au/listing/4598641631/littleg-tri-arm-desktop-robot-companion?ref=shop_home_active_1&pro=1&dd=1" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono rounded-lg text-center shadow-lg shadow-cyan-500/20 transition-all cursor-pointer">
              🛒 Get Complete Maker Pack (Etsy) &rarr;
            </a>

            <button id="modal-close-btn" class="w-full sm:w-auto px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase rounded-lg cursor-pointer">
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

  function attachButtonToLittleGTile() {
    if (document.getElementById('btn-tile-blueprint-view')) return;

    const littleGCard = document.querySelector('[onclick*="selectStarterStack(\'little-g\')"]') ||
                        document.querySelector('[onclick*="little-g"]');

    if (!littleGCard) return;

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

    littleGCard.appendChild(btn);
  }

  // =========================================================================
  // 3. BUILD TRAY DYNAMIC WIRING SCHEMATIC
  // =========================================================================
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

  function loop() {
    reorganizeLayout();
    attachButtonToLittleGTile();
    updateDiagram();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loop);
  } else {
    loop();
  }

  setInterval(loop, 400);

  window.renderBuildWiringDiagram = updateDiagram;
})();
