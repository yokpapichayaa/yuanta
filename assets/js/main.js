function includeHTML(id, file) {
  return fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error("File not found");
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

Promise.all([
  includeHTML("head", "pages/head.html"),
  includeHTML("header", "pages/components/header.html"),
  includeHTML("home", "pages/home.html"),
  includeHTML("footer", "pages/components/footer.html")
]).then(() => {
  initApp();
});



function initApp() {

// menu scroll
const nav = document.querySelector(".navbar");
function updateNav() {
  if (window.scrollY > 0) {
    nav.classList.add('scrolled'); 
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNav);
updateNav();

const thumbs = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 10,
  watchSlidesProgress: true,
});

const swiper = new Swiper(".mySwiper2", {
  spaceBetween: 10,
  autoHeight: true,
  thumbs: {
    swiper: thumbs,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

//selector
  const selectedValues = new Set();
  const selectField    = document.getElementById('selectField');
  const dropdownMenu   = document.getElementById('dropdownMenu');
  const tagsContainer  = document.getElementById('tagsContainer');
  const placeholder    = document.getElementById('selectPlaceholder');

  selectField.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove')) return;
    selectField.classList.toggle('open');
    dropdownMenu.classList.toggle('open');
  });

  document.querySelectorAll('.dropdown-option').forEach(function(opt) {
    opt.addEventListener('click', function(e) {
      e.stopPropagation();
      var val = opt.dataset.value;
      if (selectedValues.has(val)) {
        selectedValues.delete(val);
        opt.classList.remove('selected');
      } else {
        selectedValues.add(val);
        opt.classList.add('selected');
      }
      renderTags();
    });
  });

  function renderTags() {
    tagsContainer.querySelectorAll('.tag').forEach(function(t) { t.remove(); });
    if (selectedValues.size === 0) {
      placeholder.style.display = '';
      return;
    }
    placeholder.style.display = 'none';
    selectedValues.forEach(function(val) {
      var tag = document.createElement('span');
      tag.className = 'tag';
      tag.innerHTML = val + ' <span class="remove">✕</span>';
      tag.querySelector('.remove').addEventListener('click', function(e) {
        e.stopPropagation();
        selectedValues.delete(val);
        document.querySelectorAll('.dropdown-option').forEach(function(o) {
          if (o.dataset.value === val) o.classList.remove('selected');
        });
        renderTags();
      });
      tagsContainer.appendChild(tag);
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!document.getElementById('selectWrapper').contains(e.target)) {
      selectField.classList.remove('open');
      dropdownMenu.classList.remove('open');
    }
  });

//Time input
  function validateTime() {
    var from = document.getElementById('timeFrom').value;
    var to   = document.getElementById('timeTo').value;
    var err  = document.getElementById('err-time');
    if (from && to && from >= to) {
      err.classList.add('visible');
      return false;
    }
    err.classList.remove('visible');
    return true;
  }
  document.getElementById('timeFrom').addEventListener('change', validateTime);
  document.getElementById('timeTo').addEventListener('change', validateTime);

//Clear error
  ['firstName','lastName','email','phone'].forEach(function(id) {
    var el = document.getElementById(id);
    el.addEventListener('input', function() {
      el.classList.remove('error');
      var errEl = document.getElementById('err-' + id);
      if (errEl) errEl.classList.remove('visible');
    });
  });

//Form Validate
  function validateForm() {
    var valid = true;

    // Required fields
    ['firstName','lastName'].forEach(function(id) {
      var input = document.getElementById(id);
      var err   = document.getElementById('err-' + id);
      if (!input.value.trim()) {
        input.classList.add('error');
        err.classList.add('visible');
        valid = false;
      } else {
        input.classList.remove('error');
        err.classList.remove('visible');
      }
    });

    // Email
    var emailInput = document.getElementById('email');
    var emailErr   = document.getElementById('err-email');
    if (!emailInput.value.trim()) {
      emailInput.classList.add('error');
      emailErr.classList.add('visible');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      emailInput.classList.add('error');
      emailErr.classList.add('visible');
      valid = false;
    } else {
      emailInput.classList.remove('error');
      emailErr.classList.remove('visible');
    }

    // Phone (optional, validate only if filled)
    var phoneInput = document.getElementById('phone');
    var phoneErr   = document.getElementById('err-phone');
    if (phoneInput.value.trim() && !/^[0-9]{9,10}$/.test(phoneInput.value.trim())) {
      phoneInput.classList.add('error');
      phoneErr.classList.add('visible');
      valid = false;
    } else {
      phoneInput.classList.remove('error');
      phoneErr.classList.remove('visible');
    }

    // Time range
    if (!validateTime()) valid = false;

    return valid;
  }

//Submit contact
  document.getElementById('submitBtn').addEventListener('click', function() {
    if (!validateForm()) return;

    var btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.textContent = 'กำลังส่งข้อมูล...';

    // Simulate API call delay
    setTimeout(function() {
      btn.disabled = false;
      btn.textContent = 'ส่งข้อมูล';
      showToast('ส่งข้อมูลเรียบร้อยแล้ว เราจะติดต่อกลับโดยเร็วที่สุด');
    }, 1200);
  });

  // toast
  function showToast(msg) {
    var toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function() { toast.classList.remove('show'); }, 3500);
  }
}