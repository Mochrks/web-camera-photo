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

// 1. Wedding Elegance (3)
export const Layout1: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={1}
    width={600}
    height={900}
    draw={async (ctx, canvas) => {
      // Elegant White/Gold Background
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gold Border
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 20;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      // Inner thin border
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

      // Floral/Decorative corners (simple circles/lines representing ornament)
      ctx.fillStyle = "#D4AF37";
      [
        [40, 40],
        [canvas.width - 40, 40],
        [40, canvas.height - 40],
        [canvas.width - 40, canvas.height - 40],
      ].forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fill();
      });

      drawText(ctx, "Our Wedding", canvas.width / 2, 80, "italic bold 45px Serif", "#D4AF37");

      for (let i = 0; i < 3; i++) {
        const y = 130 + i * 230;
        // Frame for each photo
        drawFrame(ctx, 45, y - 5, 510, 220, "#D4AF37", 2);
        await drawImage(ctx, props.images[i], 50, y, 500, 210);
      }

      drawText(
        ctx,
        "THANK YOU FOR CELEBRATING WITH US",
        canvas.width / 2,
        860,
        "12px Serif",
        "#D4AF37"
      );
    }}
  />
);

// 2. Spotify Viral (4)
export const Layout2: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={2}
    width={600}
    height={900}
    draw={async (ctx, canvas) => {
      // Spotify Dark Theme
      ctx.fillStyle = "#121212";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Blurred BG from first image
      if (props.images[0]) {
        await drawImage(ctx, props.images[0], -50, -50, 700, 1000, 0, { saturation: 50 });
        ctx.fillStyle = "rgba(18, 18, 18, 0.85)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Main Artwork (Grid of 4)
      const size = 260;
      const positions = [
        { x: 30, y: 70 },
        { x: 310, y: 70 },
        { x: 30, y: 350 },
        { x: 310, y: 350 },
      ];
      for (let i = 0; i < 4; i++) {
        if (props.images[i]) {
          await drawImage(ctx, props.images[i], positions[i].x, positions[i].y, size, size);
        }
      }

      // Player Controls
      const playerY = 700;
      drawText(ctx, "Redefine Moments", 50, playerY, "bold 32px Helvetica", "#fff", "left");
      drawText(ctx, "The Studio Session", 50, playerY + 40, "18px Helvetica", "#b3b3b3", "left");

      // Progress Bar
      ctx.fillStyle = "#4f4f4f";
      ctx.roundRect?.(50, playerY + 80, 500, 4, 2);
      ctx.fill();
      ctx.fillStyle = "#1db954"; // Spotify Green
      ctx.roundRect?.(50, playerY + 80, 200, 4, 2);
      ctx.fill();

      // Time
      drawText(ctx, "1:24", 50, playerY + 105, "12px Helvetica", "#b3b3b3", "left");
      drawText(ctx, "3:45", 550, playerY + 105, "12px Helvetica", "#b3b3b3", "right");

      // Buttons (Shapes)
      ctx.fillStyle = "#fff";
      // Play icon (Triangle)
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 + 15, playerY + 140);
      ctx.lineTo(canvas.width / 2 - 10, playerY + 125);
      ctx.lineTo(canvas.width / 2 - 10, playerY + 155);
      ctx.fill();

      // Prev/Next
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 60, playerY + 140);
      ctx.lineTo(canvas.width / 2 - 40, playerY + 130);
      ctx.lineTo(canvas.width / 2 - 40, playerY + 150);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 + 60, playerY + 140);
      ctx.lineTo(canvas.width / 2 + 40, playerY + 130);
      ctx.lineTo(canvas.width / 2 + 40, playerY + 150);
      ctx.fill();
    }}
  />
);

