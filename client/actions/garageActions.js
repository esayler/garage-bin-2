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
      }),
  })
}

const clearItems = () => (dispatch, getState) => {
  return dispatch({
    type: 'REMOVE_ITEMS',
    payload: [],
  })
}

export default { getItems, clearItems }
