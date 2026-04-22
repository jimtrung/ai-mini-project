import { t } from '../i18n.js';

export function initSmartHome(container) {
  let states = {
    isDark: false,
    isOccupied: false,
    isRaining: false,
    temperature: 24
  };

  let devices = {
    lights: false,
    ac: false,
    curtains: true,
    sprinklers: false
  };

  const rules = [
    {
      name: "Auto Lights",
      condition: (s) => s.isDark && s.isOccupied,
      action: (d) => { d.lights = true; }
    },
    {
      name: "Daylight Savings",
      condition: (s) => !s.isDark,
      action: (d) => { d.lights = false; }
    },
    {
      name: "Climate Control",
      condition: (s) => s.temperature > 28 && s.isOccupied,
      action: (d) => { d.ac = true; }
    },
    {
      name: "Energy Saver",
      condition: (s) => !s.isOccupied,
      action: (d) => { d.ac = false; d.lights = false; }
    },
    {
      name: "Rain Protection",
      condition: (s) => s.isRaining,
      action: (d) => { d.curtains = false; d.sprinklers = false; }
    },
    {
      name: "Water Garden",
      condition: (s) => !s.isRaining && s.isDark,
      action: (d) => { d.sprinklers = true; }
    }
  ];

  function evaluateRules() {
    devices.sprinklers = false; 
    rules.forEach(rule => {
      if (rule.condition(states)) {
        rule.action(devices);
      }
    });
    updateUI();
  }

  function updateUI() {
    const indicatorList = container.querySelector('#device-list');
    indicatorList.innerHTML = Object.entries(devices).map(([name, on]) => `
      <div class="glass" style="padding: 1rem; display: flex; justify-content: space-between; align-items: center; border-left: 4px solid ${on ? 'var(--success)' : 'var(--error)'}">
        <span style="text-transform: capitalize; font-weight: 600;">${name}</span>
        <span style="color: ${on ? 'var(--success)' : 'var(--text-muted)'}">${on ? t('active') : t('off')}</span>
      </div>
    `).join('');

    container.querySelector('#temp-val').textContent = `${states.temperature}°C`;
  }

  container.innerHTML = `
    <h2 class="section-title">${t('shTitle')}</h2>
    <p class="description">${t('shGameDesc')}</p>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
      <div class="glass">
        <h3 style="margin-bottom: 1.5rem;">${t('sensors')}</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <label style="display: flex; justify-content: space-between; cursor: pointer;">
            <span>${t('dark')}</span>
            <input type="checkbox" id="check-dark">
          </label>
          <label style="display: flex; justify-content: space-between; cursor: pointer;">
            <span>${t('occupied')}</span>
            <input type="checkbox" id="check-occupied">
          </label>
          <label style="display: flex; justify-content: space-between; cursor: pointer;">
            <span>${t('rain')}</span>
            <input type="checkbox" id="check-rain">
          </label>
          <div style="margin-top: 1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>${t('temp')}</span>
              <span id="temp-val">24°C</span>
            </div>
            <input type="range" id="range-temp" min="15" max="40" value="24" style="width: 100%;">
          </div>
        </div>
      </div>

      <div class="glass">
        <h3 style="margin-bottom: 1.5rem;">${t('status')}</h3>
        <div id="device-list" style="display: flex; flex-direction: column; gap: 0.8rem;">
          <!-- Devices injected here -->
        </div>
      </div>
    </div>

    <div class="glass" style="margin-top: 2rem;">
      <h3 style="margin-bottom: 1rem;">${t('rulesLog')}</h3>
      <ul id="rule-log" style="list-style: none; color: var(--text-muted); font-size: 0.9rem;">
        <li>${t('initialized')}</li>
      </ul>
    </div>
  `;

  container.querySelector('#check-dark').addEventListener('change', (e) => { states.isDark = e.target.checked; evaluateRules(); });
  container.querySelector('#check-occupied').addEventListener('change', (e) => { states.isOccupied = e.target.checked; evaluateRules(); });
  container.querySelector('#check-rain').addEventListener('change', (e) => { states.isRaining = e.target.checked; evaluateRules(); });
  container.querySelector('#range-temp').addEventListener('input', (e) => { states.temperature = parseInt(e.target.value); evaluateRules(); });

  evaluateRules();
}
