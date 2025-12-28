// Фотогалерея по месяцам
document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const navButtons = document.querySelectorAll('.nav-btn');
    const monthSections = document.querySelectorAll('.month-section');
    const photoItems = document.querySelectorAll('.photo-item');
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close');

    // Инициализация - показать все месяцы
    showAllMonths();
    setActiveButton(document.querySelector('[data-month="all"]'));

    // Обработчики навигации по месяцам
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedMonth = this.getAttribute('data-month');
            
            // Обновить активную кнопку
            setActiveButton(this);
            
            // Показать соответствующие секции
            if (selectedMonth === 'all') {
                showAllMonths();
            } else {
                showSpecificMonth(selectedMonth);
            }
        });
    });

    // Обработчики для открытия модального окна
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const date = this.querySelector('.photo-date').textContent;
            const description = this.querySelector('.photo-description').textContent;
            
            openModal(img.src, img.alt, date, description);
        });
    });

    // Закрытие модального окна
    closeModal.addEventListener('click', closeModalWindow);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalWindow();
        }
    });

    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModalWindow();
        }
    });

    // Функции
    function setActiveButton(activeButton) {
        navButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    function showAllMonths() {
        monthSections.forEach(section => {
            section.classList.remove('hidden');
            // Анимация появления
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                section.style.transition = 'all 0.5s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 100);
        });
    }

    function showSpecificMonth(month) {
        monthSections.forEach(section => {
            const sectionMonth = section.getAttribute('data-month');
            
            if (sectionMonth === month) {
                section.classList.remove('hidden');
                // Анимация появления
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    section.style.transition = 'all 0.5s ease';
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 100);
            } else {
                section.classList.add('hidden');
            }
        });
    }

    function openModal(imageSrc, imageAlt, date, description) {
        modalImage.src = imageSrc;
        modalImage.alt = imageAlt;
        modalTitle.textContent = date;
        modalDescription.textContent = description;
        modal.style.display = 'block';
        
        // Предотвращение прокрутки страницы
        document.body.style.overflow = 'hidden';
    }

    function closeModalWindow() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Ленивая загрузка изображений
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Плавная прокрутка к секциям
    function scrollToSection(month) {
        const section = document.querySelector(`[data-month="${month}"]`);
        if (section && month !== 'all') {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Добавить прокрутку к кнопкам навигации
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const month = this.getAttribute('data-month');
            setTimeout(() => scrollToSection(month), 300);
        });
    });

    // Функция для добавления новых фотографий динамически
    window.addPhoto = function(month, imageSrc, date, description, altText) {
        const monthSection = document.querySelector(`[data-month="${month}"]`);
        if (!monthSection) return;

        const photoGrid = monthSection.querySelector('.photo-grid');
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        
        photoItem.innerHTML = `
            <img src="${imageSrc}" alt="${altText}" loading="lazy">
            <div class="photo-info">
                <span class="photo-date">${date}</span>
                <span class="photo-description">${description}</span>
            </div>
        `;

        // Добавить обработчик клика для нового элемента
        photoItem.addEventListener('click', function() {
            const img = this.querySelector('img');
            const dateEl = this.querySelector('.photo-date').textContent;
            const descEl = this.querySelector('.photo-description').textContent;
            
            openModal(img.src, img.alt, dateEl, descEl);
        });

        photoGrid.appendChild(photoItem);
    };

    // Функция для удаления фотографий
    window.removePhoto = function(month, photoIndex) {
        const monthSection = document.querySelector(`[data-month="${month}"]`);
        if (!monthSection) return;

        const photoItems = monthSection.querySelectorAll('.photo-item');
        if (photoItems[photoIndex]) {
            photoItems[photoIndex].remove();
        }
    };

    // Поиск по фотографиям
    window.searchPhotos = function(searchTerm) {
        const allPhotos = document.querySelectorAll('.photo-item');
        const searchLower = searchTerm.toLowerCase();

        allPhotos.forEach(photo => {
            const description = photo.querySelector('.photo-description').textContent.toLowerCase();
            const date = photo.querySelector('.photo-date').textContent.toLowerCase();
            
            if (description.includes(searchLower) || date.includes(searchLower)) {
                photo.style.display = 'block';
            } else {
                photo.style.display = 'none';
            }
        });
    };

    console.log('Фотогалерея инициализирована успешно!');
});