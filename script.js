// Cuộn mượt mà khi nhấp vào liên kết
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hiệu ứng hover cho nút CTA
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});

// Carousel functionality
const carousel = document.querySelector('.gallery-carousel');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const items = document.querySelectorAll('.gallery-item');
const totalItems = items.length / 2; // Tổng số ảnh gốc (5 ảnh, nhân đôi thành 10 để cuộn liên tục)
let currentIndex = 0;

// Tính chiều rộng của 1 ảnh dựa trên số ảnh hiển thị (3 ảnh một lần)
const itemWidth = 100 / 3; // Mỗi ảnh chiếm 1/3 chiều rộng

// Hàm cập nhật vị trí carousel
function updateCarousel() {
    const offset = -currentIndex * itemWidth;
    carousel.style.transform = `translateX(${offset}%)`;

    // Nếu cuộn đến nhóm ảnh cuối (nhân đôi), quay lại nhóm ảnh đầu tiên
    if (currentIndex >= totalItems) {
        setTimeout(() => {
            carousel.style.transition = 'none'; // Tắt transition để không bị giật
            currentIndex = 0;
            carousel.style.transform = `translateX(0%)`;
            carousel.offsetHeight; // Trigger reflow
            carousel.style.transition = 'transform 0.5s ease-in-out'; // Bật lại transition
        }, 500); // Thời gian khớp với transition
    }
}

// Tự động cuộn mỗi 3 giây
let autoSlide = setInterval(() => {
    currentIndex++;
    updateCarousel();
}, 3000);

// Dừng tự động cuộn khi người dùng tương tác
function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
        currentIndex++;
        updateCarousel();
    }, 3000);
}

// Nút Next
nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
    resetAutoSlide();
});

// Nút Prev
prevBtn.addEventListener('click', () => {
    if (currentIndex === 0) {
        // Nếu đang ở đầu, nhảy đến nhóm ảnh cuối (nhân đôi)
        currentIndex = totalItems - 1;
        carousel.style.transition = 'none';
        const offset = -currentIndex * itemWidth;
        carousel.style.transform = `translateX(${offset}%)`;
        carousel.offsetHeight; // Trigger reflow
        carousel.style.transition = 'transform 0.5s ease-in-out';
    } else {
        currentIndex--;
    }
    updateCarousel();
    resetAutoSlide();
});

// Hiển thị slide đầu tiên khi tải trang
showSlide(currentIndex);


