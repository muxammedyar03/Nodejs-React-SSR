import React from 'react'
import { cancelHistory, handleVariantClick, saveHistory } from '../utils/timerUtils'

export default function Modal({state, setState}) {
  return (
    <>
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
    </>
  )
}