// 3. Birthday Celebration (3)
export const Layout3: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={3}
    width={600}
    height={900}
    draw={async (ctx, canvas) => {
      // Festive Blue Gradient
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, "#4facfe");
      grad.addColorStop(1, "#00f2fe");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Bunting/Confetti
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = ["#ff4081", "#ffd740", "#b2ff59", "#ffffff"][Math.floor(Math.random() * 4)];
        ctx.beginPath();
        ctx.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 10,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // Banner Area
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fillRect(0, 0, canvas.width, 100);
      drawText(
        ctx,
        "HAPPY BIRTHDAY!",
        canvas.width / 2,
        65,
        "black italic 900 40px Courier",
        "#333"
      );

      for (let i = 0; i < 3; i++) {
        const y = 130 + i * 240;
        ctx.fillStyle = "white";
        ctx.fillRect(35, y - 5, 530, 220);
        await drawImage(ctx, props.images[i], 40, y, 520, 210);
      }

      // Bottom Message
      ctx.fillStyle = "#fff";
      drawText(ctx, "Let's Party!", canvas.width / 2, 875, "bold 24px Arial", "#fff");
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

// 6. Graduation Day (3)
export const Layout6: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={6}
    width={600}
    height={900}
    draw={async (ctx, canvas) => {
      // Classic Black & Gold Graduation
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glitter particles
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = i % 2 === 0 ? "#D4AF37" : "#fff";
        ctx.globalAlpha = 0.5;
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
      }
      ctx.globalAlpha = 1;

      // Top Banner
      ctx.fillStyle = "#D4AF37";
      ctx.fillRect(0, 20, canvas.width, 100);
      drawText(ctx, "CONGRATS GRAD!", canvas.width / 2, 85, "bold 50px Arial Black", "#fff");

      for (let i = 0; i < 3; i++) {
        const y = 150 + i * 230;
        ctx.strokeStyle = "#D4AF37";
        ctx.lineWidth = 10;
        ctx.strokeRect(45, y - 5, 510, 220);
        await drawImage(ctx, props.images[i], 50, y, 500, 210);
      }

      drawText(ctx, "CLASS OF 2024", canvas.width / 2, 870, "bold 30px Arial", "#D4AF37");
    }}
  />
);

// 7. Korean Photoism (4)
export const Layout7: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={7}
    width={480}
    height={1200}
    draw={async (ctx, canvas) => {
      // Soft Rainbow Gradient Background
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, "#fdfcfb");
      grad.addColorStop(0.5, "#e2d1c3");
      grad.addColorStop(1, "#fdfcfb");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 4; i++) {
        if (props.images[i]) {
          const y = 50 + i * 270;
          // Thin white border
          ctx.fillStyle = "white";
          ctx.fillRect(35, y - 5, 410, 240);
          await drawImage(ctx, props.images[i], 40, y, 400, 230);
        }
      }

      // Branding
      drawText(ctx, "P H O T O I S M", canvas.width / 2, 1140, "bold 16px Arial", "#888");
      drawText(ctx, "STUDIO SELF PORTRAIT", canvas.width / 2, 1165, "10px Arial", "#aaa");
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

// 10. Y2K Futuro (3)
export const Layout10: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={10}
    width={900}
    height={400}
    draw={async (ctx, canvas) => {
      // Metallic Silver Gradient
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, "#bdc3c7");
      grad.addColorStop(0.5, "#2c3e50");
      grad.addColorStop(1, "#bdc3c7");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Scanline effect
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      for (let i = 0; i < canvas.height; i += 4) {
        ctx.fillRect(0, i, canvas.width, 1);
      }

      for (let i = 0; i < 3; i++) {
        ctx.shadowBlur = 30;
        ctx.shadowColor = "#00ffff";
        await drawImage(ctx, props.images[i], 40 + i * 285, 40, 260, 320);
        drawFrame(ctx, 40 + i * 285, 40, 260, 320, "#00ffff", 2);
      }
      ctx.shadowBlur = 0;
      drawText(ctx, "SYSTEM: READY // Y2K_CORE", 50, 380, "bold 12px Monospace", "#00ffff", "left");
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

// 20. Magazine Cover (3)
export const Layout20: React.FC<LayoutProps> = (props) => (
  <BaseLayout
    {...props}
    id={20}
    width={700}
    height={1000}
    draw={async (ctx, canvas) => {
      // High-end Beige Background
      ctx.fillStyle = "#f5f5f7";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Main large photo background (blurred)
      if (props.images[0]) {
        await drawImage(ctx, props.images[0], 0, 0, 700, 1000, 0, {
          saturation: -20,
          brightness: 110,
        });
      }

      // Title
      ctx.save();
      ctx.letterSpacing = "15px";
      drawText(ctx, "V O G U E", canvas.width / 2, 120, "italic bold 100px Serif", "#000");
      ctx.restore();

      // Photos as side features
      for (let i = 0; i < 3; i++) {
        const y = 200 + i * 250;
        ctx.shadowBlur = 40;
        ctx.shadowColor = "rgba(0,0,0,0.3)";
        await drawImage(ctx, props.images[i], 100, y, 500, 220);
      }

      ctx.shadowBlur = 0;
      drawText(ctx, "THE FUTURE OF STYLE", 50, 950, "bold 14px Arial", "#000", "left");
      drawText(ctx, "ISSUE NO. 01 / 2024", 650, 950, "12px Arial", "#000", "right");
    }}
  />
);

export { BaseLayout };
