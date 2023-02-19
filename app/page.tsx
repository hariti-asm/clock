"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
export default function Home() {
  const [breakLength, setBreakLength] = useState(0.1);
  const [breakTime, setBreakTime] = useState(breakLength * 60);
  const [sessionLength, setSessionLength] = useState(0.1);
  const [time, setTime] = useState(sessionLength * 60);
  //timer in js works with ms
  const [isRunning, setIsRunning] = useState(true);

  const incrementBreak = () => {
    if (!isRunning) {
      const newLength = Math.min(breakTime + 1, 60);
      setBreakLength(newLength);
    }
  };

  const decrementBreak = () => {
    if (!isRunning && breakTime > 1) {
      setBreakLength(breakTime - 1);
    }
  };

  const incrementSession = () => {
    if (!isRunning) {
      const newLength = Math.min(sessionLength + 1, 60);
      setSessionLength(newLength);
    }
  };

  const decrementSession = () => {
    if (!isRunning && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  };

  useEffect(() => {
    // if the timer is not running, nothing to do here
    if (!isRunning || isBreak) return;

    let intervalId = setInterval(() => {
      if (time == 0) {
        const audio = new Audio(
          "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        );
        clearInterval(intervalId);
        setIsBreak(true);
        audio.play();
      } else {
        setTime((time) => {
          return time - 1;
        });
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    isRunning,
    // time dependency is needed for the audio to play
    time,
  ]);

  const startCounting = () => {
    console.log("startCounting");
    setIsRunning(true);
  };

  const stopCounting = () => {
    console.log("stopCounting");
    setIsRunning(false);
  };

  const reset = () => {
    console.log("reset");
    setSessionLength(25);
    setBreakTime(5);
    setTime(25 * 60);
    setIsRunning(false);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const [isBreak, setIsBreak] = useState(false);

  const BreakD = () => {
    setBreakTime((prevLength) => prevLength - 1);
  };

  useEffect(() => {
    if (isBreak && isRunning) {
      if (breakTime <= 0) {
        setIsBreak(false);
        setIsRunning(false);
        return;
      }

      const breakTimer = setInterval(BreakD, 1000);
      return () => clearInterval(breakTimer);
    }
  }, [isBreak, breakTime]);
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
        {time == 0 ? (
          <React.Fragment>
            <label className="text-center text-red-600 font-semibold text-3xl">
              Break
            </label>
            <span
              className="text-center  text-red-600 font-semibold text-3xl mt-3"
              id="time-left"
            >{`${formatTime(breakTime)}`}</span>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <label className="text-center font-semibold text-3xl">
              Session
            </label>
            <span
              className="text-center font-semibold text-3xl mt-3"
              id="time-left"
            >{`${formatTime(time)}`}</span>
          </React.Fragment>
        )}
      </div>
      <div className="flex justify-center pt-12 gap-12">
        <Image
          id="pause"
          src="/pause.svg"
          alt=""
          width={30}
          height={30}
          onClick={stopCounting}
        ></Image>
        <Image
          id="play"
          src="/play.svg"
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
      <h1 className="text-xl text-center text-red-600">
        Designed and Coded by
      </h1>
      <h1 className=" text-white italic text-center text-xl ">Hariti asmae</h1>
    </main>
  );
}
