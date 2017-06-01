import React from 'react'
import { Provider } from 'react-redux'
import { Route, Link, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import Garage from '../Garage'
import NotFound from '../NotFound'
import Home from '../Home'

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history} >
          <div>
            <Link to='/' className='hello-link'><h1>Garage-Bin-2</h1></Link>

            <nav>
              <Link to='/'>Home</Link>
              <Link to='/garage'>Open</Link>
            </nav>

            <div>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/garage' component={Garage} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}


