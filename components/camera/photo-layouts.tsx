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


const Layout4: React.FC<LayoutProps> = ({ images, onSave }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current && images.length >= 3) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = 970;
            canvas.height = 500;

            // Fungsi load background
            const loadBackground = () => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const bgImage = new Image();
                    bgImage.src = '/assets/images/images3.jpg';

                    bgImage.onload = () => resolve(bgImage);
                    bgImage.onerror = reject;
                });
            };

            const drawPhotos = async () => {
                try {
                    // Load background image (optional)
                    let bgImage: HTMLImageElement | undefined;
                    try {
                        bgImage = await loadBackground();
                    } catch (error) {
                        console.error('Background image load failed', error);
                    }

                    // Draw background
                    if (bgImage) {
                        // Scale and crop background to fit canvas
                        const scale = Math.max(
                            canvas.width / bgImage.width,
                            canvas.height / bgImage.height
                        );
                        const width = bgImage.width * scale;
                        const height = bgImage.height * scale;
                        const x = (canvas.width - width) / 2;
                        const y = (canvas.height - height) / 2;

                        ctx.drawImage(bgImage, x, y, width, height);
                    } else {
                        // Fallback gradient background
                        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                        gradient.addColorStop(0, '#FF6B6B');
                        gradient.addColorStop(1, '#4ECDC4');
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }

                    // Positions for images
                    const positions = [
                        { x: 50, y: 40, width: 260, height: 400, rotation: 0 },
                        { x: 350, y: 40, width: 260, height: 400, rotation: 0 },
                        { x: 660, y: 40, width: 260, height: 400, rotation: 0 }
                    ];

                    const drawFramedImage = async (imgSrc: string, x: number, y: number, width: number, height: number, rotation: number) => {
                        return new Promise<void>((resolve) => {
                            const img = new Image();
                            img.src = imgSrc;
                            img.onload = () => {
                                ctx.save();
                                ctx.translate(x + width / 2, y + height / 2);
                                ctx.rotate(rotation);

                                // Shadow effect
                                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                                ctx.shadowBlur = 15;
                                ctx.shadowOffsetX = 5;
                                ctx.shadowOffsetY = 5;

                                // White frame
                                ctx.fillStyle = 'white';
                                ctx.fillRect(-width / 2 - 10, -height / 2 - 10, width + 20, height + 20);

                                // Draw image
                                ctx.drawImage(img, -width / 2, -height / 2, width, height);

                                ctx.restore();
                                resolve();
                            };
                        });
                    };

                    for (let i = 0; i < 3; i++) {
                        const { x, y, width, height, rotation } = positions[i];
                        await drawFramedImage(images[i], x, y, width, height, rotation);
                    }



                    onSave(canvas.toDataURL('image/jpeg'));
                } catch (error) {
                    console.error('Error drawing layout:', error);
                }
            };

            drawPhotos();
        }
    }, [images, onSave]);

    return <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />;
};


const Layout5: React.FC<LayoutProps> = ({ images, onSave }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current && images.length >= 3) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = 400;
            canvas.height = 1000;

            // Fungsi untuk memuat background
            const loadBackground = () => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const bgImage = new Image();

                    // Gunakan path relatif dari public
                    bgImage.src = '/assets/images/images1.jpg';

                    bgImage.onload = () => resolve(bgImage);
                    bgImage.onerror = reject;
                });
            };

            const drawBackground = async (bgImage: HTMLImageElement) => {
                // Menyesuaikan gambar ke ukuran canvas dengan cover effect
                const scale = Math.max(
                    canvas.width / bgImage.width,
                    canvas.height / bgImage.height
                );

                const width = bgImage.width * scale;
                const height = bgImage.height * scale;

                const x = (canvas.width - width) / 2;
                const y = (canvas.height - height) / 2;

                // Blur effect for background

                ctx.drawImage(bgImage, x, y, width, height);
                ctx.filter = 'none'; // Reset filter
            };

            const drawCircularImage = async (imgSrc: string, centerX: number, centerY: number, radius: number) => {
                return new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = imgSrc;
                    img.onload = () => {
                        ctx.save();

                        // Create circular clipping path with glow effect
                        ctx.shadowColor = 'rgba(0,0,0,0.3)';
                        ctx.shadowBlur = 20;

                        // Create circular clipping path
                        ctx.beginPath();
                        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                        ctx.closePath();
                        ctx.clip();

                        // Soft white background for spacing
                        ctx.fillStyle = 'rgba(255,255,255,0.8)';
                        ctx.beginPath();
                        ctx.arc(centerX, centerY, radius + 10, 0, Math.PI * 2);
                        ctx.fill();

                        // Scale and center the image
                        const scale = Math.max(
                            radius * 2 / img.width,
                            radius * 2 / img.height
                        );
                        const width = img.width * scale;
                        const height = img.height * scale;
                        const x = centerX - width / 2;
                        const y = centerY - height / 2;

                        // Draw image
                        ctx.drawImage(img, x, y, width, height);

                        // Soft border
                        ctx.beginPath();
                        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                        ctx.lineWidth = 10;
                        ctx.stroke();

                        ctx.restore();
                        resolve();
                    };
                });
            };

            const drawPhotos = async () => {
                try {
                    // Load and draw background
                    const bgImage = await loadBackground();
                    await drawBackground(bgImage);

                    // Add soft white borders on sides
                    ctx.fillStyle = 'rgba(255,255,255,0.2)';
                    ctx.fillRect(0, 0, 20, canvas.height); // Left border
                    ctx.fillRect(canvas.width - 20, 0, 20, canvas.height); // Right border

                    const centerX = canvas.width / 2;
                    const radius = 130;
                    const spacing = 300;

                    // Draw circular images
                    await Promise.all([
                        drawCircularImage(images[0], centerX, 200, radius),
                        drawCircularImage(images[1], centerX, 200 + spacing, radius),
                        drawCircularImage(images[2], centerX, 200 + (spacing * 2), radius)
                    ]);

                    // Title with shadow
                    ctx.fillStyle = 'white';
                    ctx.shadowColor = 'rgba(0,0,0,0.5)';
                    ctx.shadowBlur = 10;
                    ctx.font = 'bold 28px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('Moments', centerX, 43);

                    // Reset shadow
                    ctx.shadowColor = 'transparent';
                    ctx.shadowBlur = 0;

                    // Date
                    ctx.fillStyle = 'rgba(255,255,255,0.8)';
                    ctx.font = '18px Arial';
                    ctx.fillText(new Date().toLocaleDateString(), centerX, canvas.height - 40);

                    // Save canvas
                    onSave(canvas.toDataURL('image/jpeg'));
                } catch (error) {
                    console.error('Error drawing layout:', error);
                }
            };

            drawPhotos();
        }
    }, [images, onSave]);

    return <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />;
};

