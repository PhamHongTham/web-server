import cloudinary from 'cloudinary';

export const uploadController = {
  uploadImage: async (req, res) => {
    try {
      const data = await cloudinary.uploader.upload(req.file.path, {
        folder: "",
      });
      res.send({
        url: data.secure_url
      });
    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  }
};
