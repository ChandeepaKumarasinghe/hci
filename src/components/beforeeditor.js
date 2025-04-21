import React from "react";
import { useNavigate } from "react-router-dom";

function BFE() {
    const navigate = useNavigate(); // Initialize the navigate function
  
    const handleExitClick = () => {
      navigate("../"); // Navigate to the parent route
    };
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
          <h1>Welcome, <span>user</span></h1>
          <p>Ready to continue?</p>
          <button
            className="exit-btn"
            style={{
              backgroundColor: "#ff5733", // Red-orange color
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              marginLeft: "10px",
            }}
            onClick={handleExitClick} // Navigate to the parent route on click
          >
            go to 3d editor
          </button>
        </div>
      );
    }

    export default BFE;