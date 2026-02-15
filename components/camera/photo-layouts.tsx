import React, { useEffect, useRef } from "react";
import { drawText, drawImage, drawFrame } from "../../utils/canvas-utils";

interface LayoutProps {
  images: string[];
  onSave: (dataUrl: string) => void;
  backgroundColor?: string;
}

// Helper for complex gradients
const applyGradient = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  colors: string[]
) => {
  const grad = ctx.createLinearGradient(0, 0, width, height);
  colors.forEach((color, i) => grad.addColorStop(i / (colors.length - 1), color));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
};

// Generic Layout Wrapper to reduce boilerplate
const BaseLayout: React.FC<
  LayoutProps & {
    id: number;
    width: number;
    height: number;
    draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => Promise<void>;
  }
> = ({ images, onSave, backgroundColor = "#000", width, height, draw }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && images.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = width;
      canvas.height = height;

      const render = async () => {
        await draw(ctx, canvas);
        onSave(canvas.toDataURL("image/jpeg", 0.95));
      };
      render();
    }
  }, [images, onSave, backgroundColor, width, height, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="max-w-full h-auto rounded-xl shadow-2xl mx-auto"
      style={{ maxHeight: "70vh", objectFit: "contain" }}
    />
  );
};

// 1. Classic Vertical (3)
export const Layout1: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={1}
    width={600}
    height={900}
    draw={async (ctx, canvas) => {
      ctx.fillStyle = props.backgroundColor || "#FF5733";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawText(ctx, "PHOTO BOOTH", canvas.width / 2, 60, "bold 40px Arial", "#fff");
      for (let i = 0; i < 3; i++) {
        const y = 100 + i * 260;
        drawFrame(ctx, 45, y - 5, 510, 240, "#fff", 10);
        await drawImage(ctx, props.images[i], 50, y, 500, 230);
      }
      drawText(ctx, new Date().toLocaleDateString(), 60, 860, "20px Arial", "#fff", "left");
    }}
  />
);

// 2. Modern Grid (4)
export const Layout2: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={2}
    width={800}
    height={800}
    draw={async (ctx, canvas) => {
      ctx.fillStyle = props.backgroundColor || "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const size = 360;
      const positions = [
        { x: 30, y: 30 },
        { x: 410, y: 30 },
        { x: 30, y: 410 },
        { x: 410, y: 410 },
      ];
      for (let i = 0; i < 4; i++) {
        if (props.images[i]) {
          drawFrame(ctx, positions[i].x - 5, positions[i].y - 5, size + 10, size + 10, "#fff", 5);
          await drawImage(ctx, props.images[i], positions[i].x, positions[i].y, size, size);
        }
      }
      drawText(
        ctx,
        "STUDIO MOMENTS",
        canvas.width / 2,
        canvas.height - 20,
        "bold 20px Arial",
        "#fff"
      );
    }}
  />
);

// 3. Retro Polaroid (3) - Overlapping
export const Layout3: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={3}
    width={800}
    height={600}
    draw={async (ctx, canvas) => {
      ctx.fillStyle = props.backgroundColor || "#f4f4f4";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const rots = [-0.1, 0.05, -0.05];
      const pos = [
        { x: 50, y: 100 },
        { x: 250, y: 80 },
        { x: 450, y: 120 },
      ];
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.translate(pos[i].x + 150, pos[i].y + 180);
        ctx.rotate(rots[i]);
        ctx.fillStyle = "white";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(0,0,0,0.2)";
        ctx.fillRect(-160, -170, 320, 380);
        await drawImage(ctx, props.images[i], -150, -160, 300, 300);
        ctx.restore();
      }
    }}
  />
);

// 4. Minimal Wide (3)
export const Layout4: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={4}
    width={1000}
    height={400}
    draw={async (ctx, canvas) => {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const w = 300;
      const h = 340;
      for (let i = 0; i < 3; i++) {
        await drawImage(ctx, props.images[i], 30 + i * 320, 30, w, h);
      }
    }}
  />
);

// 5. Cinematic Circle (3)
export const Layout5: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={5}
    width={400}
    height={1000}
    draw={async (ctx, canvas) => {
      applyGradient(ctx, canvas.width, canvas.height, ["#2c3e50", "#000000"]);
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(200, 180 + i * 300, 130, 0, Math.PI * 2);
        ctx.clip();
        await drawImage(ctx, props.images[i], 70, 50 + i * 300, 260, 260);
        ctx.restore();
      }
    }}
  />
);

// 6. Vintage Film (3)
export const Layout6: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={6}
    width={900}
    height={350}
    draw={async (ctx, canvas) => {
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 3; i++) {
        await drawImage(ctx, props.images[i], 40 + i * 280, 40, 260, 260);
        // Sprocket holes
        ctx.fillStyle = "#fff";
        for (let j = 0; j < 10; j++) {
          ctx.fillRect(40 + i * 280 + j * 26, 10, 10, 15);
          ctx.fillRect(40 + i * 280 + j * 26, 325, 10, 15);
        }
      }
    }}
  />
);

