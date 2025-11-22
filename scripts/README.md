# Scripts

## create-og-image.py

Generates an optimized Open Graph image for social media sharing.

### Usage

```bash
python3 scripts/create-og-image.py
```

This script:
- Takes the source image from `public/hodlcoin.png`
- Creates an optimized version at `public/hodlcoin-og.png`
- Resizes and crops to 1200×630 pixels (1.91:1 aspect ratio)
- Maintains image quality while meeting social media platform requirements

### Requirements

- Python 3
- PIL/Pillow library

### Why 1200×630?

This is the recommended aspect ratio (1.91:1) for Open Graph images used by:
- Facebook
- LinkedIn
- Twitter (summary_large_image)
- Most other social media platforms

Using this size ensures optimal display without cropping or distortion.

