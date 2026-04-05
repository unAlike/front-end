"use client"
import React, { useState } from 'react';
import { CollisionPriority } from '@dnd-kit/abstract';
import { useSortable } from '@dnd-kit/react/sortable';

export function Register({ children, id, index, isOpen }) {
  let hasChildren = () => {
    if (children.length > 0) return true;
    return false;
  }
  const { ref } = useSortable({
    id,
    index,
    type: 'register',
    collisionPriority: CollisionPriority.Lowest,
    disabled: false,
    handle: null,
    accept: ['user']
  });

  const [bgColor, setBgColor] = useState("bg-green-500");


  const changeColor = () => {
    // console.log(isOpen)
    // isOpen = !isOpen;
    // if (isOpen) {
    //   setBgColor("bg-green-500")
    // }
    // else {
    //   setBgColor("bg-red-500")
    // }
  }
    return (
    <div className={`Register ${hasChildren() ? "bg-green-500" : "bg-gray-600"} text-center`}>
    <h1 className='p-1 float-left w-18'>{id}</h1>
      <div className={`Register ${hasChildren() ? "bg-green-500" : "bg-gray-600"} flex flex-wrap justify-start grow m-1 min-h-10`} ref={ref} onClick={changeColor}>
        {children}
      </div>
      </div>
    );

}