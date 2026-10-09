from PIL import Image
from glob import glob
import os

# List all PNG files
cartelas_dir = "cartelas"
cartela_filename = "cartela*.png"
png_files = glob(os.path.join(cartelas_dir, cartela_filename))
png_files.sort()  # optional: sort alphabetically

for png_file in png_files:
    # Open PNG and convert to RGB
    img = Image.open(png_file).convert("RGB")
    
    # Generate PDF filename
    pdf_file = os.path.splitext(png_file)[0] + ".pdf"
    
    # Save as PDF without resizing
    img.save(pdf_file, "PDF")
    
    print(f"Saved {pdf_file} from {png_file}")

print("All PNGs have been converted to PDFs!")
