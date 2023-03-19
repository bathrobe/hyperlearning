from http.server import BaseHTTPRequestHandler
import pdfplumber
import json
import os


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
        self.wfile.write(str("Hello World!!").encode())
        return

    def do_POST(self):
        content_length = int(self.headers["Content-Length"])
        post_data = self.rfile.read(content_length)

        # Save the received PDF file temporarily
        with open("temp.pdf", "wb") as temp_file:
            temp_file.write(post_data)

        # Extract content from the PDF using pdfplumber
        extracted_content = []
        with pdfplumber.open("temp.pdf") as pdf:
            for page in pdf.pages:
                extracted_content.append(page.extract_text())

        # Remove the temporary PDF file
        os.remove("temp.pdf")

        # Send the extracted content as a JSON response
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(extracted_content).encode("utf-8"))