// 7. Pastel 4-Cut (4)
export const Layout7: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={7}
    width={500}
    height={1100}
    draw={async (ctx, canvas) => {
      ctx.fillStyle = "#f0e6ff"; // Pastel purple
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 4; i++) {
        if (props.images[i]) {
          const y = 40 + i * 250;
          ctx.fillStyle = "white";
          ctx.fillRect(35, y - 5, 430, 240);
          await drawImage(ctx, props.images[i], 40, y, 420, 230);
        }
      }
      drawText(ctx, "LIFE FOUR CUTS", canvas.width / 2, 1060, "bold 24px Serif", "#9b87f5");
    }}
  />
);

// 8. Neo Tokyo (4)
export const Layout8: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={8}
    width={800}
    height={800}
    draw={async (ctx, canvas) => {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const colors = ["#ff00ff", "#00ffff", "#ffff00", "#00ff00"];
      const pos = [
        { x: 35, y: 35 },
        { x: 415, y: 35 },
        { x: 35, y: 415 },
        { x: 415, y: 415 },
      ];
      for (let i = 0; i < 4; i++) {
        if (props.images[i]) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = colors[i];
          drawFrame(ctx, pos[i].x, pos[i].y, 350, 350, colors[i], 4);
          ctx.shadowBlur = 0;
          await drawImage(ctx, props.images[i], pos[i].x + 5, pos[i].y + 5, 340, 340);
        }
      }
    }}
  />
);

// 9. Kawaii Pink (3)
export const Layout9: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={9}
    width={600}
    height={950}
    draw={async (ctx, canvas) => {
      ctx.fillStyle = "#ffd1dc";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Add some small hearts
      ctx.fillStyle = "#ff69b4";
      for (let k = 0; k < 20; k++) {
        drawText(
          ctx,
          "❤",
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          "20px Arial",
          "#ff69b444"
        );
      }
      for (let i = 0; i < 3; i++) {
        const y = 60 + i * 280;
        ctx.fillStyle = "white";
        ctx.roundRect?.(45, y - 5, 510, 260, 20);
        ctx.fill();
        await drawImage(ctx, props.images[i], 50, y, 500, 250);
      }
      drawText(ctx, "STAY CUTE", canvas.width / 2, 920, "bold 30px Comic Sans MS", "#ff1493");
    }}
  />
);

// 10. Y2K Sparkle (3)
export const Layout10: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={10}
    width={900}
    height={400}
    draw={async (ctx, canvas) => {
      applyGradient(ctx, canvas.width, canvas.height, ["#a18cd1", "#fbc2eb", "#fad0c4"]);
      for (let i = 0; i < 3; i++) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(255,255,255,0.5)";
        await drawImage(ctx, props.images[i], 40 + i * 280, 40, 260, 320);
        drawText(ctx, "✨", 40 + i * 280, 30, "20px Arial", "#fff");
      }
      ctx.shadowBlur = 0;
    }}
  />
);

// 11. Cloud 9 (3)
export const Layout11: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={11}
    width={800}
    height={800}
    draw={async (ctx, canvas) => {
      ctx.fillStyle = "#87CEEB";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      for (let k = 0; k < 5; k++) {
        ctx.beginPath();
        ctx.arc(100 + k * 150, 100 + k * 100, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(140 + k * 150, 100 + k * 100, 60, 0, Math.PI * 2);
        ctx.fill();
      }
      const pos = [
        { x: 80, y: 80 },
        { x: 420, y: 150 },
        { x: 150, y: 450 },
      ];
      for (let i = 0; i < 3; i++) {
        drawFrame(ctx, pos[i].x - 10, pos[i].y - 10, 320, 270, "#fff", 10);
        await drawImage(ctx, props.images[i], pos[i].x, pos[i].y, 300, 250);
      }
    }}
  />
);

// 12. Gallery Collage (3)
export const Layout12: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={12}
    width={800}
    height={800}
    draw={async (ctx, canvas) => {
      ctx.fillStyle = "#e5e5e5";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Big one
      await drawImage(ctx, props.images[0], 40, 40, 450, 550);
      // Small ones
      await drawImage(ctx, props.images[1], 510, 40, 250, 265);
      await drawImage(ctx, props.images[2], 510, 325, 250, 265);
      drawText(ctx, "EXHIBITION ONE", 40, 650, "bold 50px Arial", "#333", "left");
    }}
  />
);

// 13. Midnight (4)
export const Layout13: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={13}
    width={600}
    height={1000}
    draw={async (ctx, canvas) => {
      applyGradient(ctx, canvas.width, canvas.height, ["#000428", "#004e92"]);
      for (let k = 0; k < 50; k++) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(Math.random() * 600, Math.random() * 1000, Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < 4; i++) {
        if (props.images[i]) {
          const y = 60 + i * 220;
          drawFrame(ctx, 95, y - 5, 410, 200, "rgba(255,255,255,0.2)", 2);
          await drawImage(ctx, props.images[i], 100, y, 400, 190);
        }
      }
    }}
  />
);

