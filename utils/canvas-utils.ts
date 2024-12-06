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
  rotation: number = 0,
  filters: {
    brightness?: number;
    contrast?: number;
    saturation?: number;
    white?: number;
    black?: number;
    sepia?: number;
    hue?: number;
    sharpness?: number;
  } = {}
): Promise<void> => {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      
      if (!tempCtx) {
        resolve();
        return;
      }

      tempCanvas.width = width;
      tempCanvas.height = height;

      // Terapkan filter
      let filterString = '';
      
      // Brightness (langsung dalam persen)
      if (filters.brightness !== undefined) 
        filterString += `brightness(${filters.brightness}%) `;
      
      // Contrast (langsung dalam persen)
      if (filters.contrast !== undefined) 
        filterString += `contrast(${filters.contrast}%) `;
      
      // Saturation (langsung dalam persen)
      if (filters.saturation !== undefined) 
        filterString += `saturate(${filters.saturation}%) `;
      
      // Sepia (langsung dalam persen)
      if (filters.sepia !== undefined) 
        filterString += `sepia(${filters.sepia}%) `;

      // Hue Rotate (dalam derajat)
      if (filters.hue !== undefined) 
        filterString += `hue-rotate(${filters.hue}deg) `;

      // Tambahan filter custom
      tempCtx.filter = filterString;
      
      // Gambar dengan filter
      tempCtx.drawImage(image, 0, 0, width, height);

      // Proses tambahan untuk white, black, dan sharpness
      if ((filters.white !== undefined) || 
          (filters.black !== undefined) || 
          (filters.sharpness !== undefined)) {
        const imageData = tempCtx.getImageData(0, 0, width, height);
        const data = imageData.data;

        // White balance dan black point (sekarang dalam persen)
        const whiteLevel = filters.white !== undefined ? filters.white / 100 : 1;
        const blackLevel = filters.black !== undefined ? filters.black / 100 : 0;

        for (let i = 0; i < data.length; i += 4) {
          // Adjust white and black levels
          data[i] = Math.min(255, Math.max(0, 
            (data[i] - blackLevel * 255) * (1 / (whiteLevel - blackLevel))
          ));
          data[i + 1] = Math.min(255, Math.max(0, 
            (data[i + 1] - blackLevel * 255) * (1 / (whiteLevel - blackLevel))
          ));
          data[i + 2] = Math.min(255, Math.max(0, 
            (data[i + 2] - blackLevel * 255) * (1 / (whiteLevel - blackLevel))
          ));
        }


        // Sharpness (simple unsharp mask)
        if (filters.sharpness !== undefined && filters.sharpness > 0) {
          const sharpnessFactor = filters.sharpness;
          const tempImageData = tempCtx.createImageData(width, height);
          const tempData = tempImageData.data;

          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              const index = (y * width + x) * 4;
              
              // Ambil pixel di sekitarnya
              const pixel = (channel: number) => {
                const getPixel = (dx: number, dy: number) => {
                  const newX = x + dx;
                  const newY = y + dy;
                  if (newX < 0 || newX >= width || newY < 0 || newY >= height) {
                    return data[index + channel];
                  }
                  return data[((newY * width) + newX) * 4 + channel];
                };

                const center = data[index + channel];
                const top = getPixel(0, -1);
                const bottom = getPixel(0, 1);
                const left = getPixel(-1, 0);
                const right = getPixel(1, 0);

                // Unsharp mask calculation
                const sharpened = center + sharpnessFactor * (center - (top + bottom + left + right) / 4);
                return Math.min(255, Math.max(0, sharpened));
              };

              tempData[index] = pixel(0);         // Red
              tempData[index + 1] = pixel(1);     // Green
              tempData[index + 2] = pixel(2);     // Blue
              tempData[index + 3] = data[index + 3]; // Alpha
            }
          }

          // Replace original data with sharpened data
          imageData.data.set(tempData);
        }

        // Put modified image data back to canvas
        tempCtx.putImageData(imageData, 0, 0);
      }

      // Gambar pada canvas utama dengan rotasi
      ctx.save();
      ctx.translate(x + width / 2, y + height / 2);
      ctx.rotate(rotation);
      ctx.drawImage(tempCanvas, -width / 2, -height / 2, width, height);
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
