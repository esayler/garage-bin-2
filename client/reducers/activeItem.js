const activeItem = (state = null, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_ITEM':
      return action.payload
    default:
      return state
  }
}

export default activeItem
