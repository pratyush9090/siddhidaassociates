let path = document.querySelector("path");
let pathLength = path.getTotalLength()
path.style.strokeDasharray = pathLength + ' ' + pathLength;
path.style.strokeDashoffset = pathLength;
window.addEventListener("scroll", () => {
 var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
 var drawLength = pathLength * scrollPercentage;
 path.style.strokeDashoffset = pathLength - drawLength;
}
)

document.addEventListener("DOMContentLoaded", function () {
 const preloader = document.getElementById("preloader");
 const content = document.getElementById("main-content");

 if (preloader) preloader.style.display = "none";
 if (content) content.style.display = "block";
});
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
