import react from 'react'
import Navbar from '../common/Navbar'
import AddUserDialog from '../common/AddUserDialog'

function Tracking(props) {
  return (
    <div>
      <Navbar path={props.location.pathname} />
    </div>
  )
}

export default Tracking
