// Массив товаров
const products = [
    {
        "id": 1,
        "name": "Сайт визитка",
        "price": 150,
        "category": "Сайт",
        "rating": 4.5,
        "isNew": true,
        "isPopular": false,
        "isDiscounted": true,
        "image": "im4.png",
        "description": "Сайт для личного представления"
    },
    {
        "id": 2,
        "name": "Браузерная игра",
        "price": 220,
        "category": "Приложение",
        "rating": 4.2,
        "isNew": true,
        "isPopular": true,
        "isDiscounted": false,
        "image": "im2.png",
        "description": "Простая браузерная игра"
    },
    {
        "id": 3,
        "name": "Приложение-пульт",
        "price": 300,
        "category": "Приложение",
        "rating": 4.0,
        "isNew": true,
        "isPopular": false,
        "isDiscounted": false,
        "image": "im3.png",
        "description": "Приложение для устройства"
    },
    {
        "id": 4,
        "name": "Игра на телефон",
        "price": 1000,
        "category": "Приложение",
        "rating": 4.7,
        "isNew": false,
        "isPopular": true,
        "isDiscounted": false,
        "image": "im5.png",
        "description": "Игра"
    },
    {
        "id": 5,
        "name": "Игра на компьтер",
        "price": 2000,
        "category": "Приложение",
        "rating": 4.3,
        "isNew": false,
        "isPopular": false,
        "isDiscounted": false,
        "image": "im1.png",
        "description": "Игра на компьтер"
    },
    {
        "id": 6,
        "name": "Сайт",
        "price": 1200,
        "category": "Сайт",
        "rating": 4.8,
        "isNew": false,
        "isPopular": true,
        "isDiscounted": false,
        "image": "im6.png",
        "description": "Любой сайт"
    },
    {
        "id": 7,
        "name": "Музыкальный бит",
        "price": 350,
        "category": "Другое",
        "rating": 4.4,
        "isNew": true,
        "isPopular": false,
        "isDiscounted": false,
        "image": "im7.png",
        "description": "Музыкальный бит"
    },
    {
        "id": 8,
        "name": "Монтаж видео",
        "price": 200,
        "category": "Услуга",
        "rating": 4.1,
        "isNew": true,
        "isPopular": true,
        "isDiscounted": false,
        "image": "im8.png",
        "description": "Монтаж"
    },
    {
        "id": 9,
        "name": "Обработка фото",
        "price": 100,
        "category": "Услуга",
        "rating": 4.6,
        "isNew": false,
        "isPopular": true,
        "isDiscounted": false,
        "image": "im9.png",
        "description": "Обработка фото"
    },
    {
        "id": 10,
        "name": "Сайт для предприятия",
        "price": 500,
        "category": "Сайт",
        "rating": 4.5,
        "isNew": false,
        "isPopular": false,
        "isDiscounted": true,
        "image": "im10.png",
        "description": "Сайт любой сложности"
    },
    {
        "id": 11,
        "name": "Копия игры",
        "price": 1500,
        "category": "Приложение",
        "rating": 3.9,
        "isNew": true,
        "isPopular": true,
        "isDiscounted": true,
        "image": "im11.png",
        "description": "Копия игры любой сложности"
    },
    {
        "id": 12,
        "name": "Реклама",
        "price": 90,
        "category": "Услуга",
        "rating": 4.0,
        "isNew": false,
        "isPopular": false,
        "isDiscounted": true,
        "image": "im12.png",
        "description": "Продвижение вашего продукта"
    },
    {
        "id": 13,
        "name": "Дизайн сайта",
        "price": 210,
        "category": "Другое",
        "rating": 4.2,
        "isNew": false,
        "isPopular": true,
        "isDiscounted": true,
        "image": "im13.png",
        "description": "Разработаем дизайн"
    },
    {
        "id": 14,
        "name": "Landing page",
        "price": 280,
        "category": "Сайт",
        "rating": 4.3,
        "isNew": false,
        "isPopular": false,
        "isDiscounted": true,
        "image": "im14.png",
        "description": "Продающая страница"
    },
    {
        "id": 15,
        "name": "Бизнес сайт",
        "price": 700,
        "category": "Сайт",
        "rating": 4.4,
        "isNew": false,
        "isPopular": false,
        "isDiscounted": true,
        "image": "im15.png",
        "description": "Корпоративный сайт"
    }
];

// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM элементы
const elements = {
    productsContainer: document.getElementById('products-container'),
    noProductsMessage: document.getElementById('no-products'),
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    sortSelect: document.getElementById('sort-select'),
    categoryFilter: document.getElementById('category-filter'),
    methodButtons: document.querySelectorAll('.array-methods button'),
    cartLink: document.getElementById('cart-link'),
    cartCount: document.getElementById('cart-count'),
    cartModal: document.getElementById('cart-modal'),
    cartItemsContainer: document.getElementById('cart-items'),
    cartTotalPrice: document.getElementById('cart-total-price'),
    checkoutBtn: document.getElementById('checkout-btn'),
    closeModal: document.querySelector('.close')
};

// Инициализация приложения
function init() {
    renderProducts(products);
    updateCartCount();
    initCategories();
    setupEventListeners();
}

