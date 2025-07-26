const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const circleCountInput = document.getElementById('circleCount');
    const maxRadiusInput = document.getElementById('maxRadius');
    const opacityInput = document.getElementById('opacity');

    const circleCountValue = document.getElementById('circleCountValue');
    const radiusValue = document.getElementById('radiusValue');
    const opacityValue = document.getElementById('opacityValue');

    function updateLabels() {
      circleCountValue.textContent = circleCountInput.value;
      radiusValue.textContent = maxRadiusInput.value;
      opacityValue.textContent = opacityInput.value;
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
      init();
    });

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function random(max) {
      return Math.random() * max;
    }

    function randomInt(max) {
      return Math.floor(Math.random() * max);
    }

    function randomColor(opacity) {
      const r = randomInt(256);
      const g = randomInt(256);
      const b = randomInt(256);
      return `rgba(${r},${g},${b},${opacity})`;
    }

    class Circle {
      constructor(x, y, radius, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      }
    }

    let circles = [];

    function init() {
      circles = [];
      const num = parseInt(circleCountInput.value);
      const maxRadius = parseInt(maxRadiusInput.value);
      const opacity = parseFloat(opacityInput.value);

      for (let i = 0; i < num; i++) {
        const radius = random(maxRadius);
        const x = random(canvas.width - radius * 2) + radius;
        const y = random(canvas.height - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * 2;
        const dy = (Math.random() - 0.5) * 2;
        const color = randomColor(opacity);
        circles.push(new Circle(x, y, radius, dx, dy, color));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let circle of circles) {
        circle.update();
      }
      requestAnimationFrame(animate);
    }

    // Initial setup
    resizeCanvas();
    updateLabels();
    init();
    animate();

    // Event listeners
    circleCountInput.addEventListener('input', () => {
      updateLabels();
      init();
    });
    maxRadiusInput.addEventListener('input', () => {
      updateLabels();
      init();
    });
    opacityInput.addEventListener('input', () => {
      updateLabels();
      init();
    });
