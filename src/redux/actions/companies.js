import axios from '../../utils/Axios'
import Notifications from '../../utils/Notifications'
const RO = require('../../utils/language/RO.json')

export const getCompanies = (page, rows) => (dispatch) =>
  axios
    .get(`/companies/?page=${page}&rows=${rows}`)
    .then((resp) => ({ ...resp.data }))
    .catch((err) => {
      Notifications.error(RO.notifications.SERVER_ERROR)
      console.error(err)
    })

export const createCompany = (newCompany) => (dispatch) =>
  axios
    .post('/companies', { newCompany })
    .then((resp) => ({ ...resp.data }))
    .catch((err) => {
      console.error(err)
      Notifications.error(RO.notifications.SERVER_ERROR)
    })

export const editCompany = (id, company) => (dispatch) =>
  axios
    .put(`/companies/${id}`, company)
    .then((resp) => ({ ...resp.data }))
    .catch((err) => {
      console.error(err)
      Notifications.error(RO.notifications.SERVER_ERROR)
    })

export const deleteCompany = (id) => (dispatch) =>
  axios
    .delete(`/companies/${id}`)
    .then((resp) => ({ ...resp.data }))
    .catch((err) => {
      Notifications.error(RO.notifications.SERVER_ERROR)
      console.error(err)
    })
