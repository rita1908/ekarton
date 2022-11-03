const ImageUploadRouter = require("express").Router();
const { fetchData } = require("../src/components/profileP");
const parser = require("../middleware/cloudinary.config");
ImageUploadRouter.post("/image", parser.single("image"), fetchData);
module.exports = ImageUploadRouter;
