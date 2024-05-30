import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(filterChange(e.target.value))
  } 

  return (
    <>
      Filter: <input type="text" onChange={handleChange}/>
    </>
  )
}

export default Filter