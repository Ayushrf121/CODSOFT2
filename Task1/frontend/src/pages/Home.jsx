import { Link } from "react-router-dom";
import { FaSearch, FaBriefcase, FaUserTie } from "react-icons/fa";
import "./Home.css";

function Home() {
    return (
        <div className="home">

            {/* HERO SECTION */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Find Your Dream Job Today</h1>
                    <p>
                        Discover thousands of job opportunities from top companies.
                        Start your journey towards a successful career.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/jobs" className="btn primary-btn">
                            Browse Jobs
                        </Link>

                        <Link to="/register" className="btn secondary-btn">
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="features container">
                <h2>Why Choose Us?</h2>

                <div className="feature-grid">

                    <div className="feature-card">
                        <FaSearch className="feature-icon" />
                        <h3>Easy Search</h3>
                        <p>Quickly find jobs that match your skills and interests.</p>
                    </div>

                    <div className="feature-card">
                        <FaBriefcase className="feature-icon" />
                        <h3>Top Companies</h3>
                        <p>Apply to trusted and verified employers worldwide.</p>
                    </div>

                    <div className="feature-card">
                        <FaUserTie className="feature-icon" />
                        <h3>Career Growth</h3>
                        <p>Build your profile and grow your professional journey.</p>
                    </div>

                </div>
            </section>

            {/* IMAGE SECTION */}
            <section className="info-section">
                <div className="container info-content">
                    <div className="info-text">
                        <h2>Your Career Starts Here</h2>
                        <p>
                            Whether you're a fresh graduate or an experienced professional,
                            we connect you with opportunities that matter.
                        </p>
                        <p>
                            Employers can easily post jobs and manage applications
                            in a seamless dashboard experience.
                        </p>
                    </div>

                    <div className="info-image">
                        <img
                            src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
                            alt="Office workspace"
                        />
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Home;
