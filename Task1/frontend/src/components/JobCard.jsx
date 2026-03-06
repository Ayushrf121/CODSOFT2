import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function JobCard({ job }) {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/jobs/${job._id}`);
  };

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p><b>Company:</b> {job.company}</p>
      <p><b>Location:</b> {job.location}</p>

      <button className="view-btn" onClick={handleView}>
        View Details <FaArrowRight className="arrow-icon" />
      </button>
    </div>
  );
}

export default JobCard;
