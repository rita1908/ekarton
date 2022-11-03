const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const diagnoseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    description: {
      type: String,
      require: true,
    },
    media: {
      type: String,
      require: true,
    },
    patientId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
mongoose.model("Diagnose", diagnoseSchema);
