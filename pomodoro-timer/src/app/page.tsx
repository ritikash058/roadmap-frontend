"use client"
import { useState, useEffect, useRef } from 'react';

const SESSION_TYPES = {
  WORK: 'Work',
  SHORT_BREAK: 'Short Break',
  LONG_BREAK: 'Long Break'
};

const DEFAULT_CONFIG = {
  work: 25 * 60, 
  shortBreak: 5 * 60, 
  longBreak: 15 * 60 
};

export default function Home() {
  const [time, setTime] = useState(DEFAULT_CONFIG.work);
  const [sessionType, setSessionType] = useState(SESSION_TYPES.WORK);
  const [isRunning, setIsRunning] = useState(false);
  const [workSessions, setWorkSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 0) {
            playSound();
            handleSessionEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  const handleStart = () => {
    if (!isRunning) {
      setTime(getInitialTime());
    }
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setIsPaused(false);
    setTime(getInitialTime());
    setSessionType(SESSION_TYPES.WORK);
    setWorkSessions(0);
  };

  const handleSessionEnd = () => {
    if (sessionType === SESSION_TYPES.WORK) {
      setWorkSessions(prev => prev + 1);
      if (workSessions >= 4) {
        setSessionType(SESSION_TYPES.LONG_BREAK);
        setWorkSessions(0);
      } else {
        setSessionType(SESSION_TYPES.SHORT_BREAK);
      }
    } else {
      setSessionType(SESSION_TYPES.WORK);
    }
    setTime(getInitialTime());
  };

  const getInitialTime = () => {
    switch (sessionType) {
      case SESSION_TYPES.WORK:
        return DEFAULT_CONFIG.work;
      case SESSION_TYPES.SHORT_BREAK:
        return DEFAULT_CONFIG.shortBreak;
      case SESSION_TYPES.LONG_BREAK:
        return DEFAULT_CONFIG.longBreak;
      default:
        return DEFAULT_CONFIG.work;
    }
  };

  const playSound = () => {
    const audio = new Audio('/notification.wav');
    audio.play().catch(error => console.error('Error playing sound:', error));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Pomodoro Timer</h1>
        
        <div className="text-6xl font-bold text-center mb-6">{formatTime(time)}</div>
        
        <div className="text-2xl font-semibold text-center mb-8">{sessionType}</div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={handleStart}
            disabled={isRunning || isPaused}
            className="bg-green-200 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
          >
            Start
          </button>
          <button
            onClick={handlePause}
            disabled={!isRunning || isPaused}
            className="bg-yellow-200 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
          >
            Pause
          </button>
          <button
            onClick={handleResume}
            disabled={!isRunning || !isPaused}
            className="bg-blue-200 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
          >
            Resume
          </button>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handleReset}
            className="bg-red-200 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Reset
          </button>
        </div>

        <div className="text-center text-gray-600 dark:text-gray-400">
          Work Sessions: {workSessions}
        </div>
      </div>
    </div>
  );
}
