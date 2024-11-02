const slides = document.querySelectorAll('.carousel-inner img');
const dots = document.querySelectorAll('.carousel-dots span');
let currentIndex = 0;
const totalSlides = slides.length;

function updateCarousel() {
    const offset = -currentIndex * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

setInterval(nextSlide, 3000);

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        currentIndex = parseInt(e.target.getAttribute('data-slide'));
        updateCarousel();
    });
});

const buttons = document.querySelectorAll('.pagination-btn');
const totalPages = buttons.length - 2;

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (!button.disabled) {
            document.querySelector('.pagination-btn.active').classList.remove('active');
            button.classList.add('active');

            buttons[0].disabled = index === 1;
            buttons[totalPages + 1].disabled = index === totalPages;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const selectAllCheckbox = document.getElementById('select-all');
    const vacationCards = document.querySelectorAll('.vacation-card');

    selectAllCheckbox.addEventListener('change', function () {
        const isChecked = this.checked;

        vacationCards.forEach(card => {
            const checkbox = card.querySelector('.select-checkbox');
            checkbox.style.display = isChecked ? 'block' : 'none';
            checkbox.checked = isChecked;
        });
    });

    vacationCards.forEach(card => {
        const checkbox = card.querySelector('.select-checkbox');
        checkbox.addEventListener('change', function () {
            if (!this.checked) {
                selectAllCheckbox.checked = false;
            } else if (Array.from(vacationCards).every(card => card.querySelector('.select-checkbox').checked)) {
                selectAllCheckbox.checked = true;
            }
        });
    });

    const searchInput = document.querySelector('.search-bar input');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        vacationCards.forEach(card => {
            const cardTitle = card.querySelector('h3').innerText.toLowerCase();
            if (cardTitle.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
