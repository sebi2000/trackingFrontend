import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const configSuccess = {
    position: "bottom-right"
}

const configError = {
    position: "bottom-right"
}

export default {
    success: message => toast.success(message, configSuccess),
    error: message => toast.error(message, configError)
}