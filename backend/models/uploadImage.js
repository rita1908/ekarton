const ImageSchema = require("./diagnose");

module.exports.UploadImage = async (req, res) => {
  const diagnoseSchema = new ImageSchema({
    image: req.file.path,
  });
  try {
    await imageUploaded.save();
  } catch (error) {
    return res.status(400).json({
      message: "image upload failed, check to see the ${error}",
      status: "error",
    });
  }
};
