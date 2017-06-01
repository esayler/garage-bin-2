const items = (state = [], action) => {
  switch (action.type) {
    case 'APPEND_ITEMS_PENDING':
      return state
    case 'APPEND_ITEMS_FULFILLED':
      return state.concat(action.payload.data)
    case 'APPEND_TRACKS_REJECTED':
      return state
    case 'REMOVE_ITEMS':
      return action.data
    default:
      return state
  }
}

export default items
