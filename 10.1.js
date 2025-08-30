const UserManager = {
    currentUser: null,
    users: {},

    init() {
        // Load users from localStorage
        const savedUsers = localStorage.getItem('users');
        if (savedUsers) {
            this.users = JSON.parse(savedUsers);
        }

        // Load last logged in user
        const lastUser = localStorage.getItem('lastUser');
        if (lastUser && this.users[lastUser]) {
            this.login(this.users[lastUser]);
        } else {
            // Apply default theme but keep current language
            ThemeManager.applyTheme(false);
            // Явно синхронизируем переключатель языка
            const currentLang = document.documentElement.lang;
            document.getElementById('language-toggle').checked = currentLang === 'en';
            LanguageManager.updateLanguageLabel(currentLang === 'en');
        }

        // Initialize event listeners
        this.setupEventListeners();
    },

    setupEventListeners() {
        document.querySelector('.login-btn').addEventListener('click', () => this.showLoginForm());
        document.querySelector('.logout-btn').addEventListener('click', () => this.logout());
    },

    showLoginForm() {
        const email = prompt('Enter your email:');
        if (!email) return;

        // Check if user exists
        if (this.users[email]) {
            this.login(this.users[email]);
        } else {
            const name = prompt('Enter your name:');
            if (!name) return;

            const newUser = {
                email,
                name,
                settings: {
                    darkTheme: false,
                    language: document.documentElement.lang // Use current language for new user
                }
            };

            this.login(newUser);
        }
    },

    login(user) {
        this.currentUser = user;
        
        // Save/update user in storage
        this.users[user.email] = user;
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('lastUser', user.email);

        // Apply user settings
        ThemeManager.applyTheme(user.settings.darkTheme);
        LanguageManager.applyLanguage(user.settings.language);

        // Update UI
        this.updateUserProfile();
    },

   logout() {
        // Save current settings before logout
        if (this.currentUser) {
            this.currentUser.settings.darkTheme = document.body.classList.contains('dark-theme');
            this.currentUser.settings.language = document.documentElement.lang;
            this.users[this.currentUser.email] = this.currentUser;
            localStorage.setItem('users', JSON.stringify(this.users));
        }

        // Reset user but keep language
        this.currentUser = null;
        localStorage.removeItem('lastUser');
        
        // Apply default theme but don't change language
        ThemeManager.applyTheme(false);
        
        // Явно синхронизируем переключатель языка с текущим состоянием
        const currentLang = document.documentElement.lang;
        document.getElementById('language-toggle').checked = currentLang === 'en';
        LanguageManager.updateLanguageLabel(currentLang === 'en');
        
        // Update UI
        this.updateUserProfile();
    },


    updateUserProfile() {
        const userInfo = document.querySelector('.user-info');
        const loginBtn = document.querySelector('.login-btn');
        const logoutBtn = document.querySelector('.logout-btn');

        if (this.currentUser) {
            userInfo.querySelector('.user-name').textContent = this.currentUser.name;
            userInfo.querySelector('.user-email').textContent = this.currentUser.email;
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
        } else {
            userInfo.querySelector('.user-name').textContent = document.documentElement.lang === 'ru' ? 'Гость' : 'Guest';
            userInfo.querySelector('.user-email').textContent = '';
            loginBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
        }

        // Update translations
        LanguageManager.updateTranslations();
    }
};

// Theme management system
const ThemeManager = {
    init() {
        document.getElementById('theme-toggle').addEventListener('change', () => this.toggleTheme());
        
        // Initialize based on current theme
        const isDark = document.body.classList.contains('dark-theme');
        document.getElementById('theme-toggle').checked = isDark;
        this.updateThemeLabel(isDark);
    },

    toggleTheme() {
        const isDark = document.body.classList.toggle('dark-theme');
        
        // Save to current user if logged in
        if (UserManager.currentUser) {
            UserManager.currentUser.settings.darkTheme = isDark;
            UserManager.users[UserManager.currentUser.email] = UserManager.currentUser;
            localStorage.setItem('users', JSON.stringify(UserManager.users));
        }

        this.updateThemeLabel(isDark);
    },

    applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        
        // Update toggle state
        document.getElementById('theme-toggle').checked = isDark;
        this.updateThemeLabel(isDark);
    },

    updateThemeLabel(isDark) {
        const themeLabel = document.querySelector('.theme-label');
        if (themeLabel) {
            themeLabel.textContent = isDark ? 
                (document.documentElement.lang === 'ru' ? 'Светлая тема' : 'Light theme') : 
                (document.documentElement.lang === 'ru' ? 'Темная тема' : 'Dark theme');
        }
    }
};

