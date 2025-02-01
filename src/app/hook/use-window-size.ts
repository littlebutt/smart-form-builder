"use client"
import { useEffect, useState } from "react"

export interface WindowSize {
    width: number,
    height: number
}

const useWindowSize: () => WindowSize = () => {

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const getSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    getSize()
    window.addEventListener("resize", getSize)
    return () => {
      window.removeEventListener("resize", getSize)
    }
  }, [])

  return windowSize
}

export default useWindowSize