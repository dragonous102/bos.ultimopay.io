import path from 'path';
import fs from 'fs';
import { serialize, parse } from 'cookie';

const FileAccess = (req, res) => {
    const cookies = parse(req.headers.cookie || '');

  const encodedData = cookies.user;
  if (!encodedData) {
    res.status(401).json({ error: 'User not authenticated' });
    return;
  }
  
  const decodedData = decodeURIComponent(encodedData);
  const user = JSON.parse(decodedData);
  
  // Check if the user is authenticated
  if (!user) {
    res.status(401).json({ error: 'User not authenticated' });
    return;
  }

  const directoryPath = path.join(process.cwd(), 'bos_pdf_api', 'jdb', 'data', 'upload');

  // Get the file name from the query parameter
  const fileName = req.query.file || '';

  // Validate and sanitize the file name
  const sanitizedFileName = path.basename(fileName);

  // Construct the file path
  const filePath = path.join(directoryPath, sanitizedFileName);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: 'File not found' });
    return;
  }

  // Set the appropriate Content-Type based on file extension
  const extension = path.extname(filePath).toLowerCase();
  let contentType = '';

  switch (extension) {
    case '.pdf':
      contentType = 'application/pdf';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    // Add more cases for other file types if needed
    default:
      contentType = 'application/octet-stream';
      break;
  }

  // Set the Content-Type header
  res.setHeader('Content-Type', contentType);

  // Output the file contents
  fs.createReadStream(filePath).pipe(res);
};

export default FileAccess;
