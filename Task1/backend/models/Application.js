import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resume: {
      type: String,
    },
    status: {
      type: String,
      default: "applied",
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;