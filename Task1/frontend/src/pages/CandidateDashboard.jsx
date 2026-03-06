import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import './CandidateDashboard.css'
import { AuthContext } from "../context/AuthContext";

function CandidateDashboard() {
  const { user } = useContext(AuthContext);
  const token = user?.token;

  const [applications, setApplications] = useState([]);

  useEffect(() => {
  const fetchApplications = async () => {
    try {
      const { data } = await API.get("/applications/candidate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      const myApps = data.filter(
        (app) => app.candidate._id === user.user._id
      );

      setApplications(myApps);
    } catch (error) {
      console.log(error);
    }
  };

  if (token) {
    fetchApplications();
  }
}, [token, user]);

  return (
  <div className="container dashboard" style={{ padding: "40px 0" }}>
    <h2 className="dashboard-title">Your Applications</h2>

    {applications.length === 0 ? (
      <div className="empty-box">
        <p>You haven't applied to any jobs yet.</p>
      </div>
    ) : (
      <div className="applications-grid">
        {applications.map((app) => (
          <div key={app._id} className="application-card">

            <div className="job-info">
              <h3>{app.job.title}</h3>
              <p className="company">{app.job.company}</p>
              <p className="location">{app.job.location}</p>
            </div>

            <div className={`status ${app.status}`}>
              {app.status}
            </div>

          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default CandidateDashboard;
