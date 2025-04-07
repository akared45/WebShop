document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const newImageSrc = this.getAttribute('data-large');
            mainImage.src = newImageSrc;
            mainImage.alt = this.alt;
        });
    });

    const decreaseBtn = document.querySelector('.decrease-qty');
    const increaseBtn = document.querySelector('.increase-qty');
    const qtyInput = document.querySelector('.qty-input');
    
    decreaseBtn.addEventListener('click', function() {
        let value = parseInt(qtyInput.value);
        if (value > 1) {
            qtyInput.value = value - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        let value = parseInt(qtyInput.value);
        qtyInput.value = value + 1;
    });
    
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    const addToCartBtn = document.querySelector('.add-to-cart');
    
    addToCartBtn.addEventListener('click', function() {
        const productId = this.getAttribute('data-id') || '1';
        const productName = document.querySelector('.product-title').textContent;
        const quantity = parseInt(qtyInput.value);
        const selectedColor = document.querySelector('.color-option.active').getAttribute('data-color');
        const priceText = document.querySelector('.current-price').textContent;
        const price = parseInt(priceText.replace(/\.|đ/g, ''));
        console.log('Added to cart:', {
            id: productId,
            name: productName,
            color: selectedColor,
            quantity: quantity,
            price: price
        });
        
        const cartCountElements = document.querySelectorAll('.cart-count');
        let currentCount = parseInt(cartCountElements[0].textContent) || 0;
        const newCount = currentCount + quantity;
        
        cartCountElements.forEach(el => {
            el.textContent = newCount;
        });
        
        showAlert('Đã thêm sản phẩm vào giỏ hàng', 'success');
    });

    const buyNowBtn = document.querySelector('.buy-now');
    
    buyNowBtn.addEventListener('click', function() {
        addToCartBtn.click(); t
        setTimeout(() => {
            window.location.href = 'checkout.html';
        }, 500);
    });

    const ratingStars = document.querySelectorAll('.rating-input label');
    
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const ratingValue = this.previousElementSibling.value;
            console.log('Selected rating:', ratingValue);
        });
    });

    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alert.style.top = '20px';
        alert.style.right = '20px';
        alert.style.zIndex = '9999';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        document.body.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
    const quickViewButtons = document.querySelectorAll('.quick-view');
    if (quickViewButtons.length > 0) {
       
    }
});