const translations = {
  vi: {
    title: "Hệ Thống AI Lab",
    home: "Trang Chủ",
    ttt: "Cờ Caro AI",
    sudoku: "Giải Sudoku",
    spam: "Phát Hiện Thư Rác",
    smartHome: "Nhà Thông Minh",
    footer: "2026",

    // Home
    welcome: "Chào mừng đến với Hệ Thống AI Lab",
    heroDesc: "Khám phá các thuật toán nâng cao và hệ thống logic thông qua các bản demo tương tác.",
    tttDesc: "Đối thủ bất bại sử dụng thuật toán Minimax với tìm kiếm không gian trạng thái đầy đủ.",
    sudokuDesc: "Giải quyết ràng buộc nâng cao sử dụng quay lui và heuristic MRV.",
    spamDesc: "Phân loại email sử dụng suy luận xác suất Naive Bayes.",
    smartHomeDesc: "Công cụ tự động hóa dựa trên luật lệ để điều khiển môi trường thông minh.",

    // Tic-Tac-Toe
    tttTitle: "Cờ Caro AI",
    tttGameDesc: "Hãy thử đánh bại máy tính. AI sử dụng thuật toán minimax để đảm bảo nó không bao giờ thua.",
    resetGame: "Chơi Lại",
    draw: "Hòa!",
    winner: "Người thắng",

    // Sudoku
    sudokuTitle: "Trình Giải Sudoku",
    sudokuGameDesc: "Nhập câu đố hoặc thử một mẫu có sẵn. Trình giải sử dụng thuật toán quay lui với heuristic MRV.",
    solve: "Giải Đố",
    clear: "Xóa",
    preset: "Tải Mẫu",
    solving: "Đang giải...",
    solved: "Đã giải xong!",
    noSolution: "Không tìm thấy lời giải",
    invalidState: "Trạng thái ban đầu không hợp lệ",
    presetLoaded: "Đã tải mẫu",

    // Spam
    spamTitle: "Phát Hiện Thư Rác",
    spamGameDesc: "Dán một đoạn email để phân tích. Bộ phân loại sử dụng thuật toán Naive Bayes được huấn luyện trên một tập dữ liệu mẫu nhỏ.",
    placeholder: "Nhập nội dung tại đây...",
    analyze: "Phân Tích Tin Nhắn",
    result: "Kết quả",
    spamProb: "Xác suất là Thư rác",
    hamProb: "Xác suất là Thư thường",
    samples: "Mẫu tin nhắn thử nghiệm",
    spamSamples: "Mẫu Thư Rác",
    hamSamples: "Mẫu Thư Thường",

    // Smart Home
    shTitle: "Tự Động Hóa Nhà Thông Minh",
    shGameDesc: "Bật/tắt các cảm biến môi trường để xem công cụ dựa trên luật lệ hoạt động. Các luật ưu tiên an toàn và tiết kiệm năng lượng.",
    sensors: "Cảm Biến",
    status: "Trạng Thái Tự Động",
    dark: "Trời tối?",
    occupied: "Có người ở nhà?",
    rain: "Trời mưa?",
    temp: "Nhiệt độ trong nhà",
    rulesLog: "Nhật Ký Luật Hoạt Động",
    initialized: "Hệ thống đã khởi tạo. Đang theo dõi cảm biến...",
    active: "HOẠT ĐỘNG",
    off: "TẮT"
  },
  en: {
    title: "AI Lab Suite",
    home: "Home",
    ttt: "Tic-Tac-Toe",
    sudoku: "Sudoku Solver",
    spam: "Spam Detector",
    smartHome: "Smart Home",
    footer: "© 2026 AI Lab Suite. All rights reserved. No emojis used in this interface.",

    // Home
    welcome: "Welcome to AI Lab Suite",
    heroDesc: "Explore advanced algorithms and logic-based systems through interactive demonstrations.",
    tttDesc: "Unbeatable opponent using the Minimax algorithm with full state-space search.",
    sudokuDesc: "Advanced constraint satisfaction using backtracking and MRV heuristics.",
    spamDesc: "Email classification using probabilistic Naive Bayes inference.",
    smartHomeDesc: "Rule-based automation engine for intelligent environmental control.",

    // Tic-Tac-Toe
    tttTitle: "Tic-Tac-Toe AI",
    tttGameDesc: "Try to beat the machine. The AI uses a minimax algorithm to ensure it never loses.",
    resetGame: "Reset Game",
    draw: "It's a draw!",
    winner: "Winner",

    // Sudoku
    sudokuTitle: "Sudoku Solver",
    sudokuGameDesc: "Enter a puzzle or try a preset. The solver uses backtracking with the MRV heuristic.",
    solve: "Solve Puzzle",
    clear: "Clear",
    preset: "Load Preset",
    solving: "Solving...",
    solved: "Solved!",
    noSolution: "No solution found",
    invalidState: "Invalid Initial State",
    presetLoaded: "Preset loaded",

    // Spam
    spamTitle: "Spam Detector",
    spamGameDesc: "Paste an email snippet to analyze. The classifier uses a Naive Bayes algorithm trained on a small sample set.",
    placeholder: "Enter message here...",
    analyze: "Analyze Message",
    result: "Result",
    spamProb: "Spam Probability",
    hamProb: "Ham Probability",
    samples: "Sample Messages",
    spamSamples: "Spam Samples",
    hamSamples: "Ham Samples",

    // Smart Home
    shTitle: "Smart Home Automation",
    shGameDesc: "Toggle environmental sensors to see the rule-based engine in action. Rules prioritize safety and energy efficiency.",
    sensors: "Sensors",
    status: "Automation Status",
    dark: "Is Dark Outside?",
    occupied: "Someone at Home?",
    rain: "Is it Raining?",
    temp: "Inside Temperature",
    rulesLog: "Active Rules Log",
    initialized: "System initialized. Monitoring sensors...",
    active: "ACTIVE",
    off: "OFF"
  }
};

let currentLang = 'vi';

export function t(key) {
  return translations[currentLang][key] || key;
}

export function setLanguage(lang) {
  currentLang = lang;
  document.dispatchEvent(new CustomEvent('langChange'));
}

export function getLanguage() {
  return currentLang;
}
