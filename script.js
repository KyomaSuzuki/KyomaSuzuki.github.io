// カルーセルの制御
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

// 5秒ごとに切り替え
setInterval(nextSlide, 5000);

// --- 追加：スクロールフェードインの制御 ---
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// すべてのsectionタグに自動でフェードインを適用する場合
document.querySelectorAll('section').forEach(section => {
    if(section.id !== 'hero') { // hero以外
        section.classList.add('fade-in');
        observer.observe(section);
    }
});