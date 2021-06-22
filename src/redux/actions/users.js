import axios from '../../utils/Axios'
import Notifications from '../../utils/Notifications'
const RO = require('../../utils/language/RO.json')

export const getUsers = (page, rows) => (dispatch) =>
  axios
    .get(`/users/?page=${page}&rows=${rows}`)
    .then((resp) => ({ ...resp.data }))
    .catch((err) => {
      Notifications.error(RO.notifications.SERVER_ERROR)
      console.error(err)
    })

export const createUser = (user) => (dispatch) =>
  axios
    .post('/users', { user })
    .then((resp) => ({ ...resp.data }))
    .catch((err) => {
      console.error(err)
      Notifications.error(RO.notifications.SERVER_ERROR)
    })

export const editUser = (id, user) => (dispatch) =>
  axios
    .put(`/users/${id}`, user)
    .then((resp) => ({ ...resp.data }))
    .catch((err) => {
      console.error(err)
      Notifications.error(RO.notifications.SERVER_ERROR)
    })

export const deleteUser = (id) => (dispatch) =>
  axios
    .delete(`/users/${id}`)
    .then((resp) => ({ ...resp.data }))
    .catch((err) => {
      Notifications.error(RO.notifications.SERVER_ERROR)
      console.error(err)
    })
