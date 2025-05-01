import { saveHistoryToServer } from "./saveHistoryToServer";

export const formatTime = (state) => {
    const { hours, minutes, seconds, milliseconds } = state.time;
    const pad = (n) => String(n).padStart(2, "0")
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(Math.floor(milliseconds / 10))}`
}
  
export const getDuration = (start, end) => {
    const diff = end.getTime() - start.getTime()
    const mins = Math.floor(diff / 60000)
    const secs = Math.floor((diff % 60000) / 1000)
    return `${mins}m ${secs}s`
}
  
export const saveHistory = async (title, state, setState ) => {    
    if (!state.startTime || !state.endTime) return

    const newHistory = {
      title,
      duration: getDuration(state.startTime, state.endTime),
      startedAt: state.startTime.toLocaleTimeString(),
      closedAt: state.endTime.toLocaleTimeString()
    }

    setState(prev => ({
      ...prev,
      histories: [...prev.histories, newHistory],
      showModal: false,
      customTitle: "",
      time: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }
    }))
    saveHistoryToServer(newHistory)
}

export const cancelHistory = (setState) => {
    setState(prev => ({
      ...prev,
      showModal: false,
      customTitle: "",
      time: { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }
    }))
}

export const handleVariantClick = (variant, state, setState) => {
    saveHistory(variant, state, setState)
}

export const toggleTimer = (setState, startTimer, stopTimer) => {
    setState(prev => {
      if (prev.isTimerRunning) {
        stopTimer()
      } else {
        startTimer()
      }
      return { ...prev, isTimerRunning: !prev.isTimerRunning }
    })
  }