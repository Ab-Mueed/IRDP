import PyPDF2
import docx

# Function to extract text from a PDF
def pdf_to_text(pdf_file):
    reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page_num in range(len(reader.pages)):
        page = reader.pages[page_num]
        text += page.extract_text()
    return text

# Function to extract text from a DOCX file
def docx_to_text(docx_file):
    doc = docx.Document(docx_file)
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text

# Function to extract text from a TXT file
def txt_to_text(txt_file):
    return txt_file.read().decode("utf-8")
