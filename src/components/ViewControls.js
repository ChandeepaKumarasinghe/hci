import React from 'react';
import './ViewControls.css';

const ViewControls = ({
  is2DView,
  isFadingEnabled,
  fadeIntensity,
  onToggle2DView,
  onToggleFading,
  onSetFadeIntensity
}) => {
  return (
    <div className="view-controls">
      <h3>View Options</h3>
      
      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={is2DView}
            onChange={onToggle2DView}
          />
          2D View
        </label>
      </div>
      
      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={isFadingEnabled}
            onChange={onToggleFading}
          />
          Enable Fading
        </label>
      </div>
      
      {isFadingEnabled && (
        <div className="control-group">
          <label>
            Fade Intensity:
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={fadeIntensity}
              onChange={(e) => onSetFadeIntensity(parseFloat(e.target.value))}
            />
            {fadeIntensity.toFixed(1)}
          </label>
        </div>
      )}
    </div>
  );
};

export default ViewControls;