document.addEventListener("DOMContentLoaded", () => {
  // --- フッターの著作権年を自動更新 ---
  const yearEl = document.getElementById("copyright-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- Works一覧を works-data.js から自動描画 ---
  const worksGrid = document.getElementById("works-grid");
  if (worksGrid && typeof worksData !== "undefined") {
    worksGrid.innerHTML = worksData
      .map((work) => {
        const links = (work.links || [])
          .map(
            (link) =>
              `<a href="${link.url}" target="_blank" class="card-link">${link.label}</a>`
          )
          .join("");
        return `
          <div class="work-card">
            <img src="${work.image}" alt="${work.title}" class="works-image" />
            <div class="card-content">
              <h3>${work.title}</h3>
              <p>${work.description}</p>
              <div class="card-links">${links}</div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // --- カルーセル機能 (トップページにのみ存在) ---
  const container = document.querySelector(".carousel-container");
  if (container) {
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
  }

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

  // --- Skillsカードの3Dチルト演出 (クリック/タップで少し傾く) ---
  const tiltCards = document.querySelectorAll(".skill-item");
  tiltCards.forEach((card) => {
    card.classList.add("tilt-card");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -12;
      const rotateY = ((x - rect.width / 2) / rect.width) * 12;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });

    // タップ操作向け: クリックで軽くバウンドさせる
    card.addEventListener("click", () => {
      card.classList.remove("tilt-tap");
      void card.offsetWidth;
      card.classList.add("tilt-tap");
    });
  });
});