import { useState } from "react"

export const useField = (type = "text", initialValue = '' ) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  return {
    inputProperties :{
      type,
      value,
      onChange,
    },
    reset
  }
}