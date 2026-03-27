// ── Pricing Toggle Logic for Ai Export Pro ──
const PRICES = {
    inr: {
        mon:  { sym: '₹', val: '99',   orig: '₹199' },
        life: { sym: '₹', val: '299',  orig: '₹999' },
        monthly_link:  'https://rzp.io/rzp/aiexportpro-monthly',
        lifetime_link: 'https://rzp.io/rzp/aiexportpro-lifetime',
    },
    usd: {
        mon:  { sym: '$', val: '4.99', orig: '$9.99' },
        life: { sym: '$', val: '9.99', orig: '$19.99' },
        monthly_link:  'https://www.paypal.com/ncp/payment/87C9X6ZQEZK34',
        lifetime_link: 'https://www.paypal.com/ncp/payment/RLKS5P5U5T7MY',
    }
};

function updatePrices() {
    const toggle = document.getElementById('currencyToggle');
    if (!toggle) return;
    const cur = toggle.checked ? 'usd' : 'inr';
    const p = PRICES[cur];

    const elMap = {
        'sym-mon': p.mon.sym,
        'price-mon': p.mon.val,
        'orig-mon': p.mon.orig,
        'sym-life': p.life.sym,
        'price-life': p.life.val,
        'orig-life': p.life.orig,
        'btn-monthly': p.monthly_link,
        'btn-lifetime': p.lifetime_link
    };

    for (const [id, val] of Object.entries(elMap)) {
        const el = document.getElementById(id);
        if (el) {
            if (id.startsWith('btn-')) el.href = val;
            else el.textContent = val;
        }
    }

    const lblInr = document.getElementById('label-inr');
    const lblUsd = document.getElementById('label-usd');
    if (lblInr) lblInr.classList.toggle('active', !toggle.checked);
    if (lblUsd) lblUsd.classList.toggle('active', toggle.checked);
}

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('currencyToggle');
    const lblInr = document.getElementById('label-inr');
    const lblUsd = document.getElementById('label-usd');

    if (toggle) toggle.addEventListener('change', updatePrices);
    
    if (lblInr) {
        lblInr.addEventListener('click', () => { 
            if (toggle) {
                toggle.checked = false; 
                updatePrices();
            } 
        });
    }
    
    if (lblUsd) {
        lblUsd.addEventListener('click', () => { 
            if (toggle) {
                toggle.checked = true; 
                updatePrices();
            } 
        });
    }

    updatePrices(); // initial render
});
