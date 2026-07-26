import { portfolioData } from "../../data/PortfolioData";

const LogoMark = ({ className = "", title }) => {
  const name = portfolioData.personal.name;
  const parts = name.trim().split(/\s+/);
  const lastName = parts.pop();
  const firstNames = parts.join(" ");

  return (
    <span
      className={`logo-mark ${className}`.trim()}
      aria-label={title || name}
      role="img"
    >
      <span className="logo-mark__line">{firstNames}</span>
      <span className="logo-mark__line logo-mark__line--accent">{lastName}</span>
    </span>
  );
};

export default LogoMark;
