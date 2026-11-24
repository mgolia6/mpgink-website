# Your drawn mpgink, traced to clean vector exactly as drawn — no redesign.
import numpy as np, sys, json
from PIL import Image, ImageFilter
from scipy import ndimage as ndi
import potrace
D = sys.argv[1]
src = Image.open(f'{D}/source-canvas.png').convert('L')   # the drawing canvas, cropped from Matthew's phone screenshot
SC = 6
up = src.resize((src.width * SC, src.height * SC), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.2))
ink = np.array(up) < 128
lab, n = ndi.label(ink); sizes = ndi.sum(ink, lab, range(1, n + 1))
ink = np.isin(lab, np.where(sizes >= 40)[0] + 1)          # drop single-pixel specks only
ys, xs = np.where(ink); pad = 30
ink = np.pad(ink[ys.min():ys.max() + 1, xs.min():xs.max() + 1], pad)
plist = potrace.Bitmap(~ink).trace(turdsize=20, alphamax=1.0, opticurve=True, opttolerance=0.2)   # potracer: ink must be False
d = []
for c in plist:
    s = c.start_point; d.append(f'M{s.x:.1f},{s.y:.1f}')
    for g in c.segments:
        d.append(f'L{g.c.x:.1f},{g.c.y:.1f}L{g.end_point.x:.1f},{g.end_point.y:.1f}' if g.is_corner else f'C{g.c1.x:.1f},{g.c1.y:.1f} {g.c2.x:.1f},{g.c2.y:.1f} {g.end_point.x:.1f},{g.end_point.y:.1f}')
    d.append('Z')
H, W = ink.shape
open(f'{D}/out/mpgink-drawn.svg', 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}"><path fill="currentColor" fill-rule="evenodd" d="{"".join(d)}"/></svg>')
print(json.dumps({'components': int(n), 'curves': len(plist), 'size': [W, H]}))
