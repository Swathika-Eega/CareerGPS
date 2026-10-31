function SkillTags({ skills }) {
  return (
    <div className="tags-container">

      {skills.map((skill, index) => (
        <span
          key={index}
          className="skill-tag"
        >
          {skill}
        </span>
      ))}

    </div>
  );
}

export default SkillTags;