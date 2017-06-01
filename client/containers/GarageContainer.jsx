import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import garageActions from '../actions/garageActions'
import Garage from '../components/Garage'

const mapStateToProps = (state) => {
  return { items: state.items }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(garageActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Garage)