// Language management system
const LanguageManager = {
    translations: {
            'Темная тема': {
    ru: 'Темная тема',
    en: 'Dark theme'
  },
  'Светлая тема': {
    ru: 'Светлая тема',
    en: 'Light theme'
  },
  'English': {
    ru: 'English',
    en: 'English'
  },
  'Русский': {
    ru: 'Русский',
    en: 'Russian'
  },
  'web applications': {
    ru: 'веб приложения',
    en: 'web applications'
  },
  'Повседневная практика.': {
    ru: 'Повседневная практика.',
    en: 'Everyday practice.'
  },
  'Спец предложение': {
    ru: 'Спец предложение',
    en: 'Special offer'
  },
  'О компании': {
    ru: 'О компании',
    en: 'About us'
  },
  'Мы диджитал агентство занимаемся полным циклом продвижения компаний в интернете.': {
    ru: 'Мы диджитал агентство занимаемся полным циклом продвижения компаний в интернете.',
    en: 'We are a digital agency specializing in the full cycle of company promotion on the internet.'
  },
  'Разработка сайтов – Сделаем уникальный дизайн согласно вашему фирменному стилю. Напишем чистый код, без использования конструкторов.': {
    ru: 'Разработка сайтов – Сделаем уникальный дизайн согласно вашему фирменному стилю. Напишем чистый код, без использования конструкторов.',
    en: 'Website development - We will create a unique design according to your corporate style. We write clean code without using website builders.'
  },
  'Продвижение – поможем вам быстро добиться желаемого результата, обеспечим постоянный приток новых заявок.': {
    ru: 'Продвижение – поможем вам быстро добиться желаемого результата, обеспечим постоянный приток новых заявок.',
    en: 'Promotion - we will help you quickly achieve the desired results, ensuring a constant flow of new leads.'
  },
  'Портфолио': {
    ru: 'Портфолио',
    en: 'Portfolio'
  },
  'Перейти на сайт': {
    ru: 'Перейти на сайт',
    en: 'Go to website'
  },
  'Что мы предлагаем': {
    ru: 'Что мы предлагаем',
    en: 'What we offer'
  },
  'Высокий уровень исполнения': {
    ru: 'Высокий уровень исполнения',
    en: 'High level of execution'
  },
  'Гарантируем качество работы': {
    ru: 'Гарантируем качество работы',
    en: 'We guarantee quality work'
  },
  'Выполним работу быстро': {
    ru: 'Выполним работу быстро',
    en: 'We will complete the work quickly'
  },
  'Обеспечим поток заявок': {
    ru: 'Обеспечим поток заявок',
    en: 'We will ensure a flow of applications'
  },
  'Автоматизируем работу': {
    ru: 'Автоматизируем работу',
    en: 'We automate work'
  },
  'Разработаем уникальный дизайн': {
    ru: 'Разработаем уникальный дизайн',
    en: 'We will develop a unique design'
  },
  'Напишем чистый': {
    ru: 'Напишем чистый код',
    en: 'We will write clean code'
  },
    'код': {
    ru: 'код',
    en: 'code'
  },
  'Контекстная': {
    ru: 'Контекстная ',
    en: 'Contextual '
  },
    'реклама': {
    ru: 'реклама',
    en: 'advertising'
  },
  'Третированная реклама': {
    ru: 'Третированная реклама',
    en: 'Retargeting advertising'
  },
  'SEO': {
    ru: 'SEO',
    en: 'SEO'
  },
    'продвижение': {
    ru: 'продвижение',
    en: 'promotion'
  },
  'Продвижение в социальных сетях': {
    ru: 'Продвижение в социальных сетях',
    en: 'Social media promotion'
  },
  'Подробнее': {
    ru: 'Подробнее',
    en: 'More details'
  },
  'Наши преимущества': {
    ru: 'Наши преимущества',
    en: 'Our advantages'
  },
  'Сделаем адаптивный дизайн, под любой вид устройств': {
    ru: 'Сделаем адаптивный дизайн, под любой вид устройств',
    en: 'We will make a responsive design for any type of device'
  },
  'Установим на сайт счетчики аналитики и настроим возможность отслеживать результаты прямо с вашего мобильного телефона': {
    ru: 'Установим на сайт счетчики аналитики и настроим возможность отслеживать результаты прямо с вашего мобильного телефона',
    en: 'We will install analytics counters on the site and set up the ability to track results directly from your mobile phone'
  },
  'Настроим все возможные способы обратной связи. Заявки на почту, подключим онлайн консультанта, настроим телефонный звон с сайта, подключим Whatsapp к сайту': {
    ru: 'Настроим все возможные способы обратной связи. Заявки на почту, подключим онлайн консультанта, настроим телефонный звон с сайта, подключим Whatsapp к сайту',
    en: 'We will set up all possible feedback methods. Applications by email, we will connect an online consultant, set up a phone call from the site, connect WhatsApp to the site'
  },
  'Проведем анализ вашей сферы и конкурентов, предложим лучшие инструменты для продвижения в интернете': {
    ru: 'Проведем анализ вашей сферы и конкурентов, предложим лучшие инструменты для продвижения в интернете',
    en: 'We will analyze your field and competitors, offer the best tools for online promotion'
  },
  'Заявка': {
    ru: 'Заявка',
    en: 'Application'
  },
  'Ваше имя': {
    ru: 'Ваше имя',
    en: 'Your name'
  },
  'Ваш Email': {
    ru: 'Ваш Email',
    en: 'Your Email'
  },
  'Сообщение': {
    ru: 'Сообщение',
    en: 'Message'
  },
  'Отправить': {
    ru: 'Отправить',
    en: 'Send'
  },
  'Спец предложения': {
    ru: 'Спец предложения',
    en: 'Special offers'
  },
  'Landing Page': {
    ru: 'Landing Page',
    en: 'Landing Page'
  },
  'продающая посадочная страница.': {
    ru: 'продающая посадочная страница.',
    en: 'selling landing page.'
  },
  'Бизнес сайт': {
    ru: 'Бизнес сайт',
    en: 'Business website'
  },
  'Корпоративный сайт': {
    ru: 'Корпоративный сайт',
    en: 'Corporate website'
  },
  'Запуск контекстной рекламы на месяц': {
    ru: 'Запуск контекстной рекламы на месяц',
    en: 'Launch of contextual advertising for a month'
  },
  'Бесплатно': {
    ru: 'Бесплатно',
    en: 'Free'
  },
  'Пункт': {
    ru: 'Пункт',
    en: 'Item'
  },
  'В своём стремлении улучшить пользовательский опыт мы упускаем, что многие известные личности.': {
    ru: 'В своём стремлении улучшить пользовательский опыт мы упускаем, что многие известные личности.',
    en: 'In our quest to improve the user experience, we overlook that many famous personalities.'
  },
  'Контакты': {
    ru: 'Контакты',
    en: 'Contacts'
  },
    'Москва': {
    ru: 'г.Москва',
    en: 'с.Moscow'
  },
  'digital flow': {
    ru: 'digital flow',
    en: 'digital flow'
  },
  'Гость': {
    ru: 'Гость',
    en: 'Guest'
  },
  'Войти': {
    ru: 'Войти',
    en: 'Login'
  },
  'Выйти': {
    ru: 'Выйти',
    en: 'Logout'
  }
    },

init() {
        const languageToggle = document.getElementById('language-toggle');
        if (languageToggle) {
            languageToggle.addEventListener('change', () => this.toggleLanguage());
            
            // Инициализируем в соответствии с текущим языком
            const isEnglish = document.documentElement.lang === 'en';
            languageToggle.checked = isEnglish;
            this.updateLanguageLabel(isEnglish);
        }
    },

    toggleLanguage() {
        const isEnglish = document.documentElement.lang === 'en';
        const newLang = isEnglish ? 'ru' : 'en';
        
        this.applyLanguage(newLang);
        
        // Save to current user if logged in
        if (UserManager.currentUser) {
            UserManager.currentUser.settings.language = newLang;
            UserManager.users[UserManager.currentUser.email] = UserManager.currentUser;
            localStorage.setItem('users', JSON.stringify(UserManager.users));
        }
    },

    applyLanguage(lang) {
        document.documentElement.lang = lang;
        this.updateTranslations();
        
        // Явно обновляем переключатель
        const isEnglish = lang === 'en';
        document.getElementById('language-toggle').checked = isEnglish;
        this.updateLanguageLabel(isEnglish);
        
        ThemeManager.updateThemeLabel(document.body.classList.contains('dark-theme'));
        
        // Update guest name display
        if (!UserManager.currentUser) {
            UserManager.updateUserProfile();
        }
    },

    updateTranslations() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate') || element.textContent.trim();
            if (this.translations[key] && this.translations[key][document.documentElement.lang]) {
                element.textContent = this.translations[key][document.documentElement.lang];
            }
        });

        // Update buttons
        const loginBtn = document.querySelector('.login-btn');
        const logoutBtn = document.querySelector('.logout-btn');
        
        if (loginBtn) {
            const loginText = document.documentElement.lang === 'ru' ? 'Войти' : 'Login';
            loginBtn.textContent = loginText;
        }
        
        if (logoutBtn) {
            const logoutText = document.documentElement.lang === 'ru' ? 'Выйти' : 'Logout';
            logoutBtn.textContent = logoutText;
        }
    },

    updateLanguageLabel(isEnglish) {
        const languageLabel = document.querySelector('.language-label');
        if (languageLabel) {
            languageLabel.textContent = isEnglish ? 'Русский' : 'English';
        }
    }
};

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    UserManager.init();
    ThemeManager.init();
    LanguageManager.init();
});