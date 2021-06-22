import axios from '../../utils/Axios'
import Notifications from '../../utils/Notifications'
const RO = require('../../utils/language/RO.json')

export const checkToken = (TOKEN) => (dispatch) =>
  axios
    .get(`reset/${TOKEN}`)
    .then((resp) => resp.data)
    .catch((err) => {
      console.error(err)
      Notifications.error(RO.notifications.SERVER_ERROR)
    })

export const updatePassword = (ID, password) => (dispatch) =>
  axios
    .put(`/reset/${ID}`, { password })
    .then((resp) => resp.data)
    .catch((err) => {
      console.error(err)
      Notifications.error(RO.notifications.SERVER_ERROR)
    })

export const sendEmail = (email) => (dispatch) =>
  axios
    .post(`/reset`, { email })
    .then((resp) => resp.data)
    .catch((err) => {
      console.error(err)
      Notifications.error(RO.notifications.SERVER_ERROR)
    })
