// Form validation script

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    const fullNameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    // Error message containers
    const errorMessages = {
        'full-name': document.getElementById('full-name-error'),
        'email': document.getElementById('email-error'),
        'password': document.getElementById('password-error'),
        'confirm-password': document.getElementById('confirm-password-error')
    };

    // Validation functions
    function validateFullName(value) {
        if (value.trim().length < 1) {
            return 'Full name is required.';
        }
        return '';
    }

    function validateEmail(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Please enter a valid email address';
        }
        return '';
    }

    function validatePassword(value) {
        if (value.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        return '';
    }

    function validateConfirmPassword(password, confirmPassword) {
        if (password !== confirmPassword) {
            return 'Passwords do not match';
        }
        return '';
    }

    // Event listeners for real-time validation
    fullNameInput.addEventListener('input', function() {
        const error = validateFullName(this.value);
        fullNameInput.setAttribute('aria-invalid', error ? 'true' : 'false');
        errorMessages['full-name'].textContent = error;
    });

    emailInput.addEventListener('input', function() {
        const error = validateEmail(this.value);
        emailInput.setAttribute('aria-invalid', error ? 'true' : 'false');
        errorMessages['email'].textContent = error;
    });

    passwordInput.addEventListener('input', function() {
        const error = validatePassword(this.value);
        passwordInput.setAttribute('aria-invalid', error ? 'true' : 'false');
        errorMessages['password'].textContent = error;
    });

    confirmPasswordInput.addEventListener('input', function() {
        const error = validateConfirmPassword(passwordInput.value, this.value);
        confirmPasswordInput.setAttribute('aria-invalid', error ? 'true' : 'false');
        errorMessages['confirm-password'].textContent = error;
    });

    // Password visibility toggle functionality
    const togglePasswordVisibility = (input, icon) => {
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    };

    // Add click event listeners for password visibility icons
    document.querySelectorAll('.form-group i').forEach(icon => {
        const input = icon.previousElementSibling;
        icon.addEventListener('click', () => togglePasswordVisibility(input, icon));
    });

    // Form submission validation
    form.addEventListener('submit', function(e) {
        let hasError = false;
        
        // Validate all fields
        const errors = {
            'full-name': validateFullName(fullNameInput.value),
            'email': validateEmail(emailInput.value),
            'password': validatePassword(passwordInput.value),
            'confirm-password': validateConfirmPassword(passwordInput.value, confirmPasswordInput.value)
        };

        // Update error messages and check for errors
        Object.entries(errors).forEach(([field, error]) => {
            errorMessages[field].textContent = error;
            if (error) hasError = true;
        });

        if (hasError) {
            e.preventDefault();
        }
    });
});
