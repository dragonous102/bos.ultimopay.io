// pages/api/savePdf.js

import fs from 'fs';
import path from 'path';

export default async function savePdf(req, res) {
  const { pdfBytes } = req.body;

  // Generate a unique filename for the PDF
  const filename = `pdf_${Date.now()}.pdf`;

  // Save the PDF to the public folder
  const filePath = path.join(process.cwd(), 'public', filename);
  fs.writeFileSync(filePath, pdfBytes);

  // Return the public URL of the PDF
  const publicUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${filename}`;
  res.status(200).json({ url: publicUrl });
}
