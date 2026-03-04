import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaMoneyBill } from "react-icons/fa";
import "./JobCard.css";

function JobCard({ job }) {
  return (
    <div className="job-card">
      <div className="job-title">{job.title}</div>

      <div className="job-meta">
        <span><FaMapMarkerAlt /> {job.location}</span>
        <span><FaMoneyBill /> {job.salary}</span>
      </div>

      <p style={{ marginTop: "10px", fontSize: "14px" }}>
        {job.description.substring(0, 80)}...
      </p>

      <Link to={`/jobs/${job._id}`} className="job-btn">
        View Details
      </Link>
    </div>
  );
}

export default JobCard;