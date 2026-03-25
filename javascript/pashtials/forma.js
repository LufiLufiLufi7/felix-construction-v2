// ========================================
// CONTACT-FORM.JS
// Validacija kontakt forme sa prikazom grešaka i success poruka
// Telefon: intl-tel-input biblioteka (zastave + prefiks po državi)
// ========================================

// Regex patterns
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // ========== INICIJALIZACIJA intl-tel-input ==========
    const phoneInput = document.getElementById('phone');

    const iti = window.intlTelInput(phoneInput, {
        initialCountry: 'auto',
        geoIpLookup: function(callback) {
            fetch('https://ip2c.org/s')
                .then(res => res.text())
                .then(data => {
                    const result = (data || '').split(';');
                    if (result[0] === '1') {
                        callback(result[1]);
                    } else {
                        callback('rs');
                    }
                })
                .catch(() => callback('rs'));
        },
        loadUtilsOnInit: 'https://cdn.jsdelivr.net/npm/intl-tel-input@23/build/js/utils.js',
        autoPlaceholder: 'aggressive',
        preferredCountries: ['rs', 'ba', 'hr', 'me', 'si', 'de', 'at', 'ch'],
        nationalMode: false,
    });

    // ========== POMOCNE FUNKCIJE ==========

    function showError(input, message) {
        $(input).removeClass('success').addClass('error');
        const errorDiv = input.closest('.mb-3, .mb-4').querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.add('show');
        }
    }

    function showSuccess(input) {
        $(input).removeClass('error').addClass('success');
        const errorDiv = input.closest('.mb-3, .mb-4').querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.classList.remove('show');
        }
    }

    function clearState(input) {
        $(input).removeClass('error success');
        const errorDiv = input.closest('.mb-3, .mb-4').querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.classList.remove('show');
        }
    }

    // ========== VALIDACIONE FUNKCIJE ==========

    function validateName(input) {
        const val = input.value.trim();
        if (val === '') {
            showError(input, 'Ime i prezime je obavezno polje');
            return false;
        } else if (val.length < 3) {
            showError(input, 'Ime mora imati najmanje 3 karaktera');
            return false;
        } else {
            showSuccess(input);
            return true;
        }
    }

    function validateEmail(input) {
        const val = input.value.trim();
        if (val === '') {
            showError(input, 'Email je obavezno polje');
            return false;
        } else if (!emailRegex.test(val)) {
            showError(input, 'Unesite validnu email adresu (npr. primer@domen.com)');
            return false;
        } else {
            showSuccess(input);
            return true;
        }
    }

    function validatePhone() {
        const val = phoneInput.value.trim();

        if (val === '') {
            clearState(phoneInput);
            return true;
        }

        if (iti.isValidNumber()) {
            showSuccess(phoneInput);
            return true;
        } else {
            const errorCode = iti.getValidationError();
            const country   = iti.getSelectedCountryData();
            const name      = country.name || 'izabrane države';
            const dial      = country.dialCode ? `+${country.dialCode}` : '';

            const msgs = {
                1:  `Nevažeći pozivni broj`,
                2:  `Broj za ${name} (${dial}) je prekratak`,
                3:  `Broj za ${name} (${dial}) je predugačak`,
                4:  `Unesena vrednost nije broj telefona`,
            };

            showError(phoneInput, msgs[errorCode] ?? `Unesite validan broj za ${name} (${dial})`);
            return false;
        }
    }

    function validateTerms(input) {
        if (!input.checked) {
            showError(input, 'Morate prihvatiti uslove korišćenja');
            return false;
        } else {
            showSuccess(input);
            return true;
        }
    }

    function validateMessage(input) {
        const val = input.value.trim();
        if (val === '') {
            showError(input, 'Poruka je obavezno polje');
            return false;
        } else if (val.length < 10) {
            showError(input, 'Poruka mora imati najmanje 10 karaktera');
            return false;
        } else {
            showSuccess(input);
            return true;
        }
    }

    // ========== VALIDACIJA DATUMA ==========
    function validateDate(input) {
        const val = input.value.trim();
        if (val === '') {
            showError(input, 'Datum početka projekta je obavezno polje');
            return false;
        }

        const selectedDate = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            showError(input, 'Datum ne može biti u prošlosti');
            return false;
        } else {
            showSuccess(input);
            return true;
        }
    }

    // ========== REAL-TIME VALIDACIJA SA BLOKIRANJEM ==========

    const nameInput    = document.getElementById('name');
    const emailInput   = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const termsInput   = document.getElementById('terms');
    const dateInput    = document.getElementById('projectDate');

    function lockFieldsAfter(unlockedInput) {
        const order = [nameInput, emailInput, phoneInput, messageInput, termsInput, dateInput];
        const idx = order.indexOf(unlockedInput);
        order.forEach((field, i) => {
            if (i > idx) {
                field.disabled = true;
                field.closest('.mb-3, .mb-4').style.opacity = '0.5';
            } else {
                field.disabled = false;
                field.closest('.mb-3, .mb-4').style.opacity = '1';
            }
        });
    }

    lockFieldsAfter(nameInput);

    // --- IME ---
    nameInput.addEventListener('input', () => validateName(nameInput));
    nameInput.addEventListener('blur', () => {
        if (validateName(nameInput)) {
            lockFieldsAfter(emailInput);
            emailInput.focus();
        }
    });

    
    // --- EMAIL ---
    emailInput.addEventListener('input', () => validateEmail(emailInput));
    emailInput.addEventListener('blur', () => {
    if (validateEmail(emailInput)) {
        lockFieldsAfter(messageInput);
        }
    });

    // --- TELEFON ---
    phoneInput.addEventListener('input', () => validatePhone());
    phoneInput.addEventListener('blur', () => {
        validatePhone();
        lockFieldsAfter(messageInput);
    });
    phoneInput.addEventListener('countrychange', () => {
        if (phoneInput.value.trim() !== '') validatePhone();
    });

    // --- PORUKA ---
    messageInput.addEventListener('input', () => validateMessage(messageInput));
    messageInput.addEventListener('blur', () => {
        if (validateMessage(messageInput)) {
            lockFieldsAfter(termsInput);
        }
    });

    // --- USLOVI KORISCENJA ---
    termsInput.addEventListener('change', () => {
        if (validateTerms(termsInput)) {
            lockFieldsAfter(dateInput);
        }
    });

    // --- DATUM ---
    dateInput.addEventListener('change', () => validateDate(dateInput));
    dateInput.addEventListener('blur', () => validateDate(dateInput));

    // ========== SUBMIT ==========
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        $('.success-message').remove();

        const isValid =
            validateName(nameInput) &
            validateEmail(emailInput) &
            validatePhone() &
            validateMessage(messageInput) &
            validateTerms(termsInput) &
            validateDate(dateInput);

        if (!isValid) {
            const firstError = form.querySelector('.forma-input.error');
            if (firstError) firstError.focus();
            return;
        }

        submitForm(
            nameInput.value.trim(),
            emailInput.value.trim(),
            iti.getNumber(),
            messageInput.value.trim(),
            dateInput.value
        );
    });

    // ========== SLANJE FORME ==========
    function submitForm(name, email, phone, message, date) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Šalje se...';

        // Formatiraj datum za prikaz
        const formattedDate = new Date(date).toLocaleDateString('sr-RS', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        setTimeout(() => {
            const $success = $(`
                <div class="success-message">
                    <strong>✓ Uspešno poslato!</strong><br>
                    Hvala ${name}, vaša poruka je primljena. Kontaktiraćemo vas uskoro na ${email}.<br>
                    Datum početka projekta: <strong>${formattedDate}</strong>
                </div>
            `);

            $(form).parent().append($success);
            $success.hide().fadeIn(300);

            console.log('=== PODACI FORME ===');
            console.log('Ime:', name);
            console.log('Email:', email);
            console.log('Telefon:', phone || 'Nije unet');
            console.log('Poruka:', message);
            console.log('Datum početka:', date);
            console.log('====================');

            form.reset();
            iti.setCountry('rs');
            clearState(termsInput);
            clearState(dateInput);
            $('.forma-input').removeClass('error success');
            $('.error-message').removeClass('show').text('');

            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            lockFieldsAfter(nameInput);

            setTimeout(() => {
                $success.fadeOut(300, function() { $(this).remove(); });
            }, 7000);

        }, 1500);
    }
}