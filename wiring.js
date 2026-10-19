// DeskBotStack Dynamic Connections Diagram Extension
(function () {
  function getWorkbenchDrawer() {
    // Finds the actual slide-out drawer by looking for the Workbench button
    const buttons = Array.from(document.querySelectorAll('button'));
    const checklistBtn = buttons.find(b => 
      b.textContent.includes('Workbench Checklist') || 
      b.textContent.includes('1-Click Computer Setup')
    );
    return checklistBtn ? checklistBtn.closest('div.fixed, aside, [class*="tray"], div') : null;
  }

  function createDiagramBox() {
    // Remove any accidental boxes from the navbar header
    const misplaced = document.querySelectorAll('#workbench-wiring-diagram');
    if (misplaced.length > 1) {
      misplaced.forEach(el => el.remove());
    }

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

    // Place cleanly at the bottom of the drawer beneath the buttons
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

    // Read userBuild from DeskbotStack's state
    if (window.userBuild && typeof window.userBuild.forEach === 'function') {
      window.userBuild.forEach(id => activeIds.push(id));
    } else {
      try {
        const saved = localStorage.getItem('deskbot_user_build');
        if (saved) activeIds = JSON.parse(saved);
      } catch (e) {}
    }

    // Match selected IDs to tools with wiring specs
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

  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateDiagram, 300);
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('.blueprint-card') || e.target.closest('[onclick]')) {
      setTimeout(updateDiagram, 200);
    }
  });

  window.renderBuildWiringDiagram = updateDiagram;
})();
