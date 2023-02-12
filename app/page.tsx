"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
export default function Home() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [time, setTime] = useState(sessionLength * 60);
  //timer in js works with ms
  const [isRunning, setIsRunning] = useState(true);

  const incrementBreak = () => {
    setBreakLength(breakLength + 1);
  };

  const decrementBreak = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const incrementSession = () => {
    setSessionLength(sessionLength + 1);
  };

  const decrementSession = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  };
  // let intervalId: number | null;
  // let setIntervalId: number | null;

  // useEffect(() => {
  //   if (isRunning) {
  //     setIntervalId(
  //       setInterval(() => {
  //         setTime((time) => {
  //           return time - 1;
  //         });
  //       }, 1000)
  //     );
  //   } else if (!isRunning && time !== 0) {
  //     clearInterval(intervalId);
  //   }
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [isRunning, time]);

  const startCounting = () => {
    setIsRunning(true);
  };

  const stopCounting = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setSessionLength(25);
    setBreakLength(5);
  };

  return (
    <main>
      <h1 className="font-bold  px-16  pb-20 text-3xl text-center mt-40 ">
        25 + 5 Clock
      </h1>

      <div className="flex   justify-center   ">
        <div className="flex items-center flex-col">
          <label className="font-bold px-16 text-3xl " id="break-label">
            Break Length
          </label>
          <div className="flex  pt-12 w-full max-w-[200px]">
            <Image
              width={30}
              height={30}
              className="w-30 h-30"
              src="/down.svg"
              alt=""
              onClick={incrementBreak}
            />

            <div className="w-full text-center text-2xl ">{breakLength}</div>
            <Image
              width={30}
              height={30}
              src="/up.svg"
              className="w-30 h-30"
              alt=""
              onClick={decrementBreak}
            />
          </div>
        </div>
        <div>
          <label className="font-bold px-16 text-3xl" id="session-label">
            Session Length
          </label>
          <div className="flex  pt-12 w-full max-w-[200px]">
            <Image
              width={30}
              height={30}
              src="/down.svg"
              alt="up"
              className="w-30 h-30"
              onClick={incrementSession}
            />

            <div className="w-full text-center text-2xl ">{sessionLength}</div>
            <Image
              width={30}
              height={30}
              className="w-30 h-30"
              src="/up.svg"
              alt="down"
              onClick={decrementSession}
            />
          </div>
        </div>
      </div>
      <div
        className="flex flex-row
     justify-center  pt-12 "
      ></div>
      <div className="h-60 w-[500px]  border-4 border-indigo-600 rounded-3xl m-auto flex flex-col items-center justify-center">
        <label className="text-center font-semibold text-3xl">Session</label>
        <span className="text-center font-semibold text-3xl mt-3">{`${sessionLength}:00`}</span>
      </div>
      <div className="flex justify-center pt-12 gap-12">
        <Image
          id="start"
          src="/play.svg"
          alt=""
          width={30}
          height={30}
          onClick={startCounting}
        ></Image>
        <Image
          id="pause"
          src="/pause.svg"
          alt=""
          width={30}
          height={30}
          onClick={startCounting}
        ></Image>
        <Image
          id="reset"
          src="/reset.svg"
          width={30}
          onClick={reset}
          height={30}
          alt=""
        ></Image>
      </div>
    </main>
  );
}
