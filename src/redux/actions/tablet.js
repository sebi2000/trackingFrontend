import axios from '../../utils/Axios'
import Notifications from '../../utils/Notifications'
const RO = require('../../utils/language/RO.json')

export const createUser = (entry) => (dispatch) =>
  axios
    .post('/tablet', { entry })
    .then((resp) => ({ ...resp.data }))
    .catch((err) => {
      console.error(err)
      Notifications.error(RO.notifications.SERVER_ERROR)
    })
