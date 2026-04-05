"use client"
import { useSortable } from '@dnd-kit/react/sortable';
import React, { useState } from 'react';

export function User({ id, index, register, user }) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: 'user',
    accept: 'user',
    group: register
  });
  const [bgColor, setBgColor] = useState("bg-green-700")

  return (
    <button className={`User border-2 pr-3 pl-3 ${bgColor} w-70`} ref={ref} data-dragging={isDragging}>
      <span className='font-bold text-black'>{user.name}</span> {(() => { const t = user.startTime % 1200; return t.toString().slice(0, -2) + ':' + t.toString().slice(-2); })()}{user.startTime >= 1200 ? "PM" : "AM"}-{(() => { const t = user.endTime % 1200; return t.toString().slice(0, -2) + ':' + t.toString().slice(-2); })()}{user.endTime >= 1200 ? "PM" : "AM"}
    </button>
  );
}