import React, { useState, useEffect } from 'react';
import './style.sass';

const DynamicNotepad = () => {
  const [text, setText] = useState('');
  const [charStats, setCharStats] = useState({
    letters: 0,
    numbers: 0,
    spaces: 0,
    special: 0,
    total: 0
  });
  
  // Calculate background color based on character composition
  const getBackgroundColor = () => {
    const { letters, numbers, special, total } = charStats;
    
    if (total === 0) return 'rgb(255, 255, 255)'; // Default white
    
    // Calculate percentages (capped to avoid extreme colors)
    const letterPercent = Math.min((letters / total) * 255, 255);
    const numberPercent = Math.min((numbers / total) * 255, 255);
    const specialPercent = Math.min((special / total) * 255, 255);
    
    // Create RGB color based on character types
    // Letters affect Red, Numbers affect Green, Special chars affect Blue
    return `rgb(${Math.round(letterPercent)}, ${Math.round(numberPercent)}, ${Math.round(specialPercent)})`;
  };
  
  // Get text color for optimal contrast
  const getTextColor = () => {
    const backgroundColor = getBackgroundColor();
    const rgb = backgroundColor.match(/\d+/g).map(Number);
    
    // Calculate perceived brightness
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    
    return brightness > 128 ? '#333333' : '#ffffff';
  };
  
  // Analyze text to count character types
  useEffect(() => {
    const stats = {
      letters: 0,
      numbers: 0,
      spaces: 0,
      special: 0,
      total: text.length
    };
    
    for (const char of text) {
      if (/[a-zA-Z]/.test(char)) {
        stats.letters++;
      } else if (/[0-9]/.test(char)) {
        stats.numbers++;
      } else if (/\s/.test(char)) {
        stats.spaces++;
      } else {
        stats.special++;
      }
    }
    
    setCharStats(stats);
  }, [text]);
  
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  
  const clearText = () => {
    setText('');
  };
  
  const bgColor = getBackgroundColor();
  const textColor = getTextColor();
  
  // Calculate character percentages for the statistics display
  const calculatePercentage = (value) => {
    if (charStats.total === 0) return 0;
    return ((value / charStats.total) * 100).toFixed(1);
  };

  return (
    <div className="notepad-container">
      <h1 className="notepad-title">Dynamic Color Notepad</h1>
      
      <p className="notepad-description">
        Type text and watch the background change color based on your character types!
        Letters influence red, numbers influence green, and special characters influence blue.
      </p>
      
      <div 
        className="notepad-editor"
        style={{ backgroundColor: bgColor }}
      >
        <textarea
          value={text}
          onChange={handleTextChange}
          className="notepad-textarea"
          placeholder="Start typing to see the color change..."
          style={{ color: textColor }}
        />
      </div>
      
      <div className="notepad-controls">
        <button 
          onClick={clearText}
          className="notepad-button clear-button"
        >
          Clear Text
        </button>
        
        <div className="notepad-count">
          <p>Character count: {charStats.total}</p>
        </div>
      </div>
      
      <div className="notepad-analysis">
        <h2 className="analysis-title">Character Analysis</h2>
        
        <div className="analysis-grid">
          <div className="analysis-column">
            <div className="stat-container">
              <label className="stat-label">Letters (Red)</label>
              <div className="stat-bar-container">
                <div 
                  className="stat-bar letters-bar"
                  style={{ width: `${calculatePercentage(charStats.letters)}%` }}
                ></div>
              </div>
              <div className="stat-details">
                <span>{charStats.letters} characters</span>
                <span>{calculatePercentage(charStats.letters)}%</span>
              </div>
            </div>
            
            <div className="stat-container">
              <label className="stat-label">Numbers (Green)</label>
              <div className="stat-bar-container">
                <div 
                  className="stat-bar numbers-bar"
                  style={{ width: `${calculatePercentage(charStats.numbers)}%` }}
                ></div>
              </div>
              <div className="stat-details">
                <span>{charStats.numbers} characters</span>
                <span>{calculatePercentage(charStats.numbers)}%</span>
              </div>
            </div>
          </div>
          
          <div className="analysis-column">
            <div className="stat-container">
              <label className="stat-label">Special Chars (Blue)</label>
              <div className="stat-bar-container">
                <div 
                  className="stat-bar special-bar"
                  style={{ width: `${calculatePercentage(charStats.special)}%` }}
                ></div>
              </div>
              <div className="stat-details">
                <span>{charStats.special} characters</span>
                <span>{calculatePercentage(charStats.special)}%</span>
              </div>
            </div>
            
            <div className="stat-container">
              <label className="stat-label">Spaces (Neutral)</label>
              <div className="stat-bar-container">
                <div 
                  className="stat-bar spaces-bar"
                  style={{ width: `${calculatePercentage(charStats.spaces)}%` }}
                ></div>
              </div>
              <div className="stat-details">
                <span>{charStats.spaces} characters</span>
                <span>{calculatePercentage(charStats.spaces)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicNotepad;