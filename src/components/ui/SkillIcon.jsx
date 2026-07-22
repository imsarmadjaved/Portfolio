const MARKS = {
  react: "R",
  reactjs: "R",
  next: "N",
  nextjs: "N",
  javascript: "JS",
  typescript: "TS",
  html: "H",
  html5: "H",
  css: "C",
  css3: "C",
  tailwind: "Tw",
  tailwindcss: "Tw",
  node: "No",
  nodejs: "No",
  express: "Ex",
  expressjs: "Ex",
  api: "API",
  restfulapis: "API",
  mvc: "MVC",
  mvcarchitecture: "MVC",
  python: "Py",
  java: "Jv",
  jwt: "JWT",
  jwtauthentication: "JWT",
  mongodb: "Mg",
  postgresql: "Pg",
  sql: "SQL",
  sqlnosql: "SQL",
};

const SkillIcon = ({ name, icon, className = "" }) => {
  const initial = (name || "?").charAt(0).toUpperCase();
  const slug = (icon || name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

  return (
    <span
      className={`skill-icon ${className}`}
      aria-hidden="true"
      data-skill={slug}
    >
      {MARKS[slug] || initial}
    </span>
  );
};

export default SkillIcon;
