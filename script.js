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
        mon: { sym: '₹', val: '149', orig: '₹299', link: 'https://rzp.io/rzp/aiexportstudio-monthly' }, 
        life: { sym: '₹', val: '499', orig: '₹999', link: 'https://rzp.io/rzp/aiexportstudio-lifetime' }, 
        agency: { sym: '₹', val: '1499', orig: '₹2999' } 
    },
    usd: { 
        mon: { sym: '$', val: '4.99', orig: '$9.99', link: 'https://www.paypal.com/ncp/payment/87C9X6ZQEZK34' }, 
        life: { sym: '$', val: '19.99', orig: '$49.99', link: 'https://www.paypal.com/ncp/payment/QBDYQZSFPNL28' }, 
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
    submitBtn.onclick = async () => {
        const email = emailInput.value.trim();
        if (email && email.includes('@')) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>';

            const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwst2Myj9AkO0AJsUki-nnNL1fLARSMV0CW2PED_ZO8Z4Kcta1DoQUYXskPEDMC-C3h/exec';
            
            try {
                await fetch(APPS_SCRIPT_URL + '?action=waitlist', {
                    method: 'POST',
                    body: JSON.stringify({ email: email, plan: 'Agency Lifetime', source: 'Landing Page' }),
                    headers: { 'Content-Type': 'text/plain' }
                });
            } catch (e) {
                console.error('Waitlist storage failed:', e);
            }

            waitlistForm.classList.add('hidden');
            waitlistSuccess.classList.remove('hidden');
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
        
        const couponDiscount = document.getElementById('coupon-discount');
        if (couponDiscount) {
            if (currentCurrency === 'usd') {
                couponDiscount.closest('p').innerHTML = `Get it for <span id="coupon-discount" class="font-black text-orange-700 uppercase tracking-wide px-1"> JUST $9.99 </span> today! 🚀`;
            } else {
                couponDiscount.closest('p').innerHTML = `Get an <span id="coupon-discount" class="font-black text-orange-700 uppercase tracking-wide px-1">₹ 200 OFF</span> today!`;
            }
        }

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