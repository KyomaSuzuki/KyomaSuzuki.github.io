document.addEventListener("DOMContentLoaded", () => {
  // --- カルーセル機能 ---
  const container = document.querySelector(".carousel-container");
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;
  let slideInterval;

  // タッチ位置の記録用変数
  let startX = 0;
  let endX = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function startTimer() {
    stopTimer();
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopTimer() {
    clearInterval(slideInterval);
  }

  // --- スワイプ検知ロジック ---
  const handleGesture = () => {
    const threshold = 50; // スワイプと判定する最低距離(px)
    if (startX - endX > threshold) {
      // 左へスワイプ -> 次のスライド
      nextSlide();
      startTimer();
    } else if (endX - startX > threshold) {
      // 右へスワイプ -> 前のスライド
      prevSlide();
      startTimer();
    }
  };

  // タッチイベント (スマホ)
  container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  container.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleGesture();
  }, { passive: true });

  // マウスイベント (PCでのドラッグ操作用)
  container.addEventListener("mousedown", (e) => {
    startX = e.clientX;
  });

  container.addEventListener("mouseup", (e) => {
    endX = e.clientX;
    handleGesture();
  });

  // ドットクリック
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startTimer();
    });
  });

  // 初期化
  showSlide(currentSlide);
  startTimer();

  // --- スクロールフェードイン (Intersection Observer) ---
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 }
  );
  revealElements.forEach((el) => revealObserver.observe(el));
});

// --- 押したら動く「ロボットギミック」ボタン ---
const robotButton = document.getElementById("robot-gimmick-btn");
if (robotButton) {
  const messages = [
    "起動中… システムチェックOK！",
    "モーター、正常に稼働しています",
    "ギア比、完璧です",
    "ロボット、動作確認完了！",
    "工学の力、ここに見せます",
    "トルク全開でいきます",
  ];
  const speechBubble = document.getElementById("robot-speech-bubble");

  function spawnGear() {
    const gear = document.createElement("span");
    gear.className = "falling-gear";
    gear.textContent = "⚙️";
    gear.style.left = Math.random() * 100 + "vw";
    gear.style.animationDuration = 1.8 + Math.random() * 1.4 + "s";
    gear.style.fontSize = 14 + Math.random() * 18 + "px";
    document.body.appendChild(gear);
    gear.addEventListener("animationend", () => gear.remove());
  }

  robotButton.addEventListener("click", () => {
    // ボタン自体をぐるんと回転
    robotButton.classList.remove("spin");
    void robotButton.offsetWidth; // reflow でアニメーションをリスタート
    robotButton.classList.add("spin");

    // 歯車を降らせる
    for (let i = 0; i < 24; i++) {
      setTimeout(spawnGear, i * 40);
    }

    // 吹き出しメッセージ
    if (speechBubble) {
      speechBubble.textContent =
        messages[Math.floor(Math.random() * messages.length)];
      speechBubble.classList.add("show");
      clearTimeout(speechBubble._hideTimer);
      speechBubble._hideTimer = setTimeout(() => {
        speechBubble.classList.remove("show");
      }, 2200);
    }
  });
}
