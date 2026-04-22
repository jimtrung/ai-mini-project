import { t } from '../i18n.js';

export function initHome(container) {
  container.innerHTML = `
    <section class="home-hero">
      <h2 class="section-title">${t('welcome')}</h2>
      <p class="description">${t('heroDesc')}</p>
      
      <div class="home-grid">
        <div class="glass card" data-module="tic-tac-toe">
          <h3>${t('ttt')}</h3>
          <p>${t('tttDesc')}</p>
        </div>
        <div class="glass card" data-module="sudoku">
          <h3>${t('sudoku')}</h3>
          <p>${t('sudokuDesc')}</p>
        </div>
        <div class="glass card" data-module="spam-detector">
          <h3>${t('spam')}</h3>
          <p>${t('spamDesc')}</p>
        </div>
        <div class="glass card" data-module="smart-home">
          <h3>${t('smartHome')}</h3>
          <p>${t('smartHomeDesc')}</p>
        </div>
      </div>
    </section>
  `;

  // Add click listeners to cards
  container.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const moduleName = card.dataset.module;
      const navBtn = document.querySelector(`.nav-btn[data-module="${moduleName}"]`);
      if (navBtn) navBtn.click();
    });
  });
}
