export const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  font: string,
  color: string,
  align: CanvasTextAlign = 'center'
) => {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
};

export const drawImage = async (
  ctx: CanvasRenderingContext2D,
  img: string,
  x: number,
  y: number,
  width: number,
  height: number,
  rotation: number = 0
): Promise<void> => {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => {
      ctx.save();
      ctx.translate(x + width / 2, y + height / 2);
      ctx.rotate(rotation);
      ctx.drawImage(image, -width / 2, -height / 2, width, height);
      ctx.restore();
      resolve();
    };
    image.src = img;
  });
};

export const drawFrame = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  strokeStyle: string,
  lineWidth: number
) => {
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.strokeRect(x, y, width, height);
};
