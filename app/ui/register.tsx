'use client'

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { NextApiHandler } from "next";

import { DragDropProvider, useDraggable, useDroppable } from '@dnd-kit/react';
import { Droppable } from './Droppable';

import User from './user';


export default function Register(params: any) {
    const [test, settest] = useState<any>({});
    const registerNumber = params.regNum;
    const [isOpen, setIsOpen] = useState(true);
    const [checker, setChecker] = useState("");
    const [bagger, setBagger] = useState("");
    let bgColor = '';
    console.log(usePathname())

    if (isOpen) {
        bgColor = 'bg-green-500';
    }
    else {
        bgColor = 'bg-gray-500';
    }

    useEffect(() => {
        const res = fetch(`/data/RegisterData.json`)
            .then((res) => res.json())
            .then((data) => {
                if (data != "{}") {
                    if (isOpen) {
                        setChecker(data[registerNumber]["checker"]);
                        setBagger(data[registerNumber]["bagger"]);
                    }
                    else {
                        setChecker("");
                        setBagger("");
                    }
                }
            })
    });






    const toggleReg = () => {
        setIsOpen(!isOpen);
    }


    return (
        <DragDropProvider>
            <div className={`flex p-1 m-2 ${bgColor} justify-evenly`}>
                <div className='border-2 border-black m-1 h-9' onClick={toggleReg}>
                    <h1 className='w-10 text-center'>{params.regNum}</h1>
                </div>


                {/* <Droppable> */}
                    <div className='border-2 border-black m-1 grow'>
                        <User name={checker}></User>
                    </div>
                {/* </Droppable> */}


                <div className='border-2 border-black m-1 grow'>
                    <User name={bagger}></User>
                </div>

            </div>
        </DragDropProvider>
    )
}