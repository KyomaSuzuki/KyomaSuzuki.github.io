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