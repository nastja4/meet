// import React from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import { useState, useEffect } from 'react';
import { getEvents, extractLocations } from './api';
import { ErrorAlert, InfoAlert, WarningAlert } from './components/Alert';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");  

  const fetchData = async () => {
    const allEvents = await getEvents(); // getEvents() is the function from api.js
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }


  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");      
    } else {
      setWarningAlert("You are currently offline. Some features may not be available")
    }
    fetchData();
  }, [currentCity, currentNOE]); // fetchData() is called whenever there’s a change in the currentCity, currentNOE state
  
  
  return (  
    <div className="App">
      <h1 className='main-title'><span>Meet</span> App </h1>
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>      
      <CitySearch 
        allLocations={allLocations} 
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert} />  {/* passing a new state "allLocations", setInfoAlert to the CitySearch component */}      
      <NumberOfEvents 
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert} 
      />      
      <div className='charts-container'>
        <EventGenresChart events={events}></EventGenresChart>
        <CityEventsChart allLocations={allLocations} events={events} />  
      </div>
      <EventList events={events} />
    </div>
  );
}

export default App;
