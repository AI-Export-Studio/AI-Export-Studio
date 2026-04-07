// Initialize Icons
lucide.createIcons();

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('bg-white/80', 'backdrop-blur-xl', 'border-b', 'border-slate-100', 'shadow-sm');
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.remove('bg-white/80', 'backdrop-blur-xl', 'border-b', 'border-slate-100', 'shadow-sm');
        navbar.classList.add('bg-transparent');
    }
});

// Scroll Reveal Animations using Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up, .reveal-scale').forEach((el) => {
    observer.observe(el);
});

// Pricing Toggle Logic
const prices = {
    inr: { 
        mon: { sym: '₹', val: '149', orig: '₹299', link: 'https://rzp.io/rzp/aiexportpro-monthly' }, 
        life: { sym: '₹', val: '499', orig: '₹999', link: 'https://rzp.io/rzp/aiexportpro-lifetime' }, 
        agency: { sym: '₹', val: '1499', orig: '₹2999' } 
    },
    usd: { 
        mon: { sym: '$', val: '4.99', orig: '$9.99', link: 'https://www.paypal.com/ncp/payment/87C9X6ZQEZK34' }, 
        life: { sym: '$', val: '19.99', orig: '$49.99', link: 'https://www.paypal.com/ncp/payment/RLKS5P5U5T7MY' }, 
        agency: { sym: '$', val: '49', orig: '$99' } 
    }
};

// Waitlist Toggle Logic
const showBtn = document.getElementById('show-waitlist-btn');
const waitlistForm = document.getElementById('waitlist-form');
const waitlistSuccess = document.getElementById('waitlist-success');
const emailInput = document.getElementById('waitlist-email');
const submitBtn = document.getElementById('submit-waitlist');

if (showBtn) {
    showBtn.onclick = () => {
        showBtn.classList.add('hidden');
        waitlistForm.classList.remove('hidden');
        emailInput.focus();
    };
}

if (submitBtn) {
    submitBtn.onclick = () => {
        const email = emailInput.value.trim();
        if (email && email.includes('@')) {
            waitlistForm.classList.add('hidden');
            waitlistSuccess.classList.remove('hidden');
            // Log for verification
            console.log('Agency Waitlist joined:', email);
        } else {
            emailInput.classList.add('border-red-400', 'shake');
            setTimeout(() => emailInput.classList.remove('border-red-400', 'shake'), 2000);
        }
    };
}

let currentCurrency = 'inr';
const toggleBtn = document.getElementById('currency-toggle');
const toggleKnob = document.getElementById('toggle-knob');
const labelInr = document.getElementById('label-inr');
const labelUsd = document.getElementById('label-usd');

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        currentCurrency = currentCurrency === 'inr' ? 'usd' : 'inr';
        
        // Update Toggle UI
        if (currentCurrency === 'usd') {
            toggleKnob.classList.replace('translate-x-0', 'translate-x-[24px]');
            labelInr.classList.replace('text-blue-600', 'text-slate-400');
            labelUsd.classList.replace('text-slate-400', 'text-blue-600');
            document.getElementById('knob-symbol').textContent = '$';
        } else {
            toggleKnob.classList.replace('translate-x-[24px]', 'translate-x-0');
            labelInr.classList.replace('text-slate-400', 'text-blue-600');
            labelUsd.classList.replace('text-blue-600', 'text-slate-400');
            document.getElementById('knob-symbol').textContent = '₹';
        }

        // Update Prices
        const p = prices[currentCurrency];
        
        document.querySelectorAll('.price-sym').forEach(el => el.textContent = p.mon.sym);
        
        document.querySelector('.price-val-mon').textContent = p.mon.val;
        document.querySelector('.price-orig-mon').textContent = p.mon.orig;
        document.getElementById('link-mon').href = p.mon.link;

        document.querySelector('.price-val-life').textContent = p.life.val;
        document.querySelector('.price-orig-life').textContent = p.life.orig;
        document.getElementById('link-life').href = p.life.link;

        document.querySelector('.price-val-agency').textContent = p.agency.val;
        document.querySelector('.price-orig-agency').textContent = p.agency.orig;
    });
}