import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TabletAndroidIcon from '@material-ui/icons/TabletAndroid';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {useHistory} from 'react-router'
import Header from '../common/Header'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '2em'
  },
  title: {
    flexGrow: 1,
  },
  button: {
      marginBottom : '10px'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles()
  const history = useHistory()

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <div className={classes.title}>
            <Header/>
          </div>
          <Button className={classes.button} onClick={() => history.push('/entries')} color="default" variant="contained">
            <ListAltIcon />
                Intrari
          </Button>
          <Button className={classes.button} onClick={() => history.push('/tablet')} color="default" variant="contained">
            <TabletAndroidIcon />
                Tableta
          </Button> 
        </Toolbar>
      </AppBar>
    </div>
  );
}
