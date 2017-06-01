const items = (state = [], action) => {
  switch (action.type) {
    case 'GET_ITEMS_PENDING':
      return state
    case 'GET_ITEMS_FULFILLED':
      return state.concat(action.payload.data)
    case 'GET_ITEMS_REJECTED':
      return state
    case 'REMOVE_ITEMS':
      return action.payload
    case 'ADD_ITEM_FULFILLED':
      return state.concat(action.payload.data)
    default:
      return state
  }
}

export default items
