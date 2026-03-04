import Application from "../models/Application.js";
import Job from "../models/Job.js";

// APPLY TO JOB (Candidate Only)
export const applyToJob = async (req, res) => {
  try {
    if (req.user.role !== "candidate") {
      return res.status(403).json({ message: "Only candidates can apply" });
    }

    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Prevent duplicate application
    const alreadyApplied = await Application.findOne({
      job: jobId,
      candidate: req.user._id,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = await Application.create({
      job: jobId,
      candidate: req.user._id,
      resume: req.file ? req.file.path : "",
    });

    res.status(201).json({
      message: "Applied Successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EMPLOYER VIEW APPLICATIONS FOR THEIR JOBS
export const getApplicationsForEmployer = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers allowed" });
    }

    const applications = await Application.find()
      .populate("job")
      .populate("candidate", "name email");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};