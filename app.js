/**
 * Shree Anjani Belt and Bearing Store — Client Logic & Omnichannel Engine
 * Lightweight • Zero Dependencies • Fast Mobile Performance
 */

const WHATSAPP_PRIMARY = "9779804462602";
const PHONE_PRIMARY = "+9779804462602";
const PHONE_SECONDARY = "+9779847301185";

document.addEventListener('DOMContentLoaded', () => {
  initLiveOperatingStatus();
  initFooterYear();
  initPWA();
});

/* ==========================================================================
   1. OMNICHANNEL CONTACT WIDGET LOGIC (CRITICAL)
   ========================================================================== */

window.toggleOmniModal = function() {
  const modal = document.getElementById('omniModal');
  const backdrop = document.getElementById('omniBackdrop');
  if (!modal || !backdrop) return;

  const isActive = modal.classList.contains('active');
  if (isActive) {
    window.closeOmniModal();
  } else {
    modal.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeOmniModal = function() {
  const modal = document.getElementById('omniModal');
  const backdrop = document.getElementById('omniBackdrop');
  if (modal) modal.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
};

window.openOmniContact = function(type) {
  if (type === 'whatsapp') {
    const text = encodeURIComponent("Namaste, I am inquiring about machinery/parts from your website.");
    window.open(`https://wa.me/${WHATSAPP_PRIMARY}?text=${text}`, '_blank');
  } else if (type === 'call') {
    window.location.href = `tel:${PHONE_PRIMARY}`;
  } else {
    window.toggleOmniModal();
  }
};

window.sendItemInquiry = function(itemName) {
  const text = encodeURIComponent(`Namaste, I would like to inquire about pricing and stock for: ${itemName} from your website.`);
  window.open(`https://wa.me/${WHATSAPP_PRIMARY}?text=${text}`, '_blank');
};

window.toggleOnSiteForm = function() {
  const drawer = document.getElementById('onSiteFormDrawer');
  const chevron = document.getElementById('formChevron');
  if (!drawer) return;

  drawer.classList.toggle('open');
  if (chevron) {
    if (drawer.classList.contains('open')) {
      chevron.className = 'fa-solid fa-chevron-up';
    } else {
      chevron.className = 'fa-solid fa-chevron-down';
    }
  }
};

/* ==========================================================================
   2. ON-SITE MESSAGE / RFQ FORM HANDLER
   ========================================================================== */

window.handleOnSiteChat = function(form) {
  const formData = new FormData(form);
  const name = formData.get('name') || '';
  const phone = formData.get('phone') || '';
  const message = formData.get('message') || '';

  if (!name || !phone || !message) {
    alert("Please fill in your name, phone number, and parts inquiry.");
    return;
  }

  // 1. Save Lead Locally
  const leadObj = {
    name,
    phone,
    message,
    timestamp: new Date().toISOString()
  };

  try {
    const existingLeads = JSON.parse(localStorage.getItem('shree_anjani_leads') || '[]');
    existingLeads.push(leadObj);
    localStorage.setItem('shree_anjani_leads', JSON.stringify(existingLeads));
  } catch (e) {
    console.warn("Storage warning:", e);
  }

  // 2. Format WhatsApp Payload
  const waText = encodeURIComponent(
    `*NEW WEBSITE INQUIRY - SHREE ANJANI STORE*\n` +
    `👤 *Name/Factory:* ${name}\n` +
    `📞 *Phone:* ${phone}\n` +
    `📦 *Requirement:* ${message}\n` +
    `📍 *Location:* Nepal`
  );

  // 3. Provide Feedback
  const feedback = document.getElementById('formFeedback');
  if (feedback) {
    feedback.innerHTML = '<span style="color: #10B981; font-weight: bold;">✅ Message Recorded! Opening WhatsApp to connect with sales engineer...</span>';
  }

  form.reset();

  // 4. Open WhatsApp
  setTimeout(() => {
    window.open(`https://wa.me/${WHATSAPP_PRIMARY}?text=${waText}`, '_blank');
    window.closeOmniModal();
  }, 600);
};

/* ==========================================================================
   3. LIVE NEPAL TIMEZONE OPERATING CALCULATOR (UTC+5:45)
   ========================================================================== */

function initLiveOperatingStatus() {
  const statusEl = document.getElementById('liveOperatingStatus');
  if (!statusEl) return;

  function update() {
    // Current UTC time
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    // Nepal Time: UTC + 5 hours 45 minutes
    const nepalTime = new Date(utc + (3600000 * 5.75));

    const hours = nepalTime.getHours();
    const minutes = nepalTime.getMinutes();
    const currentTimeDec = hours + (minutes / 60);

    // Open 7 days a week: 08:30 AM (8.5) to 08:00 PM (20.0)
    const isOpen = currentTimeDec >= 8.5 && currentTimeDec < 20.0;

    if (isOpen) {
      statusEl.innerHTML = '<span class="pulse-dot"></span> <strong>Open Now</strong> (8:30 AM – 8:00 PM Nepal Time)';
      statusEl.style.color = '#10B981';
      statusEl.style.borderColor = 'rgba(16, 185, 129, 0.4)';
    } else {
      statusEl.innerHTML = '<span class="pulse-dot" style="background-color: #F59E0B; box-shadow: 0 0 8px #F59E0B;"></span> <strong>Opens 8:30 AM</strong> • Emergency WhatsApp Available';
      statusEl.style.color = '#F59E0B';
      statusEl.style.borderColor = 'rgba(245, 158, 11, 0.4)';
    }
  }

  update();
  setInterval(update, 60000);
}

/* ==========================================================================
   4. CATALOG SEARCH FILTER
   ========================================================================== */

window.searchCatalog = function() {
  const input = document.getElementById('partSearchInput');
  if (!input) return;

  const query = input.value.trim().toLowerCase();
  if (!query) {
    const catalog = document.getElementById('catalog');
    if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  // Keyword Matching
  if (query.includes('crush') || query.includes('222') || query.includes('223') || query.includes('jaw') || query.includes('screen') || query.includes('ep')) {
    scrollToElement('crusher-maintenance');
  } else if (query.includes('rice') || query.includes('flour') || query.includes('mill') || query.includes('rubber') || query.includes('huller') || query.includes('ucp')) {
    scrollToElement('rice-mill-setups');
  } else if (query.includes('lathe') || query.includes('work') || query.includes('turn') || query.includes('press') || query.includes('machin')) {
    scrollToElement('workshop-services');
  } else {
    scrollToElement('belts-bearings');
  }
};

function scrollToElement(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    el.style.outline = '2px solid #38BDF8';
    setTimeout(() => { el.style.outline = 'none'; }, 2000);
  }
}

/* ==========================================================================
   5. FOOTER & PWA INITIALIZATION
   ========================================================================== */

function initFooterYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function initPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(err => {
        console.log('SW registration note:', err);
      });
    });
  }
}
