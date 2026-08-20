import express from 'express';
import multer from 'multer';
import fs from 'fs';
import {CloudInarySer} from '../external_services/CloudinaryService.js'
const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + getTypeFileByMimetype(file.mimetype));
  },
});


const upload = multer({ storage: storage });


const uploadMiddleware = upload.fields([
  { name: 'avt', maxCount: 1 },
  { name: 'gallery', maxCount: 8 },
]);


router.post("/upload-avatar", uploadMiddleware, async (req, res) => {
  try {
    let targetPath = req.files.avt[0].path

    const result = await CloudInarySer.uploader.upload(targetPath, {
      folder: "/users/images",
    });
    
    fs.unlinkSync(targetPath)
  } catch (err) {
    console.log("lỗi", err)
  }

})

function getTypeFileByMimetype(mimetype) {
  return "." + mimetype.split("/")[mimetype.split("/").length - 1]
}

export default router;