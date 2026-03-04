import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function JobDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const { data } = await API.get(`/jobs/${id}`);
      setJob(data);
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    const formData = new FormData();
    formData.append("resume", new File(["resume"], "resume.txt"));

    await API.post(`/applications/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Applied Successfully");
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="container dashboard" style={{ padding: "40px 0" }}>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p><b>Location:</b> {job.location}</p>
      <p><b>Salary:</b> {job.salary}</p>

      {user && user.user.role === "candidate" && (
        <button className="form-btn" onClick={handleApply}>
          Apply Now
        </button>
      )}
    </div>
  );
}

export default JobDetails;