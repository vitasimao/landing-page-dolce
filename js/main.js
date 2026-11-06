// ==========================================================================
// FAQ 
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const icon = item.querySelector('.accordion-icon');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Cerrar todos los demás acordes
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherIcon = otherItem.querySelector('.accordion-icon');
        if (otherIcon) otherIcon.textContent = '+';
      });

      // Si no estaba activo, abrirlo
      if (!isActive) {
        item.classList.add('active');
        if (icon) icon.textContent = '—';
      }
    });
  });
});

// ==========================================================================
// CARRUSEL ROTATIVO AUTOMÁTICO (DOLCE LOVE)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.review-slide');
  const dots = document.querySelectorAll('.review-dot');
  const sliderContainer = document.querySelector('.reviews-slider');

  if (!slides.length || !dots.length) return;

  let currentIndex = 0;
  let autoSlideTimer = null;
  const INTERVAL_TIME = 5000; // Cambia cada 5 segundos

  // Función para mostrar un slide específico
  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove('active'));
    dots.forEach((dot) => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
  }

  // Siguiente slide
  function nextSlide() {
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  // Iniciar rotación automática
  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(nextSlide, INTERVAL_TIME);
  }

  // Detener rotación automática (al pasar el mouse por encima)
  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
    }
  }

  // Event Listeners para los puntos de navegación
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startAutoSlide(); // Reinicia el temporizador tras hacer clic
    });
  });

  // Pausar rotación al pasar el cursor para leer cómodamente
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
  }

  // Arrancar el slider al cargar
  startAutoSlide();
});