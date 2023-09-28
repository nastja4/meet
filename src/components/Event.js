import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Function to format a date string to a human-readable format
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString(); // Adjust the format as needed
  };

  return (
    <li className="event">
      <b>{event.summary}</b>
      <p>{event.created}</p>
      <p>{event.location}</p>
      
      {showDetails ? (
        <div className="eventDetails">
          <b>Event Details</b>
          <p>Location: {event.location}</p>
          <p>Start Time: {formatDate(event.start.dateTime)}</p>
          <p>End Time: {formatDate(event.end.dateTime)}</p>
          <p>{event.status}</p>
          <p>Description: {event.description}</p>            
        </div>
      ) : null}

      <button className="eventDetails-btn"
        onClick={() => {
          setShowDetails(!showDetails); // Toggle the state
        }}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </li>    
  );
};

export default Event;