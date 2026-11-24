import cv2, numpy as np, sys
from PIL import Image, ImageFilter, ImageOps
EXPECT = ['https://mpgink.com', 'https://phreezer.mpgink.com', 'https://jobodyssey.mpgink.com', 'https://onepercent.mpgink.com']
det = cv2.QRCodeDetector()
dec = lambda im: det.detectAndDecode(cv2.cvtColor(np.array(im), cv2.COLOR_RGB2BGR))[0]
COND = [('print', lambda t: t), ('blur', lambda t: t.filter(ImageFilter.GaussianBlur(3))),
        ('phone/4', lambda t: t.resize((t.width // 4, t.height // 4), Image.LANCZOS)),
        ('phone/6', lambda t: t.resize((t.width // 6, t.height // 6), Image.LANCZOS))]
CASES = [('light', 'natural', (239, 236, 228)), ('light', 'heather grey', (176, 172, 166)),
         ('dark', 'black', (22, 22, 22)), ('dark', 'navy', (30, 38, 62)), ('dark-plated', 'black', (22, 22, 22))]
total = bad = 0
for v, gname, g in CASES:
    im = Image.open(f'out/brand-stack-{v}.png').convert('RGBA')
    flat = Image.alpha_composite(Image.new('RGBA', im.size, g + (255,)), im).convert('RGB')
    W, H = flat.size; rh = H / 4; res = {'as-is': 0, 'inverted': 0}
    for i, want in enumerate(EXPECT):
        tile = flat.crop((int(W * .80), int(i * rh), W, int((i + 1) * rh)))
        for _, f in COND:
            t = f(tile); a = dec(t) == want; b = dec(ImageOps.invert(t)) == want
            res['as-is'] += a; res['inverted'] += b; total += 1; bad += not (a or b)
    print(f'{v:12} on {gname:12}: read as-is {res["as-is"]}/16 · read by an inverting scanner {res["inverted"]}/16')
print('every code readable one way or the other:', total - bad, 'of', total)
sys.exit(1 if bad else 0)
