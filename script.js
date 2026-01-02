document.addEventListener("DOMContentLoaded", () => {
  // --- カルーセル機能 ---
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));
    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // 5秒ごとにスライド切り替え
  let slideInterval = setInterval(nextSlide, 5000);

  // ドットクリックで手動切り替え
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
      clearInterval(slideInterval); // 手動操作後は一度タイマーリセット
      slideInterval = setInterval(nextSlide, 5000);
    });
  });

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
    { threshold: 0.1 } // 10%見えたら実行
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});