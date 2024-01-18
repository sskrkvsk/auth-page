function shining() {
    for (let index = 1; index <= 20; index++) {
        const randomXNumber = Math.floor(Math.random() * index *5);
        const randomYNumber = Math.floor(Math.random() * index *5);        
        var element = document.getElementById(index);
        element.style.left = randomXNumber + "%";
        element.style.top = randomYNumber  + "%";}}

shining();
setInterval(function() {
  shining();
}, 15000);
    
function fallingStar(star, className) {
    var falingStar = document.getElementById(star);
    falingStar.classList.add(className);
};
setTimeout(fallingStar("f-star1", "falling-star-right"), 3000);
setTimeout(fallingStar("f-star2", "falling-star-left"), 5000);

const eye = document.getElementById("eye");
eye.addEventListener('click', ()=> {
  const element = document.getElementById("current-password");
  let type = element.getAttribute('type');
  if (type === 'password') {
    element.setAttribute('type', 'text');
    eye.textContent = 'visibility_off';
  } else {
    element.setAttribute('type', 'password');
    eye.textContent = 'visibility';
  }
})