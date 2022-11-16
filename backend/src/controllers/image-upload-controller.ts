import { NextFunction, Request, Response } from 'express';
import { IUploadFileViewModel } from '../models/view-models/IUploadFileViewModel';
import path from 'path';
import fs from 'fs';
import fileUpload from 'express-fileupload';

export const imageUploadController = {
  async uploadImage(
    req: Request<FormData>,
    res: Response<IUploadFileViewModel>,
    next: NextFunction
  ) {
    let loadedFile: fileUpload.UploadedFile | fileUpload.UploadedFile[];
    let uploadPath: string;
    const folderPath: string = path.join(__dirname, 'uploads/images/');

    if (!req['files'] || Object.keys(req['files']).length === 0) {
      return next({
        message: 'No files were uploaded',
        status: 404,
      });
    }
    loadedFile = req.files.file as fileUpload.UploadedFile;
    uploadPath = path.join(__dirname, '../uploads/images/' + loadedFile.name);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(path.join(__dirname, '../uploads/images'), {
        recursive: true,
      });
    }

    loadedFile.mv(uploadPath, function (err) {
      if (err)
        return next({
          message: err.message,
          status: 500,
        });
      res.json({
        filePath: uploadPath,
        status: 201,
        message: 'Image uploaded successfully',
      });
    });
  },
};
