import axios from '../../utils/Axios'
import Notifications from '../../utils/Notifications'
const RO = require('../../utils/language/RO.json')

export const createLog = (name, surname, action, table) => (dispatch) => {
  let tracking = {
    name: name,
    surname: surname,
    action: action,
    table: table,
    date: new Date(),
  }
  axios
    .post(`/tracking`, { tracking })
    .then((resp) => {
      if (!resp.data.tracking)
        Notifications.error(RO.notifications.LOG_ERROR_CREATION)
    })
    .catch((err) => {
      console.error(err)
      Notifications.error(RO.notifications.SERVER_ERROR)
    })
}
