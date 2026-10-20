// Cybonoid Dynamic Layout: 4 Commercial Robotics Cards (AheadForm + G1 + Go2 + myCobot) + LittleG Suite
(function () {

  // =========================================================================
  // 1. INSERT COMMERCIAL ROBOTICS CAROUSEL (ABOVE BLUEPRINTS)
  // =========================================================================
  function injectCommercialCarousel() {
    if (document.getElementById('commercial-robot-carousel')) return;

    // Target the Starter Blueprints card cleanly
    const allCards = Array.from(document.querySelectorAll('section, div'));
    const blueprintsCard = allCards.find(el => {
      const heading = el.querySelector('h2, h3, div');
      return heading && heading.textContent.includes('Starter Blueprints') && el.classList.contains('border');
    }) || document.querySelector('[id*="starter"], [class*="blueprint"]');

    if (!blueprintsCard || !blueprintsCard.parentElement) return;

    const carouselSection = document.createElement('section');
    carouselSection.id = 'commercial-robot-carousel';
    carouselSection.className = 'my-6 px-4 max-w-7xl mx-auto w-full';
    carouselSection.innerHTML = `
      <div class="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-4 sm:p-5 shadow-xl">
        
        <style>
          .hover-carousel-strip {
            display: flex;
            width: 400%;
            height: 100%;
            transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
          }
          .hover-carousel-strip img {
            width: 25%;
            height: 100%;
            object-fit: cover;
            flex-shrink: 0;
          }
          .carousel-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transition: all 0.2s ease;
          }
          .carousel-dot.active {
            background: #38bdf8;
            width: 14px;
            border-radius: 4px;
          }
        </style>

        <div class="flex items-center justify-between pb-3 mb-4 border-b border-indigo-500/20">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">Embodied &amp; Commercial AI Platforms</span>
          </div>
          <span class="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">Hover Card to View Angles &bull; Click to Explore</span>
        </div>

        <!-- 4 Interactive Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <!-- 1. AheadForm Origin F1 Bionic Head -->
          <a href="https://www.aheadform.com" target="_blank" rel="noopener noreferrer" 
             id="card-aheadform"
             class="group relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden hover:border-fuchsia-400 transition-all flex flex-col justify-between shadow-lg cursor-pointer">
            <div class="relative w-full h-48 bg-slate-900/80 overflow-hidden">
              <div class="hover-carousel-strip" id="strip-aheadform">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" alt="AheadForm Bionic Head">
                <img src="https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?auto=format&fit=crop&w=600&q=80" alt="AheadForm Facial Actuation">
                <img src="https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80" alt="AheadForm Eye Cameras">
                <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80" alt="AheadForm Silicone Skin Profile">
              </div>
              <div class="absolute top-2.5 left-2.5 bg-fuchsia-950/90 border border-fuchsia-400/40 text-[9px] font-mono font-bold uppercase text-fuchsia-300 px-2 py-0.5 rounded shadow">
                Bionic Head / Embodied AI
              </div>
              <div class="absolute bottom-2.5 right-2.5 bg-slate-950/90 border border-fuchsia-500/50 text-[11px] font-mono font-bold text-fuchsia-300 px-2 py-0.5 rounded shadow">
                Inquire / Partner
              </div>
              <div class="absolute bottom-2.5 left-3 flex items-center gap-1.5" id="dots-aheadform">
                <span class="carousel-dot active"></span>
                <span class="carousel-dot"></span>
                <span class="carousel-dot"></span>
                <span class="carousel-dot"></span>
              </div>
            </div>
            <div class="p-3 bg-slate-950 flex items-center justify-between border-t border-slate-800/80">
              <div>
                <h4 class="text-sm font-bold text-white group-hover:text-fuchsia-300 transition-colors">AheadForm Origin F1</h4>
                <p class="text-[10px] text-slate-400 font-mono">30+ Facial DOF &bull; Omni Multimodal &bull; Micro-Motors</p>
              </div>
              <span class="text-xs text-fuchsia-400 font-bold group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </a>

          <!-- 2. Unitree G1 Humanoid (Wired to your local uploaded photography) -->
          <a href="https://www.aliexpress.com/wholesale?SearchText=Unitree+G1+Humanoid+Robot" target="_blank" rel="noopener noreferrer" 
             id="card-unitree-g1"
             class="group relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden hover:border-cyan-400 transition-all flex flex-col justify-between shadow-lg cursor-pointer">
            <div class="relative w-full h-48 bg-slate-900/80 overflow-hidden">
              <div class="hover-carousel-strip" id="strip-g1">
                <img src="g1-1.png" alt="Unitree G1 Full Body">
                <img src="g1-2.png" alt="Unitree G1 Head & Vision Visor">
                <img src="g1-3.png" alt="Unitree G1 Waist Mechanics">
                <img src="g1-4.png" alt="Unitree G1 In Action">
              </div>
              <div class="absolute top-2.5 left-2.5 bg-indigo-950/90 border border-indigo-400/40 text-[9px] font-mono font-bold uppercase text-indigo-300 px-2 py-0.5 rounded shadow">
                Humanoid Biped
              </div>
              <div class="absolute bottom-2.5 right-2.5 bg-slate-950/90 border border-emerald-500/50 text-[11px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded shadow">
                $13,500 USD
              </div>
              <div class="absolute bottom-2.5 left-3 flex items-center gap-1.5" id="dots-g1">
                <span class="carousel-dot active"></span>
                <span class="carousel-dot"></span>
                <span class="carousel-dot"></span>
                <span class="carousel-dot"></span>
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

          <!-- 3. Unitree Go2 Quadruped -->
          <a href="https://www.aliexpress.com/wholesale?SearchText=Unitree+Go2+Quadruped+Robot" target="_blank" rel="noopener noreferrer" 
             id="card-unitree-go2"
             class="group relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden hover:border-cyan-400 transition-all flex flex-col justify-between shadow-lg cursor-pointer">
            <div class="relative w-full h-48 bg-slate-900/80 overflow-hidden">
              <div class="hover-carousel-strip" id="strip-go2">
                <img src="https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=600&q=80" alt="Unitree Go2 Profile">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" alt="Unitree Go2 Head 4D LiDAR">
                <img src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=600&q=80" alt="Unitree Go2 High-Torque Legs">
                <img src="https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=600&q=80" alt="Unitree Go2 Terrain Navigation">
              </div>
              <div class="absolute top-2.5 left-2.5 bg-cyan-950/90 border border-cyan-400/40 text-[9px] font-mono font-bold uppercase text-cyan-300 px-2 py-0.5 rounded shadow">
                AI Quadruped
              </div>
              <div class="absolute bottom-2.5 right-2.5 bg-slate-950/90 border border-emerald-500/50 text-[11px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded shadow">
                $2,350+ USD
              </div>
              <div class="absolute bottom-2.5 left-3 flex items-center gap-1.5" id="dots-go2">
                <span class="carousel-dot active"></span>
                <span class="carousel-dot"></span>
                <span class="carousel-dot"></span>
                <span class="carousel-dot"></span>
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

          <!-- 4. Elephant Robotics myCobot 280 -->
          <a href="https://www.aliexpress.com/wholesale?SearchText=Elephant+Robotics+myCobot+280" target="_blank" rel="noopener noreferrer" 
             id="card-mycobot-280"
             class="group relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden hover:border-amber-400 transition-all flex flex-col justify-between shadow-lg cursor-pointer">
            <div class="relative w-full h-48 bg-slate-900/80 overflow-hidden">
              <div class="hover-carousel-strip" id="strip-mycobot">
                <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80" alt="myCobot 280 Full Reach">
                <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80" alt="myCobot End Effector Gripper">
                <img src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80" alt="myCobot 6-Axis Servo Joints">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" alt="myCobot Raspberry Pi Interface">
              </div>
              <div class="absolute top-2.5 left-2.5 bg-amber-950/90 border border-amber-400/40 text-[9px] font-mono font-bold uppercase text-amber-300 px-2 py-0.5 rounded shadow">
                Desktop Cobot Arm
              </div>
              <div class="absolute bottom-2.5 right-2.5 bg-slate-950/90 border border-emerald-500/50 text-[11px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded shadow">
                $649+ USD
              </div>
              <div class="absolute bottom-2.5 left-3 flex items-center gap-1.5" id="dots-mycobot">
                <span class="carousel-dot active"></span>
                <span class="carousel-dot"></span>
                <span class="carousel-dot"></span>
                <span class="carousel-dot"></span>
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
    bindHoverCarousels();
  }

  // Smooth hover carousel binding
  function bindHoverCarousels() {
    const setupCard = (cardId, stripId, dotsId) => {
      const card = document.getElementById(cardId);
      const strip = document.getElementById(stripId);
      const dots = document.getElementById(dotsId)?.children || [];
      if (!card || !strip) return;

      let timer = null;
      let currentIndex = 0;
      const totalImages = 4;

      const setIndex = (idx) => {
        currentIndex = idx;
        strip.style.transform = `translateX(-${idx * 25}%)`;
        Array.from(dots).forEach((d, i) => {
          if (i === idx) d.classList.add('active');
          else d.classList.remove('active');
        });
      };

      card.addEventListener('mouseenter', () => {
        clearInterval(timer);
        timer = setInterval(() => {
          currentIndex = (currentIndex + 1) % totalImages;
          setIndex(currentIndex);
        }, 1200);
      });

      card.addEventListener('mouseleave', () => {
        clearInterval(timer);
        setIndex(0);
      });
    };

    setupCard('card-aheadform', 'strip-aheadform', 'dots-aheadform');
    setupCard('card-unitree-g1', 'strip-g1', 'dots-g1');
    setupCard('card-unitree-go2', 'strip-go2', 'dots-go2');
    setupCard('card-mycobot-280', 'strip-mycobot', 'dots-mycobot');
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
    injectCommercialCarousel();
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
