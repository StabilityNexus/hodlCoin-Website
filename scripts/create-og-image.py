#!/usr/bin/env python3
"""
Create an optimized Open Graph image (1200x630) for social media sharing.
This script resizes and crops the hodlcoin.png to the recommended 1.91:1 aspect ratio.
"""

from PIL import Image
import os
import sys

def create_og_image(input_path, output_path, target_width=1200, target_height=630):
    """
    Create an optimized Open Graph image by resizing and cropping the input image.
    
    Args:
        input_path: Path to the source image
        output_path: Path where the optimized image will be saved
        target_width: Target width (default: 1200)
        target_height: Target height (default: 630)
    """
    try:
        # Open the source image
        img = Image.open(input_path)
        original_width, original_height = img.size
        
        # Calculate the target aspect ratio
        target_ratio = target_width / target_height
        
        # Calculate the source aspect ratio
        source_ratio = original_width / original_height
        
        # Resize and crop strategy
        if source_ratio > target_ratio:
            # Source is wider - fit to height and crop width
            new_height = target_height
            new_width = int(original_width * (target_height / original_height))
            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Crop from center
            left = (new_width - target_width) // 2
            right = left + target_width
            img = img.crop((left, 0, right, target_height))
        else:
            # Source is taller - fit to width and crop height
            new_width = target_width
            new_height = int(original_height * (target_width / original_width))
            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Crop from center
            top = (new_height - target_height) // 2
            bottom = top + target_height
            img = img.crop((0, top, target_width, bottom))
        
        # Ensure we have the exact target dimensions
        if img.size != (target_width, target_height):
            img = img.resize((target_width, target_height), Image.Resampling.LANCZOS)
        
        # Save the optimized image
        img.save(output_path, 'PNG', optimize=True)
        print(f"✓ Created optimized OG image: {output_path}")
        print(f"  Dimensions: {img.size[0]}x{img.size[1]} (aspect ratio: {img.size[0]/img.size[1]:.2f}:1)")
        return True
        
    except Exception as e:
        print(f"✗ Error creating OG image: {e}", file=sys.stderr)
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

