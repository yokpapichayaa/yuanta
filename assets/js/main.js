function includeHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error("File not found");
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(error => console.error(error));
}

includeHTML("head", "pages/head.html");
includeHTML("header", "pages/components/header.html");
includeHTML("home", "pages/home.html");
includeHTML("footer", "pages/components/footer.html");



setTimeout(() => {
  document.addEventListener("DOMContentLoaded", function() {
      const video = document.querySelector(".video-site");
      console.log(video);
      video.muted = true;
      video.play().catch(() => {});
  });
  const dropdown = document.querySelector(".dropdown-toggle");
  const list = document.querySelector(".dropdown-menu");
  dropdown.addEventListener("mouseenter", () => {
    list.classList.add("onhover");
  });

  dropdown.addEventListener("mouseleave", () => {
    list.classList.remove("onhover");
  });

// เมนูหลัก
  const dropdownMenu = document.querySelector(".dropdown-l");
  const listMenu = document.querySelector(".menu-drop");
  const items = document.querySelectorAll(".menu-drop-item");
// ถ้า hover menu editorial จะขึ้น class onhover
  dropdownMenu.addEventListener("mouseenter", () => {
    dropdownMenu.classList.add("onhover");
    listMenu.classList.add("onhover");
  });

  dropdownMenu.addEventListener("mouseleave", () => {
    dropdownMenu.classList.remove("onhover");
    listMenu.classList.remove("onhover");
  });

  
  // ถ้าเอาเม้าส์ hover ตัวหนังสืออยู่ ถ้าไกลกว่า 50px dropdown menu จะหลุดออก
  items.forEach((item) => {
    listMenu.addEventListener("mouseenter", () => {
      dropdownMenu.classList.add("onhover");
      listMenu.classList.add("onhover");
    });

    document.addEventListener("mousemove", (e) => {
      let isInsideAnyItem = false;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();

        if (
          e.clientX >= rect.left - 50 &&
          e.clientX <= rect.right + 50 &&
          e.clientY >= rect.top - 50 &&
          e.clientY <= rect.bottom + 50
        ) {
          isInsideAnyItem = true;
        }
      });

      if (!isInsideAnyItem) {
        listMenu.classList.remove("onhover");
        dropdownMenu.classList.remove("onhover");
      }
    });
  });

  // ส่วน collection1 ที่ hover แล้วปิดรูปออก
  const wrapcol = document.querySelector(".wrap-col .box-col");
  const boxImage = document.querySelector(".wrap-col .box-image");
  wrapcol.addEventListener("mouseenter", () => {
    boxImage.classList.add("onhover");
  });

  wrapcol.addEventListener("mouseleave", () => {
    boxImage.classList.remove("onhover");
  });

  //ส่วน collection ที่ hover แล้วเอารูปออก
  const wraps = document.querySelectorAll(".box-colmid .wrapper");

  wraps.forEach((wrap) => {
    const image = wrap.querySelector(".box-imagecol");

    if (image) {
      wrap.addEventListener("mouseenter", () => {
        image.classList.add("onhover");
      });

      wrap.addEventListener("mouseleave", () => {
        image.classList.remove("onhover");
      });
    }
  });

  //annountment
  const track = document.querySelector(".announcement__track");
  const groups = document.querySelectorAll(".announcement__group");

  function duplicateGroups() {
    const trackWidth = track.scrollWidth;
    const screenWidth = window.innerWidth;

    // clone จนกว่าจะกว้างพออย่างน้อย 2 เท่าหน้าจอ
    while (track.scrollWidth < screenWidth * 2) {
      groups.forEach(group => {
        const clone = group.cloneNode(true);
        track.appendChild(clone);
      });
    }
  }

duplicateGroups();

  const selectBox = document.querySelector(".select-box");
  const options = document.querySelector(".options");
  const selected = document.getElementById("selected");
  const arrow = document.querySelector(".arrow");

  selectBox.addEventListener("click", () => {
    options.classList.toggle("active");
    arrow.classList.toggle("rotate");
  });

  document.querySelectorAll(".options li").forEach(option => {
    option.addEventListener("click", () => {
      selected.textContent = option.textContent;
      options.classList.remove("active");
      arrow.classList.remove("rotate");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-select")) {
      options.classList.remove("active");
      arrow.classList.remove("rotate");
    }
  });

const inputs = document.querySelectorAll(".input-re input");

inputs.forEach(input => {
  input.addEventListener("focus", function() {
    const label = document.querySelector(
      `.contact-title[for="${this.id}"]`
    );
    label.classList.add("active");
  });

  input.addEventListener("blur", function() {
    const label = document.querySelector(
      `.contact-title[for="${this.id}"]`
    );

    if (this.value === "") {
      label.classList.remove("active");
    }
  });
});

//Menu mobile
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-mobile");
const dropdownToggle = document.querySelector(".dropdown-tog");
const dropdownmobile = document.querySelector(".dropdown-show");

// เปิด/ปิด main menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});

// เปิด/ปิด dropdown
const navToggle = document.querySelector(".nav-toggle");
const navItem = document.querySelector(".nav-submenu");
const arrowSub = document.querySelector(".nav-arrow");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navItem.classList.toggle("open");
  arrowSub.classList.toggle("open");
});

//New Section + Bestseller

const logo = document.querySelector('.logo');
const boxwrap = document.querySelectorAll('.box-wrap');
let ticking = false;

function update() {

  const logoRect = logo.getBoundingClientRect();

  boxwrap.forEach(wrap => {

    const inner = wrap.querySelector('.box-text-inner');
    if (!inner) return;

    const wrapRect = wrap.getBoundingClientRect();

    let move = 0;

    const isInRange =
      logoRect.bottom >= wrapRect.top &&
      logoRect.top <= wrapRect.bottom;

    if (isInRange) {

      const titleStart =
        wrapRect.top +
        (wrapRect.height - inner.offsetHeight) / 2;

      const overlap = logoRect.bottom - titleStart;

      if (overlap > 0) {

        const maxMove =
          wrapRect.bottom -
          (titleStart + inner.offsetHeight);

        move = Math.min(overlap, maxMove);
      }
    }

    move = Math.max(0, move);

    inner.style.transform = `translate3d(0, ${move}px, 0)`;

  });

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(update);
    ticking = true;
  }
});
}, 1000);