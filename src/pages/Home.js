import { Edit, PauseIcon, PlayIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { cancelHistory, formatTime, handleVariantClick, saveHistory, toggleTimer } from "../utils/timerUtils"

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

          <div className="py-5">
            <h2 className="text-xl py-4">Dayly histories</h2>
            <div className="flex flex-col gap-2">
              {state.histories.map((h, i) => (
                <div key={i} className="flex justify-between items-center w-full p-4 bg-white rounded-lg">
                  <div className="text-xl font-medium">{h.title}</div>
                  <div className="text-sm text-gray-500">duration: {h.duration}</div>
                  <div className="text-sm text-gray-500">{h.startedAt} - {h.closedAt}</div>
                  <button className="bg-green-500/50 w-12 h-12 rounded-full flex items-center justify-center">
                    <Edit className="text-green-700" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 h-full bg-green-500">1</div>
      </div>

      {/* Modal */}
      {state.showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="bg-white p-5 rounded-lg w-[300px]">
            <h2 className="text-xl mb-3">Enter Title</h2>
            <input
              type="text"
              value={state.customTitle}
              onChange={(e) =>
                setState(prev => ({ ...prev, customTitle: e.target.value }))
              }
              className="border p-2 w-full mb-3"
              placeholder="Custom title"
            />
            <div className="flex gap-2 mb-3">
              {["Lunch", "Work", "Break"].map((v) => (
                <button
                  key={v}
                  className="bg-gray-200 px-3 py-1 rounded"
                  onClick={() => handleVariantClick(v, state, setState)}
                >
                  {v}
                </button>
              ))}
            </div>
            <button
              className="bg-green-500 text-white w-full py-2 rounded"
              onClick={() => saveHistory(state.customTitle || "Untitled", state, setState)}
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white w-full py-2 rounded mt-2"
              onClick={() => cancelHistory(setState)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
