'use client'

import React, { useState } from 'react';

export default function Register(params:any){
    const [isOpen,setIsOpen] = useState(true);
    let bgColor = '';

    if(isOpen){
        bgColor='bg-green-500';
    }
    else {
        bgColor = 'bg-gray-500';
    }

    const changeReg = () =>{
        setIsOpen(!isOpen);
    }
    

    return(
        <a className={`flex p-2 m-2 ${bgColor}`} onClick={changeReg}>
            <h1>{params.regNum}</h1>
        </a>
    )
}