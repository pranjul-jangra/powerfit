// Navigation menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

const toggleClasses = () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
}

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleClasses();

    if (navLinks.classList.contains("active")) {
        window.addEventListener('click', handleOutsideClick);
    } else {
        window.removeEventListener('click', handleOutsideClick);
    }
});

function handleOutsideClick(e) {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleClasses();
        window.removeEventListener('click', handleOutsideClick);
    }
}

// Pricing cards
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('popular'));
        card.classList.add('popular');
    })
});

// Testimonial cards
const testimonials = document.querySelectorAll('.testimonial-card');

testimonials.forEach(card => {
    card.addEventListener('click', () => {
        testimonials.forEach(c => c.classList.remove('popular'));
        card.classList.add('popular');
    });
});

// Toast
const toast = document.getElementById('toast');

function showToast(title, subtitle) {
    // clear the existing timer
    clearTimeout(toast.hideTimeout);
    toast.classList.remove('show');

    toast.innerHTML = `
      <strong>${title}</strong>
      <p>${subtitle}</p>
    `;

    toast.classList.add('show');

    // set timer to hide toast
    toast.hideTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
};

document.querySelectorAll('button[data-button-type]').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.buttonType;
        const item = btn.dataset.item || '';

        switch (type) {
            case 'buy':
                showToast('Purchase Unavailable', `Buying "${item}" is not active yet.`);
                break;

            case 'join':
                showToast('Membership Info', `Joining the "${item}" plan is coming soon.`);
                break;

            case 'send':
                // Validate the form
                const form = document.querySelector('form');

                const name = form.querySelector('input[name="name"]').value.trim();
                const email = form.querySelector('input[name="email"]').value.trim();
                const phone = form.querySelector('input[name="phone"]').value.trim();
                const reason = form.querySelector('textarea[name="reason"]').value.trim();

                const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

                if (!name || !email || !phone || !reason) {
                    showToast('Form Incomplete', 'Please fill in all required fields before sending.');
                    return;
                }

                if (!emailRegex.test(email)) {
                    showToast("Invalid Email", "Please enter a valid email address.");
                    return;
                }

                showToast('Message Sent', 'Your message has been received. We’ll get back soon!');
                break;

            default:
                showToast('Action Not Available', 'This feature will be available later.');
        }
    });
});

