import { t, getLanguage } from '../i18n.js';

export function initSpamDetector(container) {
  const trainingData = [
    // English
    { text: "win free cash prize now", label: "spam" },
    { text: "urgent money offer click here", label: "spam" },
    { text: "congratulations you won a gift card", label: "spam" },
    { text: "exclusive deal on watches limited time", label: "spam" },
    { text: "meeting rescheduled for tomorrow morning", label: "ham" },
    { text: "can we catch up for coffee later", label: "ham" },
    { text: "the project documentation is ready for review", label: "ham" },
    { text: "hi how are you doing today", label: "ham" },
    // Vietnamese
    { text: "chúc mừng bạn đã trúng thưởng iphone 15", label: "spam" },
    { text: "nhận ngay quà tặng miễn phí click vào đây", label: "spam" },
    { text: "cho vay tiền nhanh lãi suất thấp không cần thế chấp", label: "spam" },
    { text: "kiếm tiền online tại nhà thu nhập 10 triệu mỗi tháng", label: "spam" },
    { text: "bạn có một bưu phẩm chưa nhận", label: "spam" },
    { text: "mai mình đi cà phê nhé", label: "ham" },
    { text: "tài liệu dự án đã được cập nhật", label: "ham" },
    { text: "bạn khỏe không dạo này công việc thế nào", label: "ham" },
    { text: "nhắc lịch họp chiều nay lúc 2 giờ", label: "ham" },
    { text: "gửi bạn hóa đơn tiền điện tháng này", label: "ham" }
  ];

  const samples = {
    en: {
      spam: [
        "WINNER! Claim your free gift card now by clicking this link!",
        "Urgent: Your account has been compromised. Please login to verify.",
        "Get rich quick! Earn $5000 a week working from home."
      ],
      ham: [
        "Hi, are we still meeting for lunch tomorrow at 12?",
        "Please find the project report attached for your review.",
        "Just wanted to check in and see how your weekend was."
      ]
    },
    vi: {
      spam: [
        "CHÚC MỪNG! Bạn đã trúng thưởng một chiếc iPhone 15 Pro Max!",
        "Vay tiền nhanh không cần thế chấp, giải ngân trong 15 phút.",
        "Cơ hội việc làm tại nhà, thu nhập cực cao, click ngay để đăng ký."
      ],
      ham: [
        "Chào bạn, chiều nay 2h mình họp nhóm nhé.",
        "Dạo này công việc của bạn thế nào rồi? Cuối tuần đi nhậu không?",
        "Gửi anh tài liệu thuyết trình cho buổi họp sáng mai."
      ]
    }
  };

  let vocabulary = new Set();
  let spamCounts = {};
  let hamCounts = {};
  let totalSpam = 0;
  let totalHam = 0;

  function train() {
    trainingData.forEach(item => {
      // Improved regex to handle accented Vietnamese characters
      const words = item.text.toLowerCase().split(/[\s,.;:!?()\[\]"']+/).filter(w => w.length > 0);
      if (item.label === "spam") {
        totalSpam++;
        words.forEach(word => {
          spamCounts[word] = (spamCounts[word] || 0) + 1;
          vocabulary.add(word);
        });
      } else {
        totalHam++;
        words.forEach(word => {
          hamCounts[word] = (hamCounts[word] || 0) + 1;
          vocabulary.add(word);
        });
      }
    });
  }

  function classify(text) {
    const words = text.toLowerCase().split(/[\s,.;:!?()\[\]"']+/).filter(w => w.length > 0);
    const pSpam = totalSpam / (totalSpam + totalHam);
    const pHam = totalHam / (totalSpam + totalHam);

    let spamScore = Math.log(pSpam);
    let hamScore = Math.log(pHam);

    const vocabSize = vocabulary.size;

    words.forEach(word => {
      const sCount = (spamCounts[word] || 0) + 1;
      const hCount = (hamCounts[word] || 0) + 1;
      
      spamScore += Math.log(sCount / (totalSpam + vocabSize));
      hamScore += Math.log(hCount / (totalHam + vocabSize));
    });

    return {
      label: spamScore > hamScore ? "Spam" : "Ham",
      spamProb: Math.exp(spamScore) / (Math.exp(spamScore) + Math.exp(hamScore)),
      hamProb: Math.exp(hamScore) / (Math.exp(spamScore) + Math.exp(hamScore))
    };
  }

  train();

  const currentLang = getLanguage();
  const currentSamples = samples[currentLang] || samples.en;

  container.innerHTML = `
    <h2 class="section-title">${t('spamTitle')}</h2>
    <p class="description">${t('spamGameDesc')}</p>
    
    <div class="glass" style="max-width: 600px; margin: 0 auto; padding: 2rem;">
      <textarea id="spam-input" placeholder="${t('placeholder')}" 
        style="width: 100%; height: 150px; background: rgba(0,0,0,0.2); border: 1px solid var(--glass-border); border-radius: 0.5rem; color: white; padding: 1rem; font-family: inherit; margin-bottom: 1rem; resize: none;"></textarea>
      
      <button class="btn-primary" id="analyze-btn" style="width: 100%;">${t('analyze')}</button>
      
      <div id="result-area" style="margin-top: 2rem; display: none;">
        <h3 id="result-label" style="text-align: center; font-size: 1.5rem; margin-bottom: 1rem;"></h3>
        <div style="height: 10px; background: var(--glass); border-radius: 5px; overflow: hidden; display: flex;">
          <div id="spam-bar" style="height: 100%; background: var(--error);"></div>
          <div id="ham-bar" style="height: 100%; background: var(--success);"></div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 0.5rem; color: var(--text-muted); font-size: 0.8rem;">
          <span>${t('spamProb')}</span>
          <span>${t('hamProb')}</span>
        </div>
      </div>
    </div>

    <div style="max-width: 600px; margin: 2rem auto;">
      <h3 style="margin-bottom: 1rem; text-align: center;">${t('samples')}</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div>
          <h4 style="color: var(--error); margin-bottom: 0.5rem;">${t('spamSamples')}</h4>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${currentSamples.spam.map(s => `<div class="glass sample-item" style="padding: 0.8rem; font-size: 0.85rem; cursor: pointer; transition: 0.2s;">${s}</div>`).join('')}
          </div>
        </div>
        <div>
          <h4 style="color: var(--success); margin-bottom: 0.5rem;">${t('hamSamples')}</h4>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${currentSamples.ham.map(s => `<div class="glass sample-item" style="padding: 0.8rem; font-size: 0.85rem; cursor: pointer; transition: 0.2s;">${s}</div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  const input = container.querySelector('#spam-input');
  const analyzeBtn = container.querySelector('#analyze-btn');
  const resultArea = container.querySelector('#result-area');
  const resultLabel = container.querySelector('#result-label');
  const spamBar = container.querySelector('#spam-bar');
  const hamBar = container.querySelector('#ham-bar');

  analyzeBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;

    const result = classify(text);
    resultArea.style.display = 'block';
    resultLabel.textContent = `${t('result')}: ${result.label}`;
    resultLabel.style.color = result.label === "Spam" ? 'var(--error)' : 'var(--success)';
    
    const total = result.spamProb + result.hamProb;
    spamBar.style.width = `${(result.spamProb / total) * 100}%`;
    hamBar.style.width = `${(result.hamProb / total) * 100}%`;
  });

  container.querySelectorAll('.sample-item').forEach(item => {
    item.addEventListener('click', () => {
      input.value = item.textContent;
      analyzeBtn.click();
      
      // Visual feedback
      item.style.borderColor = 'var(--primary)';
      setTimeout(() => item.style.borderColor = '', 300);
    });
  });
}
