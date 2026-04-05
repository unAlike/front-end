"use client"

import React, { use, useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { Register } from './Register.jsx';
import { User } from './User.jsx';
import './styles.css';

export default function App() {
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
  const [users, setUsers] = useState({
    241141: { name: "Ryan", empNum: 241141, startTime: 1300, endTime: 2200, lunchStart: 1800, lunchEnd: 1900 },
    241146: { name: "Bill", empNum: 241146, startTime: 1300, endTime: 2200, lunchStart: 1800, lunchEnd: 1900 },
    241147: { name: "Colten", empNum: 241147, startTime: 630, endTime: 1430, lunchStart: 1000, lunchEnd: 1030 },
    241148: { name: "Eli", empNum: 241148, startTime: 1300, endTime: 2200, lunchStart: 1800, lunchEnd: 1900 },
    241149: { name: "Bob", empNum: 241149, startTime: 1300, endTime: 2200, lunchStart: 1800, lunchEnd: 1900 },
    241150: { name: "Maddie", empNum: 241150, startTime: 1300, endTime: 2200, lunchStart: 1800, lunchEnd: 1900 }
  });



  return (
    <DragDropProvider
      onDragOver={(event) => {
        const { source } = event.operation;
        // console.log(source)
        if (source != null && source.type === 'register') return;
        console.log(event)
        setLanes((lanes) => move(lanes, event));
      }}
    >
      <div className="Root">
        {Object.entries(lanes).map(([registerId, lanes], index) => (
          <Register key={registerId} id={registerId} index={index} isOpen={true}>
            {lanes.map((user, index) => {
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