import { Edit } from 'lucide-react'
import React from 'react'

export default function HistoryList({state}) {
  return (
    <div className="py-5">
        <h2 className="text-xl py-4">Dayly histories</h2>
        <div className="flex flex-col gap-2">
        {state.histories.map((h, i) => (
            <div key={i} className="flex justify-between items-center w-full p-4 bg-white rounded-lg">
                <p className="text-xl font-medium">{h.title}</p>
                <p className="text-sm text-gray-500">duration: {h.duration}</p>
                <p className="text-sm text-gray-500">{h.startedAt} - {h.closedAt}</p>
                <button className="bg-green-500/50 w-12 h-12 rounded-full flex items-center justify-center">
                    <Edit className="text-green-700" />
                </button>
            </div>
        ))}
        </div>
  </div>
  )
}
