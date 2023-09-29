import React, { useState } from 'react';

const NumberOfEvents = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChange = (e) => {
    setNumberOfEvents(e.target.value);
  };

  return (
    <div id="numberOfEvents">
      <label htmlFor="eventCount">Number of Events:</label>
      <input id="eventCount-textbox"
        type="text"        
        value={numberOfEvents}
        onChange={handleInputChange}
        min="1"
      />
    </div>
  );
};

export default NumberOfEvents;






