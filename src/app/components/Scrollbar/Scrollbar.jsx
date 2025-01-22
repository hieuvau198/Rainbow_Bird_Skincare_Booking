import React from "react";
import PropTypes from "prop-types";
import "../../styles/Scrollbar.css";

export default function Scrollbar({ children, style, className, trackColor, thumbColor, thumbHoverColor }) {
  const customStyles = {
    "--scrollbar-track-color": trackColor || "#ffffff",
    "--scrollbar-thumb-color": thumbColor || "black",
    "--scrollbar-thumb-hover-color": thumbHoverColor || "#0ea5e9",
  };

  return (
    <div
      className={`custom-scrollbar ${className || ""}`}
      style={{ ...style, ...customStyles }}
    >
      {children}
    </div>
  );
}

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  trackColor: PropTypes.string,
  thumbColor: PropTypes.string,
  thumbHoverColor: PropTypes.string,
};
