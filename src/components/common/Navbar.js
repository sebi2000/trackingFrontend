import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TabletAndroidIcon from '@material-ui/icons/TabletAndroid';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {useHistory} from 'react-router'
import Header from '../common/Header'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import axios from '../../utils/Axios'
import {connect} from 'react-redux'
import {logout} from '../../redux/actions/index'
import ConfirmationDialog from '../common/ConfirmDialog'
const RO = require('../../utils/language/RO.json')

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '2em'
  },
  title: {
    flexGrow: 1,
  },
  button: {
      marginBottom : '10px',
      backgroundColor: 'inherit',
      '&:hover': {
        backgroundColor: '#DADADA',
     }
  },
  selectedButton:{
      marginBottom : '10px',
      backgroundColor: '#DADADA',
      '&:hover': {
        backgroundColor: '#DADADA',
     }
  },
  powerIcon: {
    color: 'black'
  },
  tabletIcon: {
    fontSize: '1rem',
    marginRight: '5%'
  },
  entriesIcon: {
    fontSize: '1.2rem',
    marginRight: '5%'
  }
}));

function Navbar(props) {
  const classes = useStyles()
  const history = useHistory()

  const onLogOutButton = () => {
    axios.get('/logout').then(response => {
      props.logout()
      history.push('/') 
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <div className={classes.title}>
            <Header/>
          </div>
          {props.showTabletButton ?
          <div>
          <Button className={props.path === '/entries' ? classes.selectedButton : classes.button} onClick={() => history.push('/entries')} color="inherit">
            <ListAltIcon className={classes.entriesIcon}/>
                {RO.entriesNav}
          </Button>
          <Button className={props.path === '/tablet' ? classes.selectedButton : classes.button} onClick={() => history.push('/tablet')} color="inherit">
            <TabletAndroidIcon className={classes.tabletIcon}/>
                {RO.tablet}
          </Button>
          </div> : null

          }
          {
            props.showLogoutButton ?
            <ConfirmationDialog type='logout' onLogOutButton={onLogOutButton}/> : null
            
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Navbar)
