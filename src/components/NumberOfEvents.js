import { useState } from 'react';

const NumberOfEvents = ({ }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChange = (e) => {
    setNumberOfEvents(e.target.value);
  };

  return (
    <div id="numberOfEvents">
      <label htmlFor="eventCount">Number of Events: </label>
      <input id="eventCount-input"
        type="text"        
        value={numberOfEvents}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default NumberOfEvents;






