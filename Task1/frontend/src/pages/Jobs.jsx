import { useEffect, useState } from "react";
import API from "../api/axios";
import JobCard from "../components/JobCard";
import { FaBriefcase } from "react-icons/fa";
import "./Jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await API.get("/jobs");
      setJobs(data);
    };

    fetchJobs();
  }, []);

  return (
    <div className="jobs-wrapper">
      
      <div className="jobs-header">
        <FaBriefcase className="jobs-icon" />
        <h2>Available Jobs</h2>
      </div>

      <div className="jobs-grid">
        {jobs.length === 0 ? (
          <div className="no-jobs">
            <FaBriefcase size={40} />
            <p>No jobs found at the moment.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
}

export default Jobs;
