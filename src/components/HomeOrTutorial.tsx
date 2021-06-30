import React from 'react'
import * as MyConst from '../static/constants'
import { connect } from '../data/connect'
import { Redirect } from 'react-router'

interface StateProps {
  hasSeenTutorial: boolean
}

const HomeOrTutorial: React.FC<StateProps> = ({ hasSeenTutorial }) => {
  return hasSeenTutorial
   ? <Redirect to={MyConst.HOME} /> 
   : <Redirect to={MyConst.TUTORIAL} />
}

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    hasSeenTutorial: state.user.hasSeenTutorial
  }),
  component: HomeOrTutorial
})