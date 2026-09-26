#!/usr/bin/env python3
"""Generate public/og.png - a 1200x630 social card in the site's terminal aesthetic.

Pure stdlib (zlib + struct). No PIL, no system fonts: glyphs come from a
hand-coded 5x7 bitmap font, upscaled so they read as a deliberate blocky
monospace/terminal treatment matching the site's carbon/amber palette.

Run from the project root:  python3 scripts/generate-og.py
"""
import struct
import zlib

W, H = 1200, 630

F = {
    "A": "01110/10001/10001/11111/10001/10001/10001",
    "B": "11110/10001/10001/11110/10001/10001/11110",
    "C": "01110/10001/10000/10000/10000/10001/01110",
    "D": "11110/10001/10001/10001/10001/10001/11110",
    "E": "11111/10000/10000/11110/10000/10000/11111",
    "F": "11111/10000/10000/11110/10000/10000/10000",
    "G": "01110/10001/10000/10111/10001/10001/01111",
    "H": "10001/10001/10001/11111/10001/10001/10001",
    "I": "11111/00100/00100/00100/00100/00100/11111",
    "J": "00111/00010/00010/00010/00010/10010/01100",
    "K": "10001/10010/10100/11000/10100/10010/10001",
    "L": "10000/10000/10000/10000/10000/10000/11111",
    "M": "10001/11011/10101/10101/10001/10001/10001",
    "N": "10001/11001/10101/10011/10001/10001/10001",
    "O": "01110/10001/10001/10001/10001/10001/01110",
    "P": "11110/10001/10001/11110/10000/10000/10000",
    "Q": "01110/10001/10001/10001/10101/10010/01101",
    "R": "11110/10001/10001/11110/10100/10010/10001",
    "S": "01111/10000/10000/01110/00001/00001/11110",
    "T": "11111/00100/00100/00100/00100/00100/00100",
    "U": "10001/10001/10001/10001/10001/10001/01110",
    "V": "10001/10001/10001/10001/10001/01010/00100",
    "W": "10001/10001/10001/10101/10101/11011/10001",
    "X": "10001/10001/01010/00100/01010/10001/10001",
    "Y": "10001/10001/01010/00100/00100/00100/00100",
    "Z": "11111/00001/00010/00100/01000/10000/11111",
    "0": "01110/10001/10011/10101/11001/10001/01110",
    "1": "00100/01100/00100/00100/00100/00100/01110",
    "2": "01110/10001/00001/00010/00100/01000/11111",
    "3": "11111/00010/00100/00010/00001/10001/01110",
    "4": "00010/00110/01010/10010/11111/00010/00010",
    "5": "11111/10000/11110/00001/00001/10001/01110",
    "6": "00110/01000/10000/11110/10001/10001/01110",
    "7": "11111/00001/00010/00100/01000/01000/01000",
    "8": "01110/10001/10001/01110/10001/10001/01110",
    "9": "01110/10001/10001/01111/00001/00010/01100",
    "$": "00100/01111/10100/01110/00101/11110/00100",
    ".": "00000/00000/00000/00000/00000/01100/01100",
    "/": "00001/00010/00010/00100/01000/01000/10000",
    ">": "10000/01000/00100/00010/00100/01000/10000",
    ":": "00000/01100/01100/00000/01100/01100/00000",
    "-": "00000/00000/00000/11111/00000/00000/00000",
    " ": "00000/00000/00000/00000/00000/00000/00000",
}
GLYPH = {c: v.split("/") for c, v in F.items()}

BG = (9, 9, 11)
WHITE = (237, 237, 241)
AMBER = (251, 191, 36)
GREEN = (52, 211, 153)
MUTED = (139, 139, 149)

px = [[BG for _ in range(W)] for _ in range(H)]


def glow(cx, cy, radius, color, strength):
    """Additive soft radial light, cheap enough at this canvas size."""
    for y in range(max(0, cy - radius), min(H, cy + radius)):
        for x in range(max(0, cx - radius), min(W, cx + radius)):
            d = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5
            if d >= radius:
                continue
            falloff = (1 - d / radius) ** 2 * strength
            r, g, b = px[y][x]
            px[y][x] = (
                min(255, int(r + color[0] * falloff)),
                min(255, int(g + color[1] * falloff)),
                min(255, int(b + color[2] * falloff)),
            )


def grid(step=44, alpha=0.045):
    for y in range(0, H, step):
        for x in range(W):
            r, g, b = px[y][x]
            px[y][x] = (min(255, int(r + 255 * alpha)), min(255, int(g + 255 * alpha)), min(255, int(b + 255 * alpha)))
    for x in range(0, W, step):
        for y in range(H):
            r, g, b = px[y][x]
            px[y][x] = (min(255, int(r + 255 * alpha)), min(255, int(g + 255 * alpha)), min(255, int(b + 255 * alpha)))


def rect(x0, y0, w, h, color):
    for y in range(y0, min(H, y0 + h)):
        for x in range(x0, min(W, x0 + w)):
            px[y][x] = color


def text(s, x0, y0, scale, color):
    """Draw a string in the 5x7 font at `scale`, returning the end x."""
    cx = x0
    for ch in s.upper():
        glyph = GLYPH.get(ch, GLYPH[" "])
        for gy, row in enumerate(glyph):
            for gx, bit in enumerate(row):
                if bit == "1":
                    rect(cx + gx * scale, y0 + gy * scale, scale, scale, color)
        cx += 6 * scale
    return cx


glow(150, 90, 620, AMBER, 0.13)
glow(1080, 560, 560, GREEN, 0.10)
grid()

M = 96

text("$ WHOAMI  -  HELLO, WORLD", M, 118, 4, GREEN)

# Name: "Madhur" in near-white, "Gupta" in amber (mirrors .text-gradient)
end = text("MADHDUR ", M, 196, 12, WHITE)
text("GUPTA", end, 196, 12, AMBER)

text("FULL STACK DEVELOPER", M, 330, 6, GREEN)

rect(M, 424, W - 2 * M, 3, AMBER)

text("GEOSPATIAL  REALTIME  BACKEND AUTOMATION", M, 470, 4, MUTED)

raw = b"".join(
    b"\x00" + b"".join(struct.pack("BBB", *px[y][x]) for x in range(W))
    for y in range(H)
)


def chunk(tag, data):
    return (
        struct.pack(">I", len(data))
        + tag
        + data
        + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    )


png = (
    b"\x89PNG\r\n\x1a\n"
    + chunk(b"IHDR", struct.pack(">IIBBBBB", W, H, 8, 2, 0, 0, 0))
    + chunk(b"IDAT", zlib.compress(raw, 9))
    + chunk(b"IEND", b"")
)

with open("public/og.png", "wb") as fh:
    fh.write(png)
print("wrote public/og.png", len(png), "bytes")
