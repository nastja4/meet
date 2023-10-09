// import { useState } from 'react';
import React from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  // const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChange = (e) => {
    const value = e.target.value;
    // setNumberOfEvents(value);
    // setCurrentNOE(value);

    let errorText;
    if (isNaN(value) || value <= 0) {
      errorText = "The number of events is not defined or not valid"
    } else {
      errorText = "";
      setCurrentNOE(value);
    }
    setErrorAlert(errorText);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="eventCount">Number of Events: </label>
      <input id="eventCount-input"
        type="text"        
        defaultValue="32"
        onChange={handleInputChange}
        placeholder="Enter the number of events"
      />
    </div>
  );
}

export default NumberOfEvents;






