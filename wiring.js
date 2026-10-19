// DeskBotStack Dynamic Connections Diagram Extension
(function () {
  function getTrayContainer() {
    return document.getElementById('build-tray-panel') ||
           document.getElementById('build-tray') ||
           document.querySelector('.build-tray') ||
           document.querySelector('[id*="tray"]');
  }

  function createDiagramBox() {
    const buildTray = getTrayContainer();
    if (!buildTray) return null;

    let box = document.getElementById('workbench-wiring-diagram');
    if (box) return box;

    box = document.createElement('div');
    box.id = 'workbench-wiring-diagram';
    box.className = 'mt-4 p-3 bg-slate-900/90 border border-indigo-500/40 rounded-xl text-left font-mono text-xs text-indigo-300 shadow-inner';
    box.innerHTML = `
      <div class="flex items-center justify-between pb-2 mb-2 border-b border-indigo-500/30">
        <span class="font-bold text-indigo-400 uppercase tracking-wider text-[11px]">⚡ Dynamic Pinout Schematic</span>
        <span id="diagram-status" class="text-[10px] text-emerald-400">Workbench Ready</span>
      </div>
      <pre id="diagram-ascii-content" class="overflow-x-auto text-[11px] leading-tight text-emerald-300 whitespace-pre p-2 bg-slate-950/80 rounded border border-slate-800">Select hardware modules to view wiring...</pre>
    `;

    // Place cleanly right below the tray action buttons
    const buttons = buildTray.querySelectorAll('button');
    if (buttons.length > 0) {
      const lastButton = buttons[buttons.length - 1];
      const buttonParent = lastButton.parentElement;
      buttonParent.insertAdjacentElement('afterend', box);
    } else {
      buildTray.appendChild(box);
    }
    return box;
  }

  function updateDiagram() {
    createDiagramBox();
    const asciiBox = document.getElementById('diagram-ascii-content');
    if (!asciiBox) return;

    // Grab tools from memory or data script
    const toolsData = window.tools || window.toolsData || [];

    // Detect items currently in the build tray
    let activeHardware = [];

    if (Array.isArray(window.buildTray) && window.buildTray.length > 0) {
      activeHardware = window.buildTray.map(item => {
        return typeof item === 'string' ? toolsData.find(t => t.id === item) : item;
      }).filter(Boolean);
    } else {
      // DOM Fallback: Check items listed in the right-hand build tray
      const trayCards = document.querySelectorAll('#build-tray-items > div, .build-tray-item, [data-part-id]');
      trayCards.forEach(card => {
        const titleEl = card.querySelector('h4, .part-title, .font-medium');
        const titleText = titleEl ? titleEl.textContent.trim().toLowerCase() : '';
        const match = toolsData.find(t => t.name.toLowerCase() === titleText || titleText.includes(t.name.toLowerCase()));
        if (match && !activeHardware.includes(match)) activeHardware.push(match);
      });
    }

    // Filter down to hardware with pinout/wiring specs
    const wireParts = activeHardware.filter(t => t && t.specs && t.specs.wiring);

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

    schematic += " └─────────────────────────────────────────────► Common GND & 5V/3.3V Rail";
    asciiBox.textContent = schematic;
  }

  // Auto-init and listen for Blueprint or Build Tray clicks
  window.addEventListener('DOMContentLoaded', () => {
    createDiagramBox();
    updateDiagram();
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('.blueprint-card') || e.target.closest('[onclick]')) {
      setTimeout(updateDiagram, 180);
    }
  });

  window.renderBuildWiringDiagram = updateDiagram;
})();
