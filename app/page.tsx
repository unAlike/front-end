"use client"

import React, { use, useState, useEffect } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { Register } from './Register.jsx';
import { User } from './User.jsx';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);
  const [lanes, setLanes] = useState({
    1: ["241141"],
    2: ["241146"],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    620: [],
    720: [],
    Available: ["241147", "241148", "241149", "241150"]
  });
  //   1: [{ name: "Ryan", empNum: 241141, startTime: 1300, endTime: 2200, lunchStart: 1800, lunchEnd: 1900 }],
  //   Available: [
  //     { name: "Ryan", empNum: 241146, startTime: 1300, endTime: 2200, lunchStart: 1800, lunchEnd: 1900 },
  //     { name: "Colten", empNum: 241147, startTime: 630, endTime: 1430, lunchStart: 1000, lunchEnd: 1030 },
  //     { name: "Eli", empNum: 241148, startTime: 1300, endTime: 2200, lunchStart: 1800, lunchEnd: 1900 },
  //     { name: "Bob", empNum: 241149, startTime: 1300, endTime: 2200, lunchStart: 1800, lunchEnd: 1900 },
  //     { name: "Maddie", empNum: 241150, startTime: 1300, endTime: 2200, lunchStart: 1800, lunchEnd: 1900 }
  //   ]
  // });
  const [users, setUsers] = useState<any>({
    241141: { name: "Ryan", empNum: 241141, startTime: 1300, endTime: 2200, lunchStart: 1800, lunchEnd: 1900 },
    241146: { name: "Bill", empNum: 241146, startTime: 1300, endTime: 2200, lunchStart: 1800, lunchEnd: 1900 },
    241147: { name: "Colten", empNum: 241147, startTime: 630, endTime: 1430, lunchStart: 1000, lunchEnd: 1030 },
    241148: { name: "Eli", empNum: 241148, startTime: 1300, endTime: 2200, lunchStart: 1800, lunchEnd: 1900 },
    241149: { name: "Bob", empNum: 241149, startTime: 1300, endTime: 2200, lunchStart: 1800, lunchEnd: 1900 },
    241150: { name: "Maddie", empNum: 241150, startTime: 1300, endTime: 2200, lunchStart: 1800, lunchEnd: 1900 }
  });
  const updateLanes = async () => {
    const intervalId = setInterval(() => {
      console.log('Running periodic task...');
      setCount((prev) => prev + 1);
    }, 5000);
    const response = await fetch('/api/lanes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: JSON.stringify(lanes), token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN })
    });
    const { url } = await response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/lanes', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0', 'Pragma': 'no-cache', 'Expires': '0' }
      });
      // console.log("Response: ", response)
      const url = await response.json();
      console.log("Fetched lanes URL: ", url);
      if (url) setLanes(JSON.parse(url))
    }
    fetchData();

  }, []);



  return (
    <DragDropProvider
      onDragOver={(event) => {
        const { source } = event.operation;
        // console.log(source)
        if (source != null && source.type === 'register') return;
        console.log(event)
        setLanes((lanes) => move(lanes, event));
      }}
      onDragEnd={(event) => {
        const { source } = event.operation;
        if (source != null && source.type === 'register') return;
        console.log(event)
        updateLanes();
      }}
    >
      <div className="Root max-w-full">
        {Object.entries(lanes).map(([registerId, lanes], index) => (
          <Register key={registerId} id={registerId} index={index} isOpen={true}>
            {lanes.map != null && lanes.map((user, index) => {
              console.log(user)
              console.log(registerId, users[user])
              return (
                <User
                  key={user}
                  user={users[user]}
                  id={user}
                  index={index}
                  register={registerId}
                />
              )
            })}
          </Register>
        ))}
      </div>
    </DragDropProvider>
  );
}