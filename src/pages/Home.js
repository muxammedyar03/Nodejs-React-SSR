import { PauseIcon, PlayIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import {formatTime, toggleTimer } from "../utils/timerUtils"
import HistoryList from "../components/historyList"
import Modal from "../components/modal"

export const Home = () => {
  const [state, setState] = useState({
    isTimerRunning: false,
    time: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
    startTime: null,
    endTime: null,
    histories: [],
    showModal: false,
    customTitle: ""
  })

  const timerRef = useRef(null)

  const startTimer = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setState(prev => {
        let { hours, minutes, seconds, milliseconds } = prev.time;
        milliseconds += 10;

        if (milliseconds >= 1000) {
          milliseconds = 0;
          seconds += 1;
        }

        if (seconds >= 60) {
          seconds = 0;
          minutes += 1;
        }

        if (minutes >= 60) {
          minutes = 0;
          hours += 1;
        }

        return {
          ...prev,
          time: { hours, minutes, seconds, milliseconds }
        }
      })
    }, 10)

    setState(prev => ({ ...prev, startTime: new Date() }))
  }

  const stopTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = null
    setState(prev => ({
      ...prev,
      endTime: new Date(),
      showModal: true
    }))
  }

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current)
    }
  }, [])

  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-100 text-zinc-700">
      <h1 className="text-3xl font-bold">Welcome to Smart Timer app!</h1>

      <div className="flex py-5 items-center gap-5">
        <div className="flex-1 h-full flex flex-col gap-5">
          <div className="flex justify-between items-center w-full p-4 bg-white rounded-lg">
            <div className="text-xl font-medium">{formatTime(state)}</div>
            <div>
              <button
                className="bg-green-500/50 w-12 h-12 rounded-full flex items-center justify-center"
                onClick={() => toggleTimer(setState, startTimer, stopTimer)}
              >
                {state.isTimerRunning ? (
                  <PauseIcon className="fill-green-700 text-green-700" />
                ) : (
                  <PlayIcon className="fill-green-700 text-green-700" />
                )}
              </button>
            </div>
          </div>

          <HistoryList state={state} />
        </div>

        <div className="flex-1 h-full bg-green-500">1</div>
      </div>

      {/* Modal */}
      <Modal state={state} setState={setState} />
    </div>
  )
}
