import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
export default function NavBarSideDropdown({
  iconFilenameAndPath,
  label,
  children,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          color: "white",
          textDecoration: "none",
          border: "1px solid transparent",
          cursor: "pointer",
          backgroundColor: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = "1px solid white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = "1px solid transparent";
        }}
      >
        <FontAwesomeIcon
          icon={expanded ? faChevronRight : faChevronDown}
          style={{ width: expanded ? "1rem" : "1.5rem", marginRight: "1rem" }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={iconFilenameAndPath}
            alt={`<${label} Icon>`}
            style={{ width: "1.5rem", marginRight: "1rem", color: "white" }}
          />
          <span>{label}</span>
        </div>
      </div>

      {expanded && <div style={{ paddingLeft: "2rem" }}>{children}</div>}
    </div>
  );
}