// 14. Sunset Horz (3)
export const Layout14: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={14}
    width={1000}
    height={500}
    draw={async (ctx, canvas) => {
      applyGradient(ctx, canvas.width, canvas.height, ["#f12711", "#f5af19"]);
      for (let i = 0; i < 3; i++) {
        await drawImage(ctx, props.images[i], 50 + i * 310, 100, 280, 300);
      }
      drawText(ctx, "GOLDEN HOUR", canvas.width / 2, 60, "bold 40px Serif", "#fff");
    }}
  />
);

// 15. Doodle Fun (3)
export const Layout15: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={15}
    width={600}
    height={900}
    draw={async (ctx, canvas) => {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 3; i++) {
        const y = 50 + i * 270;
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect?.(50, y, 500, 240, 10);
        ctx.stroke();
        await drawImage(ctx, props.images[i], 55, y + 5, 490, 230);
        drawText(ctx, "✎", 520, y + 20, "20px Arial", "#000");
      }
    }}
  />
);

// 16. Geometric (4)
export const Layout16: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={16}
    width={800}
    height={800}
    draw={async (ctx, canvas) => {
      ctx.fillStyle = "#ff6b6b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#4ecdc4";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(800, 0);
      ctx.lineTo(0, 800);
      ctx.fill();
      const pos = [
        { x: 50, y: 50 },
        { x: 450, y: 50 },
        { x: 50, y: 450 },
        { x: 450, y: 450 },
      ];
      for (let i = 0; i < 4; i++) {
        if (props.images[i]) {
          ctx.fillStyle = "#fff";
          ctx.fillRect(pos[i].x - 10, pos[i].y - 10, 320, 320);
          await drawImage(ctx, props.images[i], pos[i].x, pos[i].y, 300, 300);
        }
      }
    }}
  />
);

// 17. Studio Solo (1)
export const Layout17: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={17}
    width={800}
    height={1000}
    draw={async (ctx, canvas) => {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawFrame(ctx, 40, 40, 720, 920, "#111", 2);
      await drawImage(ctx, props.images[0], 60, 60, 680, 800);
      drawText(ctx, "SIGNATURE SERIES", canvas.width / 2, 920, "16px Monospace", "#111");
    }}
  />
);

// 18. Sticker Bomb (3)
export const Layout18: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={18}
    width={800}
    height={600}
    draw={async (ctx, canvas) => {
      ctx.fillStyle = "#fffc00"; // Snapchat yellow
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const stickers = ["⭐", "🔥", "💖", "😎", "🍕", "🌈"];
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.translate(150 + i * 250, 300);
        ctx.rotate((i - 1) * 0.1);
        ctx.fillStyle = "#fff";
        ctx.fillRect(-110, -110, 220, 220);
        await drawImage(ctx, props.images[i], -100, -100, 200, 200);
        drawText(ctx, stickers[i * 2], 80, -80, "40px Arial", "#000");
        ctx.restore();
      }
    }}
  />
);

// 19. Hologram (3)
export const Layout19: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={19}
    width={900}
    height={400}
    draw={async (ctx, canvas) => {
      const grad = ctx.createLinearGradient(0, 0, 900, 400);
      grad.addColorStop(0, "#00d2ff");
      grad.addColorStop(0.5, "#928dab");
      grad.addColorStop(1, "#00d2ff");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 900, 400);
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.globalAlpha = 0.8;
        drawFrame(ctx, 40 + i * 280, 40, 260, 320, "#fff", 3);
        await drawImage(ctx, props.images[i], 45 + i * 280, 45, 250, 310);
        ctx.restore();
      }
    }}
  />
);

// 20. News Retro (3)
export const Layout20: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={20}
    width={700}
    height={1000}
    draw={async (ctx, canvas) => {
      ctx.fillStyle = "#f4ecd8"; // Old paper
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawText(ctx, "DAILY CAPTURE", canvas.width / 2, 80, "bold 70px Times New Roman", "#222");
      ctx.fillRect(40, 100, 620, 5);
      for (let i = 0; i < 3; i++) {
        const y = 140 + i * 260;
        // Draw in grayscale simulation by drawing and then applying filter if needed
        // but the drawImage filters can handle it!
        await drawImage(ctx, props.images[i], 50, y, 600, 230, 0, { saturation: -100 });
        drawText(
          ctx,
          "LOREM IPSUM DOLOR SIT AMET",
          50,
          y + 250,
          "italic 12px Times New Roman",
          "#222",
          "left"
        );
      }
      ctx.fillRect(40, 930, 620, 2);
    }}
  />
);

export { BaseLayout };
