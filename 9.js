// Прелоадер
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Бургер-меню
document.addEventListener('DOMContentLoaded', function() {
    const burgerIcon = document.getElementById('burger-icon');
    const burgerNav = document.getElementById('burger-nav');
    const burgerOverlay = document.getElementById('burger-overlay');
    
    burgerIcon.addEventListener('click', function() {
        document.body.classList.toggle('burger-active');
    });
    
    burgerOverlay.addEventListener('click', function() {
        document.body.classList.remove('burger-active');
    });
    
    // Плавная прокрутка для ссылок меню
    document.querySelectorAll('.burger-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.remove('burger-active');
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});


// Медиагалерея
// Замените класс MediaGallery в 9.js на этот:
class MediaGallery {
    constructor() {
        this.effects = {
            city: {
                image: 'https://images.unsplash.com/photo-1496564203457-11bb12075d90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                name: 'Город'
            },
            ocean: {
                image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
                name: 'Океан'
            },
            forest: {
                image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
                name: 'Лес'
            },
            storm: {
                image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                sound:  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
                name: 'Гроза'
            },
            coffee: {
                image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
                name: 'Кофе'
            },
            train: {
                image: 'https://images.steamusercontent.com/ugc/1706283447539612945/16AE967732B867BC8ECE8147EB60CC3705C4BC9E/?imw=512&amp;imh=341&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
                sound:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
                name: 'Поезд'
            },
            rain: {
                image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
                name: 'Дождь'
            },
            space: {
                image: 'https://avatars.mds.yandex.net/i?id=1d6b0f72495c014179f62f262b2c0daa78c2a9bc-4612564-images-thumbs&n=13',
                sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
                name: 'Космос'
            },
            cat: {
                image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
                name: 'Кот'
            },
            fireworks: {
                image: 'https://avatars.mds.yandex.net/i?id=eea95c7b16525e00304cf9edd0f5f4f0b10254b9-9181437-images-thumbs&n=13',
                 sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
                name: 'Фейерверк'
            }
        };
        
        this.currentImage = document.querySelector('.gallery-image');
        this.audio = document.querySelector('.gallery-audio');
        this.playBtn = document.querySelector('.play-btn');
        this.volumeControl = document.querySelector('.volume-control');
        this.currentEffectDisplay = document.querySelector('.current-effect');
        this.isPlaying = false;
        
        this.setupEvents();
        this.loadEffect('city');
    }
    
    loadEffect(effectKey) {
        const effect = this.effects[effectKey];
        this.currentImage.style.opacity = '0';
        
        // Останавливаем предыдущий звук
        this.audio.pause();
        this.isPlaying = false;
        this.playBtn.textContent = '▶';
        
        setTimeout(() => {
            this.currentImage.src = effect.image;
            this.audio.src = effect.sound;
            this.currentEffectDisplay.textContent = effect.name;
            this.currentImage.style.opacity = '1';
            
            // Автоматически запускаем звук после клика
            this.audio.play()
                .then(() => {
                    this.isPlaying = true;
                    this.playBtn.textContent = '❚❚';
                })
                .catch(e => {
                    console.log("Автовоспроизведение заблокировано. Нажмите Play вручную.");
                });
        }, 300);
    }
    
    setupEvents() {
        document.querySelectorAll('.gallery-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const effectKey = btn.dataset.effect;
                this.loadEffect(effectKey);
            });
        });
        
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.volumeControl.addEventListener('input', () => {
            this.audio.volume = this.volumeControl.value;
        });
        
        this.audio.addEventListener('ended', () => {
            this.isPlaying = false;
            this.playBtn.textContent = '▶';
        });
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
            this.playBtn.textContent = '▶';
        } else {
            this.audio.play()
                .then(() => {
                    this.playBtn.textContent = '❚❚';
                })
                .catch(e => {
                    alert("Нажмите на любую кнопку эффекта для активации звука.");
                });
        }
        this.isPlaying = !this.isPlaying;
    }
}
// Инициализация медиагалереи
document.addEventListener('DOMContentLoaded', () => {
    new MediaGallery();
});


// Параллакс с движущимися слоями - исправленная версия
   document.addEventListener('DOMContentLoaded', function() {
      const parallaxBox = document.querySelector('.parallax-box');
      const layer1 = document.getElementById('layer1');
      const layer2 = document.getElementById('layer2');
      
      // Настройки скорости (можно менять)
      const speed1 = 0.3;  // Первый слой (вниз)
      const speed2 = -0.4; // Второй слой (вверх)
      
      // Обработчик скролла
      window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const boxTop = parallaxBox.offsetTop;
        const boxHeight = parallaxBox.offsetHeight;
        
        // Рассчитываем положение скролла относительно контейнера
        const scrollPercent = (scrollY - boxTop) / boxHeight;
        
        // Применяем эффект только когда контейнер в поле зрения
        if (scrollY > boxTop - window.innerHeight && scrollY < boxTop + boxHeight) {
          // Двигаем первый слой вниз
          if (layer1) {
            layer1.style.transform = `translateY(${scrollY * speed1}px)`;
          }
          
          // Двигаем второй слой вверх
          if (layer2) {
            layer2.style.transform = `translateY(${scrollY * speed2}px)`;
          }
        }
      });
    });
