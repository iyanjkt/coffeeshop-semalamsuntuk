document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Arabica Gayo', img: 'product-1.jpg', price: 35000, star: 5 },
            { id: 2, name: 'Robusta Toraja', img: 'product-2.jpg', price: 33000, star: 4 },
            { id: 3, name: 'Arabica Flores', img: 'product-3.jpg', price: 36000, star: 5 },
            { id: 4, name: 'Robusta Sidikalang', img: 'product-4.jpg', price: 30000, star: 3 }
        ]
    }));

    Alpine.data('productCard', () => ({
        showDetailModal: false,
        closingModal: false, // State baru untuk mengelola animasi penutupan

        openModal() {
            this.showDetailModal = true;
            this.closingModal = false; // Pastikan false saat membuka
            document.body.style.overflow = 'hidden'; // Mencegah scroll body
        },

        closeModal() {
            this.closingModal = true; // Memicu animasi penutupan
            const modalOverlay = this.$el.closest('.modal-overlay'); // Dapatkan overlay 
            if (modalOverlay) {
                modalOverlay.addEventListener('animationend', () => {
                    this.showDetailModal = false; // Sembunyikan setelah animasi selesai
                    this.closingModal = false; // Reset state
                    document.body.style.overflow = ''; // Mengizinkan scroll body kembali
                }, { once: true }); // Pastikan event listener hanya berjalan sekali
            } else {
                // Fallback jika modalOverlay tidak ditemukan (misal: di luar komponen Alpine.js)
                this.showDetailModal = false;
                this.closingModal = false;
                document.body.style.overflow = '';
            }
        }
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,

        add(newItem) {
            // cek apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum ada atau cart masih kosong
            if (!cartItem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else {
                // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di chart
                this.items = this.items.map((item) => {
                    // jika barang berbeda
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        // jika barang sudah ada, tambah quantity dan totalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                })
            }
        },

        remove(id) {
            const cartItem = this.items.find((item) => item.id === id)
            if (cartItem.quantity > 1) {
                this.items = this.items.map((item) => {
                    if (item.id !== id) {
                        return item
                    } else {
                        item.quantity--
                        item.total = item.price * item.quantity
                        this.quantity--;
                        this.total -= item.price
                        return item
                    }
                })
            } else if (cartItem.quantity === 1) {
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price
            }
        }
    })
});

// Form validation
const checkoutButton = document.getElementById('checkout-button');
const form = document.getElementById('checkoutForm');

// Pastikan tombol dinonaktifkan saat halaman pertama kali dimuat
checkoutButton.classList.add('disabled');

form.addEventListener('keyup', function () {
    let allInputsFilled = true;

    // Loop melalui setiap elemen dalam form
    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];

        // Hanya cek input tipe text, number, email. Abaikan tombol submit.
        if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'email' || element.type === 'number')) {
            if (element.value.trim() === '') {
                allInputsFilled = false;
                break; // Hentikan loop jika ada input yang kosong
            }
        }
    }

    // Atur kelas 'disabled' pada tombol berdasarkan status allInputsFilled
    if (allInputsFilled) {
        checkoutButton.classList.remove('disabled');
    } else {
        checkoutButton.classList.add('disabled');
    }
});

const hamburger = document.getElementById('hamburger-menu');
const navbarNav = document.querySelector('.navbar-nav');
hamburger.addEventListener('click', function () {
    navbarNav.classList.toggle('active')
});

const shoppingCartBtn = document.querySelector('#shopping-cart-btn');
const shoppingCart = document.querySelector('.shopping-cart');
shoppingCartBtn.addEventListener('click', function () {
    shoppingCart.classList.toggle('active')
});

const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
const searchBtn = document.querySelector('#search-btn');
document.getElementById('search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    searchBox.focus();
};

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

const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};

