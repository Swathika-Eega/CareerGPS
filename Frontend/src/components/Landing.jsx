function Landing({ onStart }) {
  return (
    <div>
      <h1>CareerGPS</h1>

      <h3>
        AI Powered Career Guidance Platform
      </h3>

      <p>
        Upload your resume and discover
        missing skills for your dream job.
      </p>

      <button onClick={onStart}>
        Get Started
      </button>
    </div>
  );
}

export default Landing;