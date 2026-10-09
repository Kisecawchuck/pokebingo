from PyPDF2 import PdfMerger,PdfReader,PdfWriter
from glob import glob
import os

# List of PDF files to combine
cartelas_dir = "cartelas"
cartela_filename = "cartela*.pdf"
pdf_files = glob(os.path.join(cartelas_dir, cartela_filename))
print(len(pdf_files))
pdf_files_first = pdf_files[0:100]
second = pdf_files[100:150]
third = pdf_files[150:]

### Create a PdfMerger object
merger = PdfMerger()

### Append each PDF file
for pdf in pdf_files_first:
    merger.append(open(pdf, "rb"))

### Write the combined PDF to a file
merger.write('Pokebingo200.pdf')
merger.close()

merger = PdfMerger()

### Append each PDF file
for pdf in second:
    merger.append(open(pdf, "rb"))

### Write the combined PDF to a file
merger.write('Pokebingo100pt1.pdf')
merger.close()

merger = PdfMerger()

### Append each PDF file
for pdf in third:
    merger.append(open(pdf, "rb"))

### Write the combined PDF to a file
merger.write('Pokebingo100pt2.pdf')
merger.close()


##
print("PDF files have been successfully combined!")
