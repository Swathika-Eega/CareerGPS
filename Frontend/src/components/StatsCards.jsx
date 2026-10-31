function StatsCards({
  skillsCount,
  missingCount,
  resourcesCount,
}) {
  return (
    <div className="stats-grid">

      <div className="stat-card">
        <h3>{skillsCount}</h3>
        <p>Skills Found</p>
      </div>

      <div className="stat-card">
        <h3>{missingCount}</h3>
        <p>Missing Skills</p>
      </div>

      <div className="stat-card">
        <h3>{resourcesCount}</h3>
        <p>Resources</p>
      </div>

    </div>
  );
}

export default StatsCards;