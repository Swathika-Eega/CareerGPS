function ResumeTips({ missingSkills }) {
  return (
    <div className="tip-card">
      <h2>AI Resume Tips</h2>

      <ul>
        {missingSkills && missingSkills.length > 0 ? (
          missingSkills.map((skill, index) => (
            <li key={index}>
              Add projects demonstrating {skill}
            </li>
          ))
        ) : (
          <>
            <li>Add GitHub links</li>
            <li>Highlight internships</li>
            <li>Show measurable achievements</li>
          </>
        )}
      </ul>
    </div>
  );
}

export default ResumeTips;