const Layout6: React.FC<LayoutProps> = ({ images, onSave }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current && images.length >= 3) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = 600;
            canvas.height = 1000;

            // Fungsi load background
            const loadBackground = () => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const bgImage = new Image();
                    bgImage.src = '/assets/images/images2.jpg'; // Sesuaikan path

                    bgImage.onload = () => resolve(bgImage);
                    bgImage.onerror = reject;
                });
            };

            const drawPhotos = async () => {
                try {
                    // Load background image (optional)
                    let bgImage: HTMLImageElement | undefined;
                    try {
                        bgImage = await loadBackground();
                    } catch (error) {
                        console.error('Background image load failed', error);
                    }

                    // Draw background
                    if (bgImage) {
                        // Scale and crop background to fit canvas
                        const scale = Math.max(
                            canvas.width / bgImage.width,
                            canvas.height / bgImage.height
                        );
                        const width = bgImage.width * scale;
                        const height = bgImage.height * scale;
                        const x = (canvas.width - width) / 2;
                        const y = (canvas.height - height) / 2;

                        ctx.drawImage(bgImage, x, y, width, height);
                    } else {
                        // Fallback dark background
                        ctx.fillStyle = '#212121';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }

                    const positions = [
                        { x: 47, y: 170, width: 250, height: 300 },
                        { x: 317, y: 170, width: 250, height: 300 },
                        { x: 47, y: 500, width: 520, height: 400 }
                    ];

                    const drawImageWithBorder = async (imgSrc: string, x: number, y: number, width: number, height: number) => {
                        return new Promise<void>((resolve) => {
                            const img = new Image();
                            img.src = imgSrc;
                            img.onload = () => {
                                // Draw border
                                ctx.fillStyle = '#ffffff';
                                ctx.fillRect(x - 5, y - 5, width + 10, height + 10);
                                // Draw image
                                ctx.drawImage(img, x, y, width, height);
                                resolve();
                            };
                        });
                    };

                    // Draw individual photos
                    for (let i = 0; i < 3; i++) {
                        const { x, y, width, height } = positions[i];
                        await drawImageWithBorder(images[i], x, y, width, height);
                    }

                    // Border teks hitam 5px
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 2;
                    ctx.font = 'bold 56px Poppins';
                    ctx.textAlign = 'center';
                    ctx.strokeText('Vintage Memories', canvas.width / 2, 137);

                    // Isi teks putih
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 56px Poppins';
                    ctx.textAlign = 'center';
                    ctx.fillText('Vintage Memories', canvas.width / 2, 137);

                    // Date - now in white
                    ctx.fillStyle = 'black';
                    ctx.font = '20px Poppins';
                    ctx.fillText('On this day: ' + new Date().toLocaleDateString(), canvas.width / 2, canvas.height - 20);

                    onSave(canvas.toDataURL('image/jpeg'));
                } catch (error) {
                    console.error('Error drawing layout:', error);
                }
            };

            drawPhotos();
        }
    }, [images, onSave]);

    return <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />;
};

export {
    Layout1, Layout2, Layout3, Layout4, Layout5,
    Layout6,
};