// Инициализация категорий
function initCategories() {
    const categories = [...new Set(products.map(product => product.category))];
    elements.categoryFilter.innerHTML = '<option value="all">Все категории</option>';
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        elements.categoryFilter.appendChild(option);
    });
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Поиск
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.searchInput.addEventListener('input', handleSearch);
    
    // Сортировка и фильтрация
    elements.sortSelect.addEventListener('change', handleSortAndFilter);
    elements.categoryFilter.addEventListener('change', handleSortAndFilter);
    
    // Методы массивов
    elements.methodButtons.forEach(btn => {
        btn.addEventListener('click', () => handleArrayMethod(btn.dataset.method));
    });
    
    // Корзина
    elements.cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        openCartModal();
    });
    
    elements.closeModal.addEventListener('click', () => elements.cartModal.style.display = 'none');
    elements.checkoutBtn.addEventListener('click', checkout);
    
    window.addEventListener('click', (e) => {
        if (e.target === elements.cartModal) elements.cartModal.style.display = 'none';
    });
}

// Поиск товаров
function handleSearch() {
    const searchTerm = elements.searchInput.value.toLowerCase().trim();
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
}

// Сортировка и фильтрация
function handleSortAndFilter() {
    const category = elements.categoryFilter.value;
    const sortValue = elements.sortSelect.value;
    
    let filteredProducts = category === 'all' 
        ? [...products] 
        : products.filter(p => p.category === category);
    
    // Применяем сортировку
    filteredProducts = sortProducts(filteredProducts, sortValue);
    
    renderProducts(filteredProducts);
}

// Функция сортировки
function sortProducts(products, sortValue) {
    switch(sortValue) {
        case 'price-asc':
            return [...products].sort((a, b) => a.price - b.price);
        case 'price-desc':
            return [...products].sort((a, b) => b.price - a.price);
        case 'name-asc':
            return [...products].sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return [...products].sort((a, b) => b.name.localeCompare(a.name));
        default:
            return products;
    }
}

// Обработка методов массивов
function handleArrayMethod(method) {
    let result;
    
    switch(method) {
        case 'all':
            result = [...products];
            break;
        case 'filter-price':
            result = products.filter(p => p.price < 500);
            break;
        case 'rating-4':
            result = products.filter(p => p.rating >= 4 && p.rating < 4.5);
            break;
        case 'rating-5':
            result = products.filter(p => p.rating >= 4.5);
            break;
        case 'filter-new':
            result = products.filter(p => p.isNew);
            break;
        case 'filter-popular':
            result = products.filter(p => p.isPopular);
            break;
        case 'filter-luxury':
            result = products.filter(p => p.price > 800);
            break;
        case 'best-sellers':
            result = [...products]
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 5);
            break;
        case 'discounted':
            result = products.filter(p => p.isDiscounted);
            break;
        default:
            result = products;
    }
    
    renderProducts(result);
}

// Отображение товаров
function renderProducts(productsToRender) {
    elements.productsContainer.innerHTML = '';
    
    if (productsToRender.length === 0) {
        elements.noProductsMessage.style.display = 'block';
        return;
    }
    
    elements.noProductsMessage.style.display = 'none';
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        elements.productsContainer.appendChild(productCard);
    });
}

// Создание карточки товара
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${product.isNew ? '<span class="new-badge">NEW</span>' : ''}
            ${product.isDiscounted ? '<span class="discount-badge">-10%</span>' : ''}
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-meta">
                <span class="price">$${product.price}</span>
                <span class="rating">${renderRatingStars(product.rating)}</span>
            </div>
            <p class="description">${product.description}</p>
            <button class="add-to-cart" data-id="${product.id}">В корзину</button>
        </div>
    `;
    
    productCard.querySelector('.add-to-cart').addEventListener('click', () => {
        addToCart(product.id);
    });
    
    return productCard;
}

// Отображение рейтинга звездами
function renderRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    return '★'.repeat(fullStars) + 
           (halfStar ? '½' : '') + 
           '☆'.repeat(emptyStars);
}

// Работа с корзиной
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showCartNotification(product.name);
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCount.textContent = totalItems;
    elements.cartCount.style.visibility = totalItems > 0;
}

function openCartModal() {
    renderCartItems();
    elements.cartModal.style.display = 'block';
}

function renderCartItems() {
    elements.cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        elements.cartItemsContainer.innerHTML = '<p class="empty-cart-message">Ваша корзина пуста</p>';
        elements.cartTotalPrice.textContent = '0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemElement = createCartItemElement(item);
        elements.cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });
    
    elements.cartTotalPrice.textContent = total;
    setupCartItemEventListeners();
}

function createCartItemElement(item) {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
            <h4>${item.name}</h4>
            <div class="cart-item-controls">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                <span class="price">$${item.price * item.quantity}</span>
                <button class="remove-btn" data-id="${item.id}">×</button>
            </div>
        </div>
    `;
    
    return itemElement;
}

function setupCartItemEventListeners() {
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            updateCartItemQuantity(parseInt(e.target.dataset.id), -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            updateCartItemQuantity(parseInt(e.target.dataset.id), 1);
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            removeFromCart(parseInt(e.target.dataset.id));
        });
    });
}

function updateCartItemQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex === -1) return;
    
    cart[itemIndex].quantity += change;
    
    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }
    
    updateCart();
    renderCartItems();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    renderCartItems();
}

function checkout() {
    if (cart.length === 0) {
        alert('Ваша корзина пуста!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Заказ оформлен! Сумма: $${total}\nСпасибо за покупку!`);
    cart = [];
    updateCart();
    elements.cartModal.style.display = 'none';
}

// Уведомление о добавлении в корзину
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${productName} добавлен в корзину`;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', init);