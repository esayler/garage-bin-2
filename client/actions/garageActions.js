import { checkStatus, parseJSON } from '../../utils/fetchUtils'

const getItems = () => (dispatch, getState) => {
  return dispatch({
    type: 'GET_ITEMS',
    payload: fetch('/api/v1/items')
      .then(checkStatus)
      .then(parseJSON)
      .then(payload => {
        console.log(payload)
        return payload
      })
      .catch(error => {
        console.log(error)
      }),
  })
}

const clearItems = () => (dispatch, getState) => {
  return dispatch({
    type: 'REMOVE_ITEMS',
    payload: [],
  })
}

const addItem = (data) => (dispatch, getState) => {
  const { name, reason, cleanliness } = data
  return dispatch({
    type: 'ADD_ITEM',
    payload: fetch('/api/v1/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        reason,
        cleanliness,
      }),
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(payload => {
      return payload
    })
    .catch(error => {
      console.log(error)
    }),
  })
}

export default { getItems, clearItems, addItem }
