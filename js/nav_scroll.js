let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;

// event next click
next.onclick = function(e){
    itemActive = (itemActive + 1) % countItem;
    showSlider();
    e.currentTarget.blur();  // ← remove focus so mobile won’t scroll
}

// event prev click
prev.onclick = function(e){
    itemActive = (itemActive - 1 + countItem) % countItem;
    showSlider();
    e.currentTarget.blur();
}

// auto run slider
let refreshInterval = setInterval(() => next.click(), 5000);

function showSlider(){
    // clear old active
    let oldItem = document.querySelector('.slider .list .item.active');
    let oldThumb = document.querySelector('.thumbnail .item.active');
    oldItem.classList.remove('active');
    oldThumb.classList.remove('active');

    // set new active
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // reset auto-run timer
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => next.click(), 5000);
}

function setPositionThumbnail() {
    let thumb = document.querySelector('.thumbnail .item.active');
    let container = document.querySelector('.thumbnail');

    // horizontal-only centering
    let offset = thumb.offsetLeft + thumb.clientWidth/2 - container.clientWidth/2;
    container.scrollTo({ left: offset, behavior: 'smooth' });
}

// click thumbnail
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', e => {
      e.preventDefault();
      itemActive = index;
      showSlider();
      thumb.blur();  // also blur thumbnail so no focus-scroll
  });
});

const circleElement = document.querySelector('.circle');

const mouse = { x: 0, y: 0 }; 
const previousMouse = { x: 0, y: 0 } 
const circle = { x: 0, y: 0 }; 

let currentScale = 0; 
let currentAngle = 0; 

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

const speed = 0.17;

const tick = () => {
  circle.x += (mouse.x - circle.x) * speed;
  circle.y += (mouse.y - circle.y) * speed;
  const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

  const deltaMouseX = mouse.x - previousMouse.x;
  const deltaMouseY = mouse.y - previousMouse.y;
  previousMouse.x = mouse.x;
  previousMouse.y = mouse.y;
  const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150); 
  const scaleValue = (mouseVelocity / 150) * 0.5;
  currentScale += (scaleValue - currentScale) * speed;
  const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

  const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
  if (mouseVelocity > 20) {
    currentAngle = angle;
  }
  const rotateTransform = `rotate(${currentAngle}deg)`;

  circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

  window.requestAnimationFrame(tick);
}

tick();
const container = document.querySelector('.contact');
    const box = document.getElementById('box');

    // physics constants
    const gravity = 0.5;   // px/frame²
    const friction = 0.99; // horizontal friction

    let posX = 0, posY = 0;
    let velX = 0, velY = 0;
    let isDragging = false;
    let lastMouseX = 0, lastMouseY = 0;
    let thrown = false;

    // initialize at bottom center
    function initPosition() {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const bw = box.offsetWidth;
      const bh = box.offsetHeight;
      posX = (cw - bw) / 2;
      posY = ch - bh;
      box.style.transform = `translate(${posX}px, ${posY}px)`;
    }

    window.addEventListener('load', initPosition);
    window.addEventListener('resize', initPosition);

    box.addEventListener('mousedown', e => {
      isDragging = true;
      thrown = false;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      velX = velY = 0;
      box.classList.add('dragging');
    });

    document.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      velX = dx;
      velY = dy;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      posX += dx;
      posY += dy;
      clamp();
      box.style.transform = `translate(${posX}px, ${posY}px)`;
    });

    document.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      box.classList.remove('dragging');
      clamp();
      box.style.transform = `translate(${posX}px, ${posY}px)`;
      thrown = true;
    });

    function clamp() {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const bw = box.offsetWidth;
      const bh = box.offsetHeight;
      if (posX < 0) posX = 0;
      if (posX + bw > cw) posX = cw - bw;
      if (posY < 0) posY = 0;
      if (posY + bh > ch) posY = ch - bh;
    }

    function physicsLoop() {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const bw = box.offsetWidth;
      const bh = box.offsetHeight;

      if (thrown && !isDragging) {
        velY += gravity;
        posX += velX;
        posY += velY;
        velX *= friction;

        // clamp bottom and stop further motion
        if (posY + bh >= ch) {
          posY = ch - bh;
          velX = velY = 0;
          thrown = false;
        }

        // clamp sides
        if (posX < 0) posX = 0;
        if (posX + bw > cw) posX = cw - bw;

        box.style.transform = `translate(${posX}px, ${posY}px)`;
      }

      requestAnimationFrame(physicsLoop);
    }

physicsLoop();
    
// function toggleMode() {
//   document.body.classList.toggle('dark-mode');
// }
 document.addEventListener("DOMContentLoaded", () => {
    // Check saved mode from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    }

    // Toggle & Save Theme
    window.toggleMode = function () {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    };
 });
  function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
