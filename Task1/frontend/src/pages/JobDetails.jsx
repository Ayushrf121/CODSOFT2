import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "./JobDetails.css";

function JobDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      const { data } = await API.get(`/jobs/${id}`);
      setJob(data);
    };

    const checkApplication = async () => {
      if (!user) return;

      try {
        const { data } = await API.get(`/applications/check/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setAlreadyApplied(data.applied);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJob();
    checkApplication();

  }, [id, user]);

  const handleApply = async () => {
    const formData = new FormData();
    formData.append("resume", new File(["resume"], "resume.txt"));

    await API.post(`/applications/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setAlreadyApplied(true);
    alert("Applied Successfully");
  };

  if (!job) return <p className="job-loading">Loading job details...</p>;

  return (
    <div className="job-details-wrapper">

      <div className="job-details-card">

        <div className="job-header">
          <h1 className="job-title">{job.title}</h1>
          <span className="job-location">{job.location}</span>
        </div>

        <div className="job-meta">
          <div className="job-meta-item">
            <span className="meta-label">Salary</span>
            <span className="meta-value">{job.salary}</span>
          </div>

          <div className="job-meta-item">
            <span className="meta-label">Location</span>
            <span className="meta-value">{job.location}</span>
          </div>
        </div>

        <div className="job-description-section">
          <h3>Job Description</h3>
          <p className="job-description-text">{job.description}</p>
        </div>

        {user && user.user.role === "candidate" && (
          <button
            className={`apply-job-button ${alreadyApplied ? "applied" : ""}`}
            onClick={handleApply}
            disabled={alreadyApplied}
          >
            {alreadyApplied ? "Already Applied" : "Apply for this Job"}
          </button>
        )}

      </div>

    </div>
  );
}

export default JobDetails;
