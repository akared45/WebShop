document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('#navbarNav');
    
    navbarToggler.addEventListener('click', function() {
        navbarNav.classList.toggle('show');
    });
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const quickViewModal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    const quickViewImage = document.querySelector('.quick-view-image');
    const quickViewTitle = document.querySelector('.quick-view-title');
    const quickViewPrice = document.querySelector('.quick-view-price');
    const quickViewRating = document.querySelector('.quick-view-rating');
    const quickViewDescription = document.querySelector('.quick-view-description');
    const productCode = document.querySelector('.product-code');
    const productCategory = document.querySelector('.product-category');
    const productStock = document.querySelector('.product-stock');
    const products = {
        1: {
            title: 'Kẹp Hoa Hồng',
            image: 'images/products/product1.jpg',
            price: '89.000đ',
            originalPrice: '120.000đ',
            rating: 4.5,
            reviews: 15,
            description: 'Kẹp tóc hoa hồng cao cấp với chất liệu vải lụa mềm mại, hoa được làm thủ công tỉ mỉ. Phù hợp cho các dịp dạ tiệc, đi chơi, chụp ảnh.',
            code: 'PC001',
            category: 'Kẹp Hoa',
            stock: 'Còn hàng'
        },
        2: {
            title: 'Kẹp Ngọc Trai',
            image: 'images/products/product2.jpg',
            price: '120.000đ',
            originalPrice: '',
            rating: 4,
            reviews: 8,
            description: 'Kẹp tóc đính ngọc trai sang trọng, phù hợp với các bạn yêu thích phong cách thanh lịch, quý phái.',
            code: 'PC002',
            category: 'Kẹp Đính Đá',
            stock: 'Còn hàng'
        },
        3: {
            title: 'Kẹp Bướm Đính Đá',
            image: 'images/products/product3.jpg',
            price: '75.000đ',
            originalPrice: '95.000đ',
            rating: 5,
            reviews: 23,
            description: 'Kẹp hình bướm đính đá lấp lánh, thiết kế nhẹ nhàng không gây đau đầu khi sử dụng lâu.',
            code: 'PC003',
            category: 'Kẹp Bướm',
            stock: 'Còn hàng'
        },
        4: {
            title: 'Kẹp Minimalist',
            image: 'images/products/product4.jpg',
            price: '65.000đ',
            originalPrice: '',
            rating: 4,
            reviews: 12,
            description: 'Kẹp tóc thiết kế tối giản, phù hợp với phong cách công sở, đi học hàng ngày.',
            code: 'PC004',
            category: 'Kẹp Đơn Giản',
            stock: 'Còn hàng'
        }
    };
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const product = products[productId];
            
            quickViewImage.src = product.image;
            quickViewImage.alt = product.title;
            quickViewTitle.textContent = product.title;
            
            if (product.originalPrice) {
                quickViewPrice.innerHTML = `<span class="current-price">${product.price}</span> <span class="original-price">${product.originalPrice}</span>`;
            } else {
                quickViewPrice.innerHTML = `<span class="current-price">${product.price}</span>`;
            }
            
            let ratingStars = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(product.rating)) {
                    ratingStars += '<i class="fas fa-star"></i>';
                } else if (i === Math.ceil(product.rating) && !Number.isInteger(product.rating)) {
                    ratingStars += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    ratingStars += '<i class="far fa-star"></i>';
                }
            }
            
            quickViewRating.innerHTML = `${ratingStars} <span>(${product.reviews} đánh giá)</span>`;
            quickViewDescription.textContent = product.description;
            productCode.textContent = product.code;
            productCategory.textContent = product.category;
            productStock.textContent = product.stock;
            
            quickViewModal.show();
        });
    });
    const decreaseQty = document.querySelector('.decrease-qty');
    const increaseQty = document.querySelector('.increase-qty');
    const qtyInput = document.querySelector('.qty-input');
    
    decreaseQty.addEventListener('click', function() {
        let value = parseInt(qtyInput.value);
        if (value > 1) {
            qtyInput.value = value - 1;
        }
    });
    
    increaseQty.addEventListener('click', function() {
        let value = parseInt(qtyInput.value);
        qtyInput.value = value + 1;
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart, .add-to-cart-modal');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartItems++;
            cartCount.textContent = cartItems;
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Thêm vào giỏ thành công!</strong> Sản phẩm đã được thêm vào giỏ hàng của bạn.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.remove();
            }, 3000);
            if (this.classList.contains('add-to-cart-modal')) {
                quickViewModal.hide();
            }
        });
    });
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput.value === '') {
            alert('Vui lòng nhập địa chỉ email');
            return;
        }
        const notification = document.createElement('div');
        notification.className = 'newsletter-notification';
        notification.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Cảm ơn bạn đã đăng ký!</strong> Chúng tôi sẽ gửi thông tin khuyến mãi đến email của bạn.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
        this.reset();
    });
});