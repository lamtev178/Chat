import React from 'react';

function ChangeTheme({handleTheme, theme}){
  return (
    <div className="toggle "  onClick={handleTheme}>
      <div className="toggleTrack">
        <div className="toggleTrackCheck">
          <span className="toggleIcon">🌞</span>
        </div>
        <div className="toggleTrackX">
          <span className="toggleIcon">🌜</span>
        </div>
        <div className={"toggleTrackThumb " + (theme ? null : "toggleTrackThumbActive")}/>
      </div>
    </div>
  )
}

export default ChangeTheme