// Отслеживание прокрутки до конца страницы
addEventListener("scroll", (e) => {
    if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
        let timer = setTimeout(() => {
        showScrollEndModal()
        }, 3000)
        // clearTimeout(timer)
    }
})
// Функция для проверки достижения конца страницы
function checkScrollEnd() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  // Проверяем, достиг ли пользователь конца страницы (с небольшим отступом)
//   if (scrollTop + windowHeight >= documentHeight - 50 && !scrollEndModalShown) {
//     // showScrollEndModal();
//     // scrollEndModalShown = true;
//   }
}

// Функция для показа модального окна при достижении конца
function showScrollEndModal() {
  const modal = document.getElementById('scrollEndModal');
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Блокируем прокрутку
}

// Функция для закрытия модального окна
function closeScrollEndModal() {
  const modal = document.getElementById('scrollEndModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Разблокируем прокрутку
}

// Существующий код для галереи

  const photoItems = document.querySelectorAll('.photo-item');
  const modal = document.getElementById('photoModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const closeBtn = document.querySelector('.close');

  // Закрытие модального окна галереи
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  // Закрытие по клику вне модального окна
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
    
    const scrollEndModal = document.getElementById('scrollEndModal');
    if (event.target === scrollEndModal) {
      closeScrollEndModal();
    }
  });

  // Обработчик для кнопки закрытия модального окна прокрутки
  const scrollEndCloseBtn = document.getElementById('scrollEndClose');
  if (scrollEndCloseBtn) {
    scrollEndCloseBtn.addEventListener('click', closeScrollEndModal);
  }

// Обработка клавиши Escape для закрытия модальных окон
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const photoModal = document.getElementById('photoModal');
    const scrollEndModal = document.getElementById('scrollEndModal');
    
    if (photoModal.style.display === 'block') {
      photoModal.style.display = 'none';
    }
    
    if (scrollEndModal.style.display === 'block') {
      closeScrollEndModal();
    }
  }
});