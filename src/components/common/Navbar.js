import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import TabletAndroidIcon from '@material-ui/icons/TabletAndroid'
import ListAltIcon from '@material-ui/icons/ListAlt'
import { useHistory } from 'react-router'
import Header from '../common/Header'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/index'
import ConfirmationDialog from '../common/ConfirmDialog'
import BusinessIcon from '@material-ui/icons/Business'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import PeopleIcon from '@material-ui/icons/People'
import { createLog } from '../../redux/actions/index'
const RO = require('../../utils/language/RO.json')

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '2em',
    width: '100%',
  },
  title: {
    flexGrow: 1,
  },
  button: {
    marginBottom: '10px',
    backgroundColor: 'inherit',
    '&:hover': {
      backgroundColor: '#DADADA',
    },
  },
  selectedButton: {
    marginBottom: '10px',
    backgroundColor: '#DADADA',
    '&:hover': {
      backgroundColor: '#DADADA',
    },
  },
  powerIcon: {
    color: 'black',
  },
  tabletIcon: {
    fontSize: '1rem',
    marginRight: '5%',
  },
  entriesIcon: {
    fontSize: '1.2rem',
    marginRight: '5%',
  },
  companyIcon: {
    fontSize: '1.2rem',
    marginRight: '5%',
  },
  registerIcon: {
    fontSize: '1.2rem',
    marginRight: '5%',
  },
}))

function Navbar(props) {
  const classes = useStyles()
  const history = useHistory()

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <div className={classes.title}>
            <Header />
          </div>

          {props.user.role === 'user' ? (
            <div>
              <Button
                className={
                  props.path === '/entries'
                    ? classes.selectedButton
                    : classes.button
                }
                onClick={() => history.push('/entries')}
                color="inherit"
              >
                <ListAltIcon className={classes.entriesIcon} />
                {RO.entriesNav}
              </Button>
              <Button
                className={
                  props.path === '/tablet'
                    ? classes.selectedButton
                    : classes.button
                }
                onClick={() => history.push('/tablet')}
                color="inherit"
              >
                <TabletAndroidIcon className={classes.tabletIcon} />
                {RO.tablet}
              </Button>
            </div>
          ) : props.user.role === 'super' ? (
            <div>
              <Button
                className={
                  props.path === '/entries'
                    ? classes.selectedButton
                    : classes.button
                }
                onClick={() => history.push('/entries')}
                color="inherit"
              >
                <ListAltIcon className={classes.entriesIcon} />
                {RO.entriesNav}
              </Button>
              <Button
                className={
                  props.path === '/tracking'
                    ? classes.selectedButton
                    : classes.button
                }
                onClick={() => history.push('/tracking')}
                color="inherit"
              >
                <TrendingUpIcon className={classes.registerIcon} />
                {RO.trackingNav}
              </Button>
              <Button
                className={
                  props.path === '/companies'
                    ? classes.selectedButton
                    : classes.button
                }
                onClick={() => history.push('/companies')}
                color="inherit"
              >
                <BusinessIcon className={classes.companyIcon} />
                {RO.companiesNav}
              </Button>
              <Button
                className={
                  props.path === '/users'
                    ? classes.selectedButton
                    : classes.button
                }
                onClick={() => history.push('/users')}
                color="inherit"
              >
                <PeopleIcon className={classes.companyIcon} />
                {RO.usersNav}
              </Button>
            </div>
          ) : null}
          <ConfirmationDialog
            type="logout"
            onLogOutButton={() => {
              props.logout()
              props.createLog(
                props.user.name,
                props.user.surname,
                RO.tracking.logout,
                RO.tracking.usersTable
              )
            }}
          />
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    createLog: (name, surname, action, table) =>
      dispatch(createLog(name, surname, action, table)),
  }
}
const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
