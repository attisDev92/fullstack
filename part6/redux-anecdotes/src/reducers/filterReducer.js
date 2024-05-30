
const reducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_FILTER': {
      return action.payload
    }
    default: return state
  }
}

export const filterChange = (filterValue) => {
  return {
    type: 'CHANGE_FILTER',
    payload: filterValue
  }
}

export default reducer