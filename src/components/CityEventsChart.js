import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const getData = () => {
    const data = allLocations.map((location) => {
      const count = events.filter((event) => event.location === location).length;
      // split() the location at the occurrence of a comma followed by a space (", "), refers to the first element in that array with [0], which is the name of the city
      const city = location.split(/, | - /)[0];
      return { city, count };
    })
    return data;
  }

  // const data = [
  //   { x: 100, y: 200, z: 200 },
  //   { x: 120, y: 100, z: 260 },
  //   { x: 170, y: 300, z: 400 },
  //   { x: 140, y: 250, z: 280 },
  //   { x: 150, y: 400, z: 500 },
  //   { x: 110, y: 280, z: 200 },
  // ];

  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60,
          left: -30,
        }}
      >
        <CartesianGrid />
        <XAxis type="category" dataKey="city" name="City" allowDecimals={false} angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }} />
        <YAxis type="number" dataKey="count" name="Number of events" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default CityEventsChart;