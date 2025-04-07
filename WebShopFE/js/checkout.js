document.addEventListener('DOMContentLoaded', function() {
    const nextStepBtns = document.querySelectorAll('.next-step');
    const prevStepBtns = document.querySelectorAll('.prev-step');
    const confirmOrderBtn = document.querySelector('.confirm-order'); 

    nextStepBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const nextStepId = this.getAttribute('data-next');
            const currentStep = this.closest('.checkout-step');
            if (currentStep.id === 'step-1') {
                if (!validateShippingForm()) return;
                updateOrderSummary();
            } else if (currentStep.id === 'step-2') {
                updatePaymentSummary();
            }
            currentStep.classList.add('d-none');
            document.getElementById(nextStepId).classList.remove('d-none');
            document.getElementById(nextStepId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    prevStepBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const prevStepId = this.getAttribute('data-prev');
            const currentStep = this.closest('.checkout-step');
            currentStep.classList.add('d-none');
            document.getElementById(prevStepId).classList.remove('d-none');
            document.getElementById(prevStepId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    confirmOrderBtn.addEventListener('click', function() {
        if (!document.getElementById('agree-terms').checked) {
            alert('Vui lòng đồng ý với điều khoản dịch vụ');
            return;
        }
        processOrder();
    });

    function validateShippingForm() {
        const requiredFields = [
            'first-name', 'last-name', 'email', 
            'phone', 'address', 'city', 'district'
        ];
        
        let isValid = true;
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        if (!isValid) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
        }
        
        return isValid;
    }

    function updateOrderSummary() {
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').options[document.getElementById('city').selectedIndex].text;
        
        document.getElementById('address-summary').textContent = `${address}, ${city}`;
        document.getElementById('contact-summary').textContent = `${firstName} ${lastName} - ${phone}`;
    }

    function updatePaymentSummary() {
        const selectedPayment = document.querySelector('input[name="payment-method"]:checked');
        if (selectedPayment) {
            const paymentLabel = selectedPayment.nextElementSibling.querySelector('h5').textContent;
            document.getElementById('payment-method-summary').textContent = paymentLabel;
        }
    }

    function processOrder() {
        setTimeout(() => {
            document.getElementById('step-3').classList.add('d-none');
            document.getElementById('step-4').classList.remove('d-none');
            document.getElementById('step-4').scrollIntoView({ behavior: 'smooth' });
            document.querySelectorAll('.cart-count').forEach(el => {
                el.textContent = '0';
            });
        }, 1000);
    }

    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const creditCardForm = document.querySelector('.credit-card-form');
            if (this.id === 'credit-card') {
                creditCardForm.classList.remove('d-none');
            } else {
                creditCardForm.classList.add('d-none');
            }
        });
    });

    document.getElementById('city').addEventListener('change', function() {
        const districtSelect = document.getElementById('district');
        districtSelect.innerHTML = '<option value="">Chọn quận/huyện</option>';
        
        if (this.value === 'hanoi') {
            addDistricts(districtSelect, [
                'Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng', 
                'Đống Đa', 'Tây Hồ', 'Cầu Giấy'
            ]);
        } else if (this.value === 'hcm') {
            addDistricts(districtSelect, [
                'Quận 1', 'Quận 3', 'Quận 5', 
                'Quận 10', 'Phú Nhuận', 'Bình Thạnh'
            ]);
        } else if (this.value === 'danang') {
            addDistricts(districtSelect, [
                'Hải Châu', 'Thanh Khê', 'Sơn Trà', 
                'Ngũ Hành Sơn', 'Liên Chiểu'
            ]);
        }
    });
    
    function addDistricts(selectElement, districts) {
        districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district.toLowerCase().replace(/ /g, '-');
            option.textContent = district;
            selectElement.appendChild(option);
        });
    }
    
    document.getElementById('card-number').addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '')
                               .replace(/(\d{4})(?=\d)/g, '$1 ');
    });

    document.getElementById('card-expiry').addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '')
                               .replace(/(\d{2})(?=\d)/g, '$1/');
    });
});