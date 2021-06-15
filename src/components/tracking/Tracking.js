import react from 'react'
import Navbar from '../common/Navbar'
import AddUserDialog from './AddUserDialog'

function Tracking(props) {
  return (
    <div>
      <Navbar path={props.location.pathname} />
      <AddUserDialog />
    </div>
  )
}

export default Tracking
