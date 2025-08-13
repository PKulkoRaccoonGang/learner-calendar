import React from 'react';
import '../styles/YearSelector.scss';

const YearSelector = ({ selectedYear, onYearChange, availableYears }) => {
  return (
    <div className="year-selector">
      <div className="year-selector-header">
        <h3>Select Year</h3>
      </div>
      <div className="year-buttons">
        {availableYears.map(year => (
          <button
            key={year}
            className={`year-button ${selectedYear === year ? 'active' : ''}`}
            onClick={() => onYearChange(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default YearSelector;
