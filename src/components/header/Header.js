import React from 'react'
import Logo from '../../assets/weSolvvoLogoMotto.jpeg'


function Header(){
    return(
        <header style={headerStyle}>
             <img src={Logo}/>
        </header>
    )
}

const headerStyle={
    textAlign:'center',
    padding:'10px' 
}

export default Header