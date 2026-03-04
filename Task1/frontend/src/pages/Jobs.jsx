import { useEffect, useState } from "react";
import API from "../api/axios";
import JobCard from "../components/JobCard";
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
    <div className="container jobs-page" style={{ padding: "40px 0" }}>
      <h2 className="jobs-title">Available Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        jobs.map((job) => <JobCard key={job._id} job={job} />)
      )}
    </div>
  );
}

export default Jobs;