// import React from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useState, useEffect } from 'react';
import { getEvents, extractLocations } from './api';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]); // fetchData() is called whenever there’s a change in the currentCity, currentNOE state

  const fetchData = async () => {
    const allEvents = await getEvents(); // getEvents() is the function from api.js
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

 return (  
   <div className="App">
    <h1 className='main-title'><span>Meet</span> App </h1>
     <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />  {/* passing a new state "allLocations" to the CitySearch component */}
     <NumberOfEvents setCurrentNOE={setCurrentNOE} />
     <EventList events={events} />
   </div>
 );
}

export default App;
