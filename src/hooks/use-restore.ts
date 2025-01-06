import { useEffect, useRef } from 'react'

export const useRestore = <T>(key: string, onRestore: (value: T) => void) => {
  const onRestoreRef = useRef(onRestore)
  
  useEffect(() => {
    const restore = localStorage.getItem(key)
    onRestoreRef.current(restore === null ? null : JSON.parse(restore))
  }, [key])

  useEffect(() => {
    onRestoreRef.current = onRestore
  }, [onRestore])

  const save = (value: T | null) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  return save
}