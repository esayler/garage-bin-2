import { checkStatus, parseJSON } from '../../utils/fetchUtils'

const updateItem = (data) => (dispatch, getState) => {
  const { attributes, id } = data
  return dispatch({
    type: 'UPDATE_ITEM',
    payload: fetch(`/api/v1/items/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cleanliness: attributes.cleanliness,
        name: attributes.name,
        reason: attributes.reason,
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

const getActiveItem = (id) => (dispatch, getState) => {
  const { router } = getState()
  const id = router.location.pathname.match(/(?!\/item\/)\d+/)[0]
  console.log('id: ', id)
  return dispatch({
    type: 'GET_ACTIVE_ITEM',
    payload: fetch(`/api/v1/items/${id}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(payload => {
        return dispatch({
          type: 'SET_ACTIVE_ITEM',
          payload: payload.data[0],
        })
      })
      .catch(error => {
        console.log(error)
      }),
  })
}


export default { updateItem, getActiveItem }
