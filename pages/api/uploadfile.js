import multer from 'multer';
import fs from 'fs-extra';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    const email = req.body.email.replace('.com', '');
    const imageType = file.fieldname.split('_')[0];
    const imageName = `${imageType}_${email}.png`;
    cb(null, imageName);
  },
});

const upload = multer({ storage }).single('file');

export default async (req, res) => {
  try {
    await upload(req, res);
    res.status(200).json({ message: 'Image saved successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error saving image' });
  }
};
