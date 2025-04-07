document.addEventListener('DOMContentLoaded', function() {
    const gridViewBtn = document.querySelector('[data-view="grid"]');
    const listViewBtn = document.querySelector('[data-view="list"]');
    const gridView = document.querySelector('.product-grid-view');
    const listView = document.querySelector('.product-list-view');
    const quickViewModal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    const quickViewImage = document.querySelector('.quick-view-image');
    const quickViewTitle = document.querySelector('.quick-view-title');
    const quickViewPrice = document.querySelector('.quick-view-price');
    const quickViewRating = document.querySelector('.quick-view-rating');
    const quickViewDescription = document.querySelector('.quick-view-description');
    const productCode = document.querySelector('.product-code');
    const productCategory = document.querySelector('.product-category');
    const productStock = document.querySelector('.product-stock');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;

    // Sample product data
    const products = {
        1: {
            title: "Kẹp Hoa Hồng Nhung",
            price: "150.000",
            originalPrice: "200.000",
            image: "images/products/product1.jpg",
            badge: "Sale",
            rating: 4.5,
            reviews: 120,
            description: "Kẹp hoa hồng nhung xinh xắn, phù hợp với mọi kiểu tóc.",
            code: "PC001",
            category: "Kẹp Hoa",
            stock: "Còn hàng"
        },
        2: {
            title: "Kẹp Ngọc Trai Sang Trọng",
            price: "200.000",
            image: "images/products/product2.jpg",
            rating: 4.0,
            reviews: 85,
            description: "Kẹp ngọc trai thiết kế tinh tế, phù hợp cho các buổi tiệc.",
            code: "PC002",
            category: "Kẹp Ngọc Trai",
            stock: "Còn hàng"
        },
        3: {
            title: "Kẹp Bướm Nhỏ Xinh",
            price: "100.000",
            originalPrice: "150.000",
            image: "images/products/product3.jpg",
            badge: "New",
            rating: 4.8,
            reviews: 200,
            description: "Kẹp bướm nhỏ gọn, dễ thương, phù hợp cho trẻ em.",
            code: "PC003",
            category: "Kẹp Bướm",
            stock: "Còn hàng"
        }
    };

    // Toggle Grid/List View
    gridViewBtn.addEventListener('click', function() {
        this.classList.add('active');
        listViewBtn.classList.remove('active');
        gridView.classList.remove('d-none');
        listView.classList.add('d-none');
    });
    
    listViewBtn.addEventListener('click', function() {
        this.classList.add('active');
        gridViewBtn.classList.remove('active');
        listView.classList.remove('d-none');
        gridView.classList.add('d-none');
    });

    // Color Filter
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Size Filter
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Reset Filters
    const resetBtn = document.querySelector('.btn-outline-danger');
    resetBtn.addEventListener('click', function() {
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        sizeOptions.forEach(opt => opt.classList.remove('active'));
        document.querySelector('#min-price').value = '50.000';
        document.querySelector('#max-price').value = '300.000';
        document.querySelector('.filter-list a.active').classList.remove('active');
        document.querySelector('.filter-list a:first-child').classList.add('active');
    });

    // Price Slider
    if ($('#price-slider').length) {
        $('#price-slider').slider({
            range: true,
            min: 0,
            max: 500000,
            values: [50000, 300000],
            slide: function(event, ui) {
                $('#min-price').val(ui.values[0].toLocaleString() + 'đ');
                $('#max-price').val(ui.values[1].toLocaleString() + 'đ');
            }
        });
    }

    // Category Filter
    const categoryLinks = document.querySelectorAll('.filter-list a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Sort Select
    const sortSelect = document.querySelector('.form-select');
    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        console.log('Sort by:', sortBy);
    });

    // Load Products
    function loadProducts() {
        const productsGrid = document.querySelector('.product-grid-view');
        const productsList = document.querySelector('.product-list-view');
        let gridHTML = '';
        let listHTML = '';
        
        Object.keys(products).forEach(id => {
            const product = products[id];
            gridHTML += `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="product-card">
                        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                        <div class="product-thumb">
                            <img src="${product.image}" class="img-fluid" alt="${product.title}">
                            <div class="product-overlay">
                                <button class="btn btn-outline-light quick-view" data-id="${id}">
                                    <i class="fas fa-eye me-2"></i> Xem nhanh
                                </button>
                                <button class="btn btn-primary add-to-cart" data-id="${id}">
                                    <i class="fas fa-shopping-cart me-2"></i> Thêm giỏ
                                </button>
                                <button class="btn btn-outline-info view-detail">
                                    <i class="fas fa-info-circle me-2"></i> Xem chi tiết
                                </button>
                            </div>
                        </div>
                        <div class="product-details">
                            <h4 class="product-title">${product.title}</h4>
                            <div class="product-price">
                                <span class="current-price">${product.price}đ</span>
                                ${product.originalPrice ? `<span class="original-price">${product.originalPrice}đ</span>` : ''}
                            </div>
                            <div class="product-rating">
                                ${getRatingStars(product.rating)}
                                <span>(${product.reviews})</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            listHTML += `
                <div class="product-item">
                    <div class="product-thumb">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="product-details">
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-price mb-2">
                            <span class="current-price">${product.price}đ</span>
                            ${product.originalPrice ? `<span class="original-price">${product.originalPrice}đ</span>` : ''}
                        </div>
                        <div class="product-rating mb-3">
                            ${getRatingStars(product.rating)}
                            <span>(${product.reviews} đánh giá)</span>
                        </div>
                        <p class="product-description">${product.description}</p>
                        <div class="d-flex">
                            <button class="btn btn-outline-primary me-2 quick-view" data-id="${id}">
                                <i class="fas fa-eye me-2"></i> Xem nhanh
                            </button>
                            <button class="btn btn-primary add-to-cart me-2" data-id="${id}">
                                <i class="fas fa-shopping-cart me-2"></i> Thêm giỏ
                            </button>
                            <button class="btn btn-outline-info view-detail">
                                <i class="fas fa-info-circle me-2"></i> Xem chi tiết
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        productsGrid.innerHTML = gridHTML;
        productsList.innerHTML = listHTML;

        // Thêm sự kiện cho nút Quick View
        const quickViewButtons = document.querySelectorAll('.quick-view');
        quickViewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                const product = products[productId];
                
                if (!product) {
                    console.error(`Product with ID ${productId} not found`);
                    return;
                }
                
                quickViewImage.src = product.image;
                quickViewImage.alt = product.title;
                quickViewTitle.textContent = product.title;
                
                if (product.originalPrice) {
                    quickViewPrice.innerHTML = `<span class="current-price">${product.price}đ</span> <span class="original-price">${product.originalPrice}đ</span>`;
                } else {
                    quickViewPrice.innerHTML = `<span class="current-price">${product.price}đ</span>`;
                }
                
                quickViewRating.innerHTML = `${getRatingStars(product.rating)} <span>(${product.reviews} đánh giá)</span>`;
                quickViewDescription.textContent = product.description;
                productCode.textContent = product.code;
                productCategory.textContent = product.category;
                productStock.textContent = product.stock;
                
                quickViewModal.show();
            });
        });

        // Thêm sự kiện cho nút Add to Cart
        const addToCartButtons = document.querySelectorAll('.add-to-cart, .add-to-cart-modal');
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

        // Thêm sự kiện cho nút Xem chi tiết
        const viewDetailButtons = document.querySelectorAll('.view-detail');
        viewDetailButtons.forEach(button => {
            button.addEventListener('click', function() {
                window.location.href = 'product-detail.html'; // Chuyển hướng tĩnh
            });
        });

        // Điều khiển số lượng trong modal
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
    }
    
    function getRatingStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }
    
    loadProducts();
});