document.addEventListener('DOMContentLoaded', function() {
    // Update cart count in header
    function updateCartCount() {
        const cartItems = document.querySelectorAll('.cart-item');
        const cartCount = document.querySelectorAll('.cart-count');
        const cartItemCount = document.querySelector('.cart-item-count');
        
        cartCount.forEach(count => {
            count.textContent = cartItems.length;
        });
        
        cartItemCount.textContent = cartItems.length;
    }
    
    // Quantity adjustment
    document.querySelectorAll('.decrease-qty').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
                updateCartTotal();
            }
        });
    });
    
    document.querySelectorAll('.increase-qty').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            let value = parseInt(input.value);
            input.value = value + 1;
            updateCartTotal();
        });
    });
    
    // Remove item from cart
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.remove();
            updateCartCount();
            updateCartTotal();
            
            // Show notification
            showAlert('Đã xóa sản phẩm khỏi giỏ hàng', 'success');
        });
    });
    
    // Empty cart
    const emptyCartBtn = document.querySelector('.btn-outline-danger');
    if (emptyCartBtn) {
        emptyCartBtn.addEventListener('click', function() {
            if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
                document.querySelector('.cart-items').innerHTML = '';
                updateCartCount();
                updateCartTotal();
                showAlert('Đã xóa toàn bộ giỏ hàng', 'success');
            }
        });
    }
    
    // Continue shopping
    const continueShoppingBtn = document.querySelector('.btn-outline-secondary');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            window.location.href = 'products.html';
        });
    }
    
    // Apply coupon
    const applyCouponBtns = document.querySelectorAll('.btn-outline-primary, .btn-primary');
    applyCouponBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const couponInput = this.previousElementSibling;
            if (couponInput.value.trim() === '') {
                showAlert('Vui lòng nhập mã giảm giá', 'warning');
            } else {
                showAlert('Mã giảm giá không hợp lệ', 'danger');
            }
        });
    });
    
    // Checkout
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cartItems = document.querySelectorAll('.cart-item');
            if (cartItems.length === 0) {
                showAlert('Giỏ hàng trống. Vui lòng thêm sản phẩm!', 'warning');
            } else {
                window.location.href = 'checkout.html';
            }
        });
    }
    
    // Update cart total
    function updateCartTotal() {
        let subtotal = 0;
        let discount = 0;
        
        document.querySelectorAll('.cart-item').forEach(item => {
            const priceText = item.querySelector('.current-price').textContent;
            const price = parseInt(priceText.replace(/\.|đ/g, ''));
            const quantity = parseInt(item.querySelector('.qty-input').value);
            subtotal += price * quantity;
            
            // Check for discounted price
            const originalPrice = item.querySelector('.original-price');
            if (originalPrice) {
                const originalPriceValue = parseInt(originalPrice.textContent.replace(/\.|đ/g, ''));
                discount += (originalPriceValue - price) * quantity;
            }
        });
        
        // Update summary
        document.querySelector('.summary-item:nth-child(1) span:last-child').textContent = formatPrice(subtotal);
        document.querySelector('.summary-item:nth-child(2) span:last-child').textContent = `-${formatPrice(discount)}`;
        document.querySelector('.total-price').textContent = formatPrice(subtotal - discount);
    }
    
    // Helper function to format price
    function formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', { style: 'decimal' }).format(price) + 'đ';
    }
    
    // Helper function to show alert
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
        
        // Remove alert after 3 seconds
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
    
    // Initialize
    updateCartCount();
    updateCartTotal();
});