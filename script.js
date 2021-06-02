const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = canvas.width / 200;
let adjustY = canvas.height / 200;


let mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', function (e) {
    mouse.x = e.x + canvas.clientLeft / 2;
    mouse.y = e.y + canvas.clientTop / 2;
});

ctx.fillStyle = 'white';
ctx.font = 'bold 20px Verdana';
ctx.fillText('Spring', 0, 30);
const textCoordinates = ctx.getImageData(0, 0, canvas.width, 100);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;

        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse.radius + this.size) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx;//dx or dy (original position), dx - something (another position)
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy;
            }
        }
    }

}

function init() {
    particleArray = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                /*
                number 123 here means 50% opacity because possible range for alpha value in clamped array is between 0 and 255. Within this range number 128 is roughly 50%
                */
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 10, positionY * 10))// * something = text size
            }
        }
    }
}
init();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particleArray.forEach(item => {
        item.draw();
        item.update();
    })
    connect();
    setTimeout(animate, 1000/200)
}
animate();

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            opacityValue = 1 - distance / 30;
            ctx.strokeStyle = 'rgba(255,255,255,' + opacityValue + ')';

            if (distance < 150) {
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}