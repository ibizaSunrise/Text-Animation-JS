const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

//handle mouse
let mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
    console.log(mouse.x, mouse.y)
});

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('A', 0, 40);
ctx.strokeStyle = 'white';
ctx.strokeRect(0,0,100,100);
const data = ctx.getImageData(0, 0, 100, 100);

