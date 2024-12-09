interface VisualizerConfig {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  analyser: AnalyserNode;
  dataArray: Uint8Array;
}

export class AudioVisualizer {
  private config: VisualizerConfig;
  private hue: number = 200; // Start with blue
  private particles: Particle[] = [];
  private readonly numParticles = 150;

  constructor(config: VisualizerConfig) {
    this.config = config;
    this.initializeParticles();
  }

  private initializeParticles() {
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push(new Particle(
        this.config.width / 2,
        this.config.height / 2,
        Math.random() * Math.PI * 2
      ));
    }
  }

  draw() {
    const { ctx, width, height, analyser, dataArray } = this.config;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    analyser.getByteFrequencyData(dataArray);
    
    // Calculate average frequency
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    
    this.particles.forEach((particle, index) => {
      const frequencyIndex = Math.floor((index / this.numParticles) * dataArray.length);
      const amplitude = dataArray[frequencyIndex];
      const scale = (amplitude / 255) * 2;
      
      particle.update(scale, average / 255);
      particle.draw(ctx, this.hue);
    });
    
    // Slowly shift hue for color variation
    this.hue = (this.hue + 0.1) % 360;
  }
}

class Particle {
  private x: number;
  private y: number;
  private angle: number;
  private radius: number;
  private baseRadius: number = 2;
  private velocity: number = 0.02;

  constructor(x: number, y: number, angle: number) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.radius = this.baseRadius;
  }

  update(scale: number, intensity: number) {
    this.angle += this.velocity * intensity;
    this.radius = this.baseRadius + (scale * 3);
  }

  draw(ctx: CanvasRenderingContext2D, hue: number) {
    const distance = 100 + Math.sin(this.angle) * 20;
    const x = this.x + Math.cos(this.angle) * distance;
    const y = this.y + Math.sin(this.angle) * distance;

    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.8)`;
    ctx.fill();
  }
}