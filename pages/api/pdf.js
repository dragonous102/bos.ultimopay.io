import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function htmlToPdf(html) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();
  return pdfBuffer;
}

export default async function handler(req, res) {
  const html = req.body.html;
  const pdfBuffer = await htmlToPdf(html);

  // write the PDF buffer to a file in public/pdf folder
  const fileName = `${Date.now()}.pdf`;
  const filePath = path.join(process.cwd(), 'public', 'pdf', fileName);
  fs.writeFileSync(filePath, pdfBuffer);

  res.status(200).json({ success: true, filePath: `/pdf/${fileName}` });
}
