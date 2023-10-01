// import { useState } from 'react';
import React from 'react';

const NumberOfEvents = ({ setCurrentNOE }) => {
  // const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChange = (e) => {
    const value = e.target.value;
    // setNumberOfEvents(value);
    setCurrentNOE(value);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="eventCount">Number of Events: </label>
      <input id="eventCount-input"
        type="text"        
        defaultValue="32"
        onChange={handleInputChange}
      />
    </div>
  );
}

export default NumberOfEvents;






