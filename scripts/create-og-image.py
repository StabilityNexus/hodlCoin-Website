#!/usr/bin/env python3
"""
Create an optimized Open Graph image (1200x630) for social media sharing.
This script creates a properly sized image with centered logo and padding to prevent
cropping on Discord, Twitter, Facebook, LinkedIn, and other platforms.
Uses the recommended 1.91:1 aspect ratio (1200x630).
"""

from PIL import Image
import os
import sys

def create_og_image(input_path, output_path, target_width=1200, target_height=630):
    """
    Create an optimized Open Graph image with proper padding to prevent cropping.
    This version centers the logo with padding instead of cropping it.
    
    Args:
        input_path: Path to the source image
        output_path: Path where the optimized image will be saved
        target_width: Target width (default: 1200)
        target_height: Target height (default: 630)
    """
    try:
        # Open the source image
        logo = Image.open(input_path)
        logo_width, logo_height = logo.size
        
        # Create a new image with the target dimensions
        # Use a background color that matches the logo or is neutral
        if logo.mode == 'RGBA':
            bg_color = (255, 255, 255, 255)
        else:
            bg_color = (255, 255, 255)
        
        img = Image.new('RGB', (target_width, target_height), bg_color)
        
        # Calculate scaling to fit logo with padding (use 80% of image area)
        max_logo_width = int(target_width * 0.8)
        max_logo_height = int(target_height * 0.8)
        
        # Calculate scale factor to fit within the padded area
        scale_w = max_logo_width / logo_width
        scale_h = max_logo_height / logo_height
        scale = min(scale_w, scale_h)  # Use the smaller scale to fit both dimensions
        
        # Calculate new logo dimensions
        new_logo_width = int(logo_width * scale)
        new_logo_height = int(logo_height * scale)
        
        # Resize logo
        if logo.mode == 'RGBA':
            logo_resized = logo.resize((new_logo_width, new_logo_height), Image.Resampling.LANCZOS)
        else:
            logo_resized = logo.resize((new_logo_width, new_logo_height), Image.Resampling.LANCZOS)
            if logo_resized.mode != 'RGBA':
                logo_resized = logo_resized.convert('RGBA')
        
        # Calculate position to center the logo
        x_offset = (target_width - new_logo_width) // 2
        y_offset = (target_height - new_logo_height) // 2
        
        # Paste logo onto background
        if logo_resized.mode == 'RGBA':
            img.paste(logo_resized, (x_offset, y_offset), logo_resized)
        else:
            img.paste(logo_resized, (x_offset, y_offset))
        
        # Save the optimized image
        img.save(output_path, 'PNG', optimize=True, quality=95)
        print(f"✓ Created optimized OG image: {output_path}")
        print(f"  Dimensions: {img.size[0]}x{img.size[1]} (aspect ratio: {img.size[0]/img.size[1]:.2f}:1)")
        print(f"  Logo size: {new_logo_width}x{new_logo_height} (scaled {scale:.2f}x)")
        print(f"  Logo position: centered with {x_offset}px horizontal, {y_offset}px vertical padding")
        return True
        
    except Exception as e:
        print(f"✗ Error creating OG image: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    # Get the script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    input_path = os.path.join(project_root, "public", "hodlcoin.png")
    output_path = os.path.join(project_root, "public", "hodlcoin-og.png")
    
    if not os.path.exists(input_path):
        print(f"✗ Source image not found: {input_path}", file=sys.stderr)
        sys.exit(1)
    
    success = create_og_image(input_path, output_path)
    sys.exit(0 if success else 1)


