import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import itemActions from '../actions/itemActions'
import Item from '../components/Item'

const mapStateToProps = (state) => {
  return { activeItem: state.activeItem }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(itemActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)
