import React, { useEffect, useRef } from 'react';
import { drawText, drawImage, drawFrame } from '../../utils/canvas-utils';

interface LayoutProps {
    images: string[];
    onSave: (dataUrl: string) => void;
}

const useAutoSave = (canvasRef: React.RefObject<HTMLCanvasElement>, onSave: (dataUrl: string) => void) => {
    useEffect(() => {
        if (canvasRef.current) {
            const dataUrl = canvasRef.current.toDataURL('image/jpeg');
            onSave(dataUrl);
        }
    }, [canvasRef, onSave]);
};

const Layout1: React.FC<LayoutProps> = ({ images, onSave }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current && images.length >= 3) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = 600;
            canvas.height = 900;

            // Background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#4a00e0');
            gradient.addColorStop(1, '#8e2de2');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Title
            drawText(ctx, 'Photo Booth Memories', canvas.width / 2, 60, 'bold 40px Poppins', '#fff');

            const loadAndDrawImages = async () => {
                for (let i = 0; i < 3; i++) {
                    const x = 50;
                    const y = 100 + i * 260;
                    const width = 500;
                    const height = 230;

                    drawFrame(ctx, x - 5, y - 5, width + 10, height + 10, '#fff', 10);
                    drawFrame(ctx, x - 10, y - 10, width + 20, height + 20, '#ffd700', 5);
                    await drawImage(ctx, images[i], x, y, width, height);
                }

                // Add decorative elements
                drawText(ctx, 'Date: ' + new Date().toLocaleDateString(), 60, 840, '20px Poppins', '#fff', 'left');

                // Add a decorative border
                drawFrame(ctx, 10, 10, canvas.width - 20, canvas.height - 20, '#ffd700', 10);

                onSave(canvas.toDataURL('image/jpeg'));
            };

            loadAndDrawImages();
        }
    }, [images, onSave]);

    return <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />;
};

const Layout2: React.FC<LayoutProps> = ({ images, onSave }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current && images.length >= 3) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = 900;
            canvas.height = 700;

            // Background with pattern
            const patternCanvas = document.createElement('canvas');
            const patternCtx = patternCanvas.getContext('2d');
            if (!patternCtx) return;

            patternCanvas.width = 20;
            patternCanvas.height = 20;

            // Draw a simple pattern
            patternCtx.fillStyle = '#ff9a9e';
            patternCtx.fillRect(0, 0, 20, 20);
            patternCtx.fillStyle = '#fad0c4';
            patternCtx.fillRect(0, 0, 10, 10);
            const pattern = ctx.createPattern(patternCanvas, 'repeat');

            if (pattern) {
                ctx.fillStyle = pattern;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // Title with white color
            const title = 'Capture the Moment';
            ctx.fillStyle = '#ffffff'; // Set text color to white
            ctx.font = 'bold 48px Poppins';
            ctx.textAlign = 'center';
            ctx.fillText(title, canvas.width / 2, 70);

            const loadAndDrawImages = async () => {
                const positions = [
                    { x: 50, y: 100, width: 520, height: 450 },
                    { x: 600, y: 100, width: 250, height: 220 },
                    { x: 600, y: 330, width: 250, height: 220 },
                ];

                for (let i = 0; i < 3; i++) {
                    const { x, y, width, height } = positions[i];
                    ctx.save();
                    ctx.shadowColor = 'rgba(0,0,0,0.5)';
                    ctx.shadowBlur = 15;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 5;
                    // Draw image with rounded corners
                    await drawRoundedImage(ctx, images[i], x, y, width, height, 20);
                    ctx.restore();
                }

                // Decorative text with white color
                ctx.fillStyle = '#ffffff'; // Set text color to white
                ctx.font = '20px Poppins';
                ctx.textAlign = 'right';
                ctx.fillText('Created on: ' + new Date().toLocaleDateString(), canvas.width - 50, canvas.height - 50);

                // Decorative frame
                drawFrame(ctx, 25, 25, canvas.width - 50, canvas.height - 50, '#fff', 15);

                onSave(canvas.toDataURL('image/jpeg'));
            };

            loadAndDrawImages();
        }
    }, [images, onSave]);

    // Function to draw image with rounded corners
    const drawRoundedImage = (ctx: CanvasRenderingContext2D, imgSrc: string, x: number, y: number, width: number, height: number, radius: number) => {
        return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = imgSrc;
            img.onload = () => {
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                ctx.lineTo(x + radius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(img, x, y, width, height);
                resolve();
            };
        });
    };

    return <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />;
};

const Layout3: React.FC<LayoutProps> = ({ images, onSave }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current && images.length >= 3) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = 600;
            canvas.height = 850;

            // Background
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Title
            drawText(ctx, 'Unforgettable Moments', canvas.width / 2, 50, 'bold 32px Poppins', '#fff');

            const drawPolaroidFrame = (x: number, y: number, width: number, height: number, rotation: number) => {
                ctx.save();
                ctx.translate(x + width / 2, y + height / 2);
                ctx.rotate(rotation);
                ctx.fillStyle = '#fff';
                ctx.fillRect(-width / 2 - 10, -height / 2 - 10, width + 20, height + 40);
                ctx.restore();
            };

            const loadAndDrawImages = async () => {
                const positions = [
                    { x: 50, y: 100, width: 310, height: 200, rotation: -0.1 },
                    { x: 230, y: 320, width: 310, height: 200, rotation: 0.1 },
                    { x: 100, y: 550, width: 310, height: 200, rotation: -0.05 },
                ];

                for (let i = 0; i < 3; i++) {
                    const { x, y, width, height, rotation } = positions[i];
                    drawPolaroidFrame(x, y, width, height, rotation);
                    await drawImage(ctx, images[i], x, y, width, height, rotation);
                }

                // Add decorative elements
                drawText(ctx, 'Remember this day: ' + new Date().toLocaleDateString(), canvas.width / 2, canvas.height - 30, '20px Poppins', '#fff');

                // Add a decorative border
                drawFrame(ctx, 20, 20, canvas.width - 40, canvas.height - 40, '#fff', 5);

                onSave(canvas.toDataURL('image/jpeg'));
            };

            loadAndDrawImages();
        }
    }, [images, onSave]);

    return <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />;
};

export {
    Layout1, Layout2, Layout3
};

