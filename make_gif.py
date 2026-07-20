import math
import os
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

source_path = '/Users/andreidobrosvet/.gemini/antigravity/brain/f10ff208-a8e0-482e-ada3-ca7b0bedfb30/media__1784432268241.jpg'
output_path = '/Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/promo.gif'

img = Image.open(source_path).convert('RGB')
width, height = img.size

# Создаем точную цветовую маску для желто-оранжевого свечения очков
mask = Image.new('L', (width, height))
pixels_img = img.load()
pixels_mask = mask.load()

for y in range(height):
    for x in range(width):
        r_val, g_val, b_val = pixels_img[x, y]
        # Очки светятся очень ярко желтым/оранжевым
        # R и G каналы доминируют над синим
        if r_val > 170 and g_val > 90 and b_val < 130:
            pixels_mask[x, y] = 255

# Размываем маску для мягких краев наложения
mask_blur = mask.filter(ImageFilter.GaussianBlur(6))

frames = []
num_frames = 16

for i in range(num_frames):
    # Коэффициент пульсации от 1.0 до 1.6
    factor = 1.3 + 0.3 * math.sin(i * 2 * math.pi / num_frames)
    
    # Делаем копию для слоя свечения
    glow_layer = img.copy()
    
    # Увеличиваем яркость и контраст очков
    brightness_enhancer = ImageEnhance.Brightness(glow_layer)
    glow_layer = brightness_enhancer.enhance(factor)
    
    contrast_enhancer = ImageEnhance.Contrast(glow_layer)
    glow_layer = contrast_enhancer.enhance(1.2)
    
    # Создаем мягкое размытое неоновое облако вокруг очков (Glow)
    glow_blur = glow_layer.filter(ImageFilter.GaussianBlur(12))
    
    # Смешиваем оригинальное фото с размытым свечением по маске очков
    frame = Image.composite(glow_blur, img, mask_blur)
    
    # Добавляем легкий киберпанк глитч-эффект (хроматический сдвиг красного канала)
    # Сдвиг меняется во времени по синусоиде
    shift_x = int(3 * math.sin(i * 2 * math.pi / num_frames))
    if shift_x != 0:
        r_chan, g_chan, b_chan = frame.split()
        # Сдвигаем красный канал по оси X
        r_chan_shifted = r_chan.transform(r_chan.size, Image.Transform.AFFINE, (1, 0, shift_x, 0, 1, 0))
        frame = Image.merge('RGB', (r_chan_shifted, g_chan, b_chan))
        
    frames.append(frame)

# Сохраняем анимированный GIF с бесконечным циклом
frames[0].save(
    output_path,
    save_all=True,
    append_images=frames[1:],
    duration=70,  # ~14 FPS
    loop=0
)
print("GIF-анимация создана по пути:", output_path)
