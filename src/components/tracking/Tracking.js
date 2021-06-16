import React from 'react'
import Navbar from '../common/Navbar'

function Tracking(props) {
  return (
    <div>
      <Navbar path={props.location.pathname} />
    </div>
  )
}

export default Tracking