// Видео плеер
// Модальное окно с видео для логотипа компании
document.addEventListener('DOMContentLoaded', function() {
    const companyLogo = document.getElementById('company-logo');
    const videoModal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const closeModal = document.querySelector('.close-modal');
    
    companyLogo.addEventListener('click', function() {
        videoModal.style.display = 'block';
        modalVideo.src = 'https://www.youtube.com/embed/XFkzRNyygfk';
    });
    
    closeModal.addEventListener('click', function() {
        videoModal.style.display = 'none';
        modalVideo.src = '';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
            modalVideo.src = '';
        }
    });
});

// Слайдер для соцсетей в футере
// Слайдер для соцсетей в футере// Бесконечный слайдер для соцсетей в футере
class InfiniteSocialSlider {
    constructor() {
        this.slider = document.querySelector('.social-slider');
        this.slidesContainer = document.querySelector('.social-slides');
        this.slides = document.querySelectorAll('.social-slide');
        this.prevBtn = document.querySelector('.social-prev');
        this.nextBtn = document.querySelector('.social-next');
        
        // Клонируем первый и последний слайды для бесконечного эффекта
        this.cloneSlides();
        
        this.currentIndex = 1;
        this.slideWidth = this.slides[0].offsetWidth;
        this.animationEnabled = true;
        
        this.initSlider();
        this.setupEvents();
    }
    
    cloneSlides() {
        const firstClone = this.slides[0].cloneNode(true);
        const lastClone = this.slides[this.slides.length - 1].cloneNode(true);
        
        firstClone.classList.add('clone');
        lastClone.classList.add('clone');
        
        this.slidesContainer.appendChild(firstClone);
        this.slidesContainer.insertBefore(lastClone, this.slides[0]);
        
        // Обновляем коллекцию слайдов
        this.slides = document.querySelectorAll('.social-slide');
    }
    
    initSlider() {
        this.slidesContainer.style.transform = `translateX(${-this.currentIndex * this.slideWidth}px)`;
    }
    
    nextSlide() {
        if (!this.animationEnabled) return;
        this.animationEnabled = false;
        
        this.currentIndex++;
        this.slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        this.slidesContainer.style.transform = `translateX(${-this.currentIndex * this.slideWidth}px)`;
        
        // Проверяем, достигли ли мы клонированного первого слайда
        if (this.currentIndex >= this.slides.length - 1) {
            setTimeout(() => {
                this.slidesContainer.style.transition = 'none';
                this.currentIndex = 1;
                this.slidesContainer.style.transform = `translateX(${-this.currentIndex * this.slideWidth}px)`;
                this.animationEnabled = true;
            }, 500);
        } else {
            setTimeout(() => {
                this.animationEnabled = true;
            }, 500);
        }
    }
    
    prevSlide() {
        if (!this.animationEnabled) return;
        this.animationEnabled = false;
        
        this.currentIndex--;
        this.slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        this.slidesContainer.style.transform = `translateX(${-this.currentIndex * this.slideWidth}px)`;
        
        // Проверяем, достигли ли мы клонированного последнего слайда
        if (this.currentIndex <= 0) {
            setTimeout(() => {
                this.slidesContainer.style.transition = 'none';
                this.currentIndex = this.slides.length - 2;
                this.slidesContainer.style.transform = `translateX(${-this.currentIndex * this.slideWidth}px)`;
                this.animationEnabled = true;
            }, 500);
        } else {
            setTimeout(() => {
                this.animationEnabled = true;
            }, 500);
        }
    }
    
    setupEvents() {
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        
        
        // Адаптация при изменении размера окна
        window.addEventListener('resize', () => {
            this.slideWidth = this.slides[0].offsetWidth;
            this.slidesContainer.style.transition = 'none';
            this.slidesContainer.style.transform = `translateX(${-this.currentIndex * this.slideWidth}px)`;
        });
    }
}

// Инициализация бесконечного слайдера соцсетей
document.addEventListener('DOMContentLoaded', () => {
    new InfiniteSocialSlider();
});

// Плавная прокрутка для всех якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Эффекты при скролле
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Пример: изменение прозрачности header
    const header = document.querySelector('header');
    if (header) {
        header.style.backgroundColor = `rgba(26, 31, 37, ${Math.min(scrollPosition / 200, 0.9)})`;
    }
    
    // Анимация элементов при появлении в viewport
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
});

// Инициализация карты (Яндекс Карты)
function initMap() {
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function() {
            const map = new ymaps.Map('map', {
                center: [55.76, 37.64], // Координаты вашего офиса
                zoom: 15
            });
            
            // Добавляем метку
            const placemark = new ymaps.Placemark([55.76, 37.64], {
                hintContent: 'Наш офис',
                balloonContent: 'Приходите к нам в гости!'
            });
            
            map.geoObjects.add(placemark);
        });
    }
}

// Добавляем скрипт Яндекс Карт
const mapScript = document.createElement('script');
mapScript.src = 'https://api-maps.yandex.ru/2.1/?apikey=ваш_API_ключ&lang=ru_RU';
mapScript.onload = initMap;
document.head.appendChild(mapScript);

// Добавляем классы для анимации при скролле
document.querySelectorAll('section').forEach((section, index) => {
    if (index > 0) { // Пропускаем первый section
        section.classList.add('animate-on-scroll');
    }
});

// Стили для анимации при скролле
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style);

