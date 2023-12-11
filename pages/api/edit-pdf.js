import formidable from 'formidable';
import fs from 'fs';
import { spawn } from 'child_process';

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).end();
      return;
    }

    const { name, signature } = fields;

    const pdfFile = fs.readFileSync('/var/www/bos.ultimopay.io/public/Opening_Account_Form.pdf');

    // Use a PDF editing library to add form data and signature to PDF file
    const pdfEditor = spawn('pdftk', [
      '-', // Use stdin as input file
      'fill_form', 'path/to/your/form-data.fdf', // Use FDF file to fill form fields
      'output', '-', // Use stdout as output file
      'flatten' // Flatten form fields
    ]);

    const fdfData = `\
        <</T(name)/V(${name})>> \
        <</T(signature)/V(${files.signature.path})/FS/URL>>`;

    pdfEditor.stdin.write(pdfFile);
    pdfEditor.stdin.write(fdfData);
    pdfEditor.stdin.end();

    const output = await new Promise((resolve, reject) => {
      let outputData = '';

      pdfEditor.stdout.on('data', (data) => {
        outputData += data;
      });

      pdfEditor.on('close', (code) => {
        if (code === 0) {
          resolve(outputData);
        } else {
          reject(code);
        }
      });
    });

    // Save edited PDF file to server or cloud storage service
const editedPdfPath = '/var/www/bos.ultimopay.io/public/file.pdf';
fs.writeFileSync(editedPdfPath, output);
// Return URL of edited PDF file to client
const response = {
    url: `https://bos.ultimopay.io/public/${editedPdfPath}`,
  };
  res.status(200).json(response);
});
}  
