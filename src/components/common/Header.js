import React from 'react'
import Logo from '../../assets/weSolvvoLogoMotto.png'


function Header(){
    return(
        <header style={headerStyle}>
             <img src={Logo} style={imgStyle}/>
        </header>
    )
}
const imgStyle={
    width:'150px'
}
const headerStyle={
    display: 'flex',
    justifyContent: 'left'
   
}

export default Header