import axios from '../../utils/Axios'
import Notifications from '../../utils/Notifications'
const RO = require('../../utils/language/RO.json')

export const getEntries = (page, rows, startDate, endDate) => (dispatch) =>
  axios
    .get(`/entries/?page=${page}&rows=${rows}&start=${startDate}&end=${endDate}`)
    .then((resp) => ({...resp.data}))
    .catch((err) => {
      Notifications.error(RO.notifications.SERVER_ERROR)
      console.error(err)
    })

export const editEntry = (id, entry) => (dispatch) =>
  axios
    .put(`/entries/${id}`, entry)
    .then((resp) => ({ ...resp.data }))
    .catch((err) => {
      console.error(err)
      Notifications.error(RO.notifications.SERVER_ERROR)
    })

export const deleteEntry = (id) => (dispatch) =>
  axios
    .delete(`/entries/${id}`)
    .then((resp) => ({ ...resp.data }))
    .catch((err) => {
      Notifications.error(RO.notifications.SERVER_ERROR)
      console.error(err)
    })
