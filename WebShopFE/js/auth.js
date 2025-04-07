document.addEventListener('DOMContentLoaded', function() {
    const switchForms = document.querySelectorAll('.switch-form');
    
    switchForms.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetForm = this.getAttribute('data-target');
            
            document.querySelectorAll('.col-lg-5').forEach(form => {
                form.classList.add('d-none');
            });
            
            document.getElementById(targetForm).classList.remove('d-none');
            
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            if (targetForm === 'login-form') {
                document.querySelector('a[href="login.html"]').classList.add('active');
            } else {
                document.querySelector('a[href="register.html"]').classList.add('active');
            }
        });
    });
    
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const input = this.closest('.input-group').querySelector('input');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    const passwordInput = document.getElementById('register-password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const progressBar = document.querySelector('.password-strength .progress-bar');
            const strengthText = document.querySelector('.password-strength .strength-text');
            
            let strength = 0;
            if (password.length >= 8) strength += 1;
            if (password.match(/[a-z]/)) strength += 1;
            if (password.match(/[A-Z]/)) strength += 1;
            if (password.match(/[0-9]/)) strength += 1;
            if (password.match(/[^a-zA-Z0-9]/)) strength += 1;

            let width = 0;
            let color = '';
            let text = '';
            
            switch(strength) {
                case 0:
                case 1:
                    width = 20;
                    color = '#dc3545';
                    text = 'Yếu';
                    break;
                case 2:
                    width = 40;
                    color = '#fd7e14';
                    text = 'Trung bình';
                    break;
                case 3:
                    width = 60;
                    color = '#ffc107';
                    text = 'Khá';
                    break;
                case 4:
                    width = 80;
                    color = '#28a745';
                    text = 'Mạnh';
                    break;
                case 5:
                    width = 100;
                    color = '#20c997';
                    text = 'Rất mạnh';
                    break;
            }
            
            progressBar.style.width = `${width}%`;
            progressBar.style.backgroundColor = color;
            strengthText.textContent = text;
            strengthText.style.color = color;
        });
    }
    
    const registerForm = document.querySelector('#register-form form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            if (password !== confirmPassword) {
                e.preventDefault();
                alert('Mật khẩu xác nhận không khớp!');
                document.getElementById('register-confirm-password').focus();
            }
        });
    }
    
    const socialLoginBtns = document.querySelectorAll('.social-login .btn');
    socialLoginBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.textContent.trim();
            alert(`Bạn đã chọn đăng nhập bằng ${provider}. Chức năng này sẽ được tích hợp sau.`);
        });
    });
});