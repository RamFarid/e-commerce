import { useEffect, useState } from 'react'

function useLocalStorage(key, pair) {
  const [value, setValue] = useState(() => {
    const prevData = JSON.parse(localStorage.getItem(key))
    if (prevData) return prevData

    return pair
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
