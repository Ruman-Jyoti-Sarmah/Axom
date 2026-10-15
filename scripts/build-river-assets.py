"""Build website delivery derivatives for rivers.

- reads originals from public/images/rivers/originals/
- writes a single 16:10 derivative per river into public/images/rivers/
- hero uses the same file at 16:9 (no crop)
- quality 80, progressive, stripped profiles, no upscaling
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.abspath(__file__))
ORIGINALS = os.path.join(ROOT, "..", "public", "images", "rivers", "originals")
DELIVERY = os.path.join(ROOT, "..", "public", "images", "rivers")

os.makedirs(DELIVERY, exist_ok=True)

RIVERS = [
    "brahmaputra-guwahati.jpg",
    "barak-silchar.jpg",
    "subansiri-lakhimpur.jpg",
    "jia-bharali-nameri.jpg",
    "dikhow-sivasagar.jpg",
    "kopili-river.jpg",
    "kulsi-chandubi.jpg",
    "dhansiri-bhairabkunda.jpg",
    "beki-river.jpg",
    "burhi-dihing-dibrugarh.jpg",
    "longai-karimganj.jpg",
    "manas-river.jpg",
]

W_IN, H_IN = 1600, 1000   # 16:10 for river cards
Q = 80


def build(src, dst):
    im = Image.open(src)
    im = im.convert("RGB")
    iw, ih = im.size
    scale = max(W_IN / iw, H_IN / ih)
    if scale > 1.0:  # don't upscale beyond original
        scale = 1.0
    nw, nh = int(iw * scale), int(ih * scale)
    im = im.resize((nw, nh), Image.LANCZOS)
    # center crop to 16:10
    left = (nw - W_IN) // 2
    top = (nh - H_IN) // 2
    im = im.crop((left, top, left + W_IN, top + H_IN))
    im.save(dst, "JPEG", quality=Q, optimize=True, progressive=True)
    return im.size


print(f"build derivates in {DELIVERY}")
for name in RIVERS:
    src = os.path.normpath(os.path.join(ORIGINALS, name))
    dst = os.path.normpath(os.path.join(DELIVERY, name))
    if not os.path.exists(src):
        print(f"MISS {name} ({src})")
        continue
    try:
        size = build(src, dst)
        print(f"OK   {name} ({size[0]}x{size[1]})")
    except Exception as e:
        print(f"ERR  {name}: {e}")

print("DONE")
