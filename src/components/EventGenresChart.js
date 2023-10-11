import { ResponsiveContainer, PieChart, Pie, Legend } from "recharts";
import { useState, useEffect } from 'react';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const getData = () => {
    const data = genres.map((genre) => {
      const filteredEvents = events.filter((event) => event.summary.includes(genre));   
      
      return {
        name: genre, 
        value: filteredEvents.length 
      };
    })
    return data;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;

    const fontSize = 11; // setting the font size

    return percent ? (
      <text
        x={x}
        y={y}
        fill="#2E2EFF"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };


  return (   
    <ResponsiveContainer width="99%" height={400}>
      <PieChart
          margin={{
          // top: 20,
          // right: 20,
          // bottom: 60,
          left: 30,
        }}
      >
        <Pie 
          dataKey="value" 
          data={data} 
          fill="#2E2EFF" // #8884d8 
          labelLine={false}
          label = {renderCustomizedLabel}
          outerRadius={100}          
        />
      </PieChart>
    </ResponsiveContainer>    
  );
};

export default EventGenresChart;