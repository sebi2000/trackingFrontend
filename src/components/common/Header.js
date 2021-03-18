import React from 'react'
import Logo from '../../assets/weSolvvoLogoMotto.png'


function Header(){
    return(
        <header style={headerStyle}>
             <img src={Logo}/>
        </header>
    )
}

const headerStyle={
    display: 'flex',
    justifyContent: 'center'
}

export default Header