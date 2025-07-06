const navbarNav = document.querySelector('.navbar-nav');
const hamburger = document.getElementById('hamburger-menu');
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
const searchBtn = document.querySelector('#search-btn');
const shoppingCartBtn = document.querySelector('#shopping-cart-btn');
const shoppingCart = document.querySelector('.shopping-cart');
const modal = document.querySelector('.modal')
const modalCloseBtn = document.querySelector('.modal-close')
const productImage = document.querySelectorAll('.product-image')

hamburger.addEventListener('click', function () {
    navbarNav.classList.toggle('active')
});

shoppingCartBtn.addEventListener('click', function () {
    shoppingCart.classList.toggle('active')
});

productImage.forEach(image => {
    image.addEventListener('click', function () {
        modal.style.display = 'flex';
    })
})

modalCloseBtn.addEventListener('click', function () {
    modal.classList.add('closing');
    setTimeout(() => {
        modal.classList.remove('closing');
        modal.style.display = 'none';
    }, 350);
})

// Menekan tombol ESC akan menutup modal
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
        modal.classList.add('closing');
        setTimeout(() => {
            modal.classList.remove('closing');
            modal.style.display = 'none';
        }, 350);
    }
});

document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
    if (!searchBtn.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }
    if (!shoppingCartBtn.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }
});

document.getElementById('search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    searchBox.focus();
};

