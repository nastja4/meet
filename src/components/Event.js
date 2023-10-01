import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  // // Function to format a date string to a human-readable format
  // const formatDate = (dateTimeString) => {
  //   const date = new Date(dateTimeString);
  //   return date.toLocaleString(); // Adjust the format as needed
  // };

  return (
    <li className="event">
      <h3>{event && event.summary}</h3>
      <p>{event && event.location}</p>
      <p>{event && (new Date(event.start.dateTime)).toUTCString()}</p>
      {/* <p>{event && (new Date(event.start.dateTime).toLocaleDateString('en-GB'))}</p>  */}
      
      {showDetails ? (
        <div className="eventDetails">
          <b>Event Details</b>  
          <p>Start Time: { event && (new Date(event.start.dateTime).toUTCString())}</p>
          <p>End Time: {event && (new Date(event.end.dateTime).toUTCString())}</p>
          <p>Status: {event.status}</p>
          <p>Description: {event && event.description}</p>            
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