import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

export default class Garage extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      reason: '',
      cleanliness: 'Dusty',
      sort: 'asc',
    }
  }

  componentDidMount() {
    this.props.clearItems()
    this.props.getItems()
  }

  handleSort = () => {
    if (this.state.sort === 'asc') {
      this.setState({ sort: 'desc' })
    } else {
      this.setState({ sort: 'asc' })
    }
  }

  handleSubmit = () => {
    this.resetState()
    this.props.addItem(_.omit(this.state, 'sort'))
  }

  resetState = () => {
    this.setState({
      name: '',
      reason: '',
      cleanliness: 'Dusty',
    })
  }

  updateName = e => {
    this.setState({ name: e.target.value })
  }

  updateReason = e => {
    this.setState({ reason: e.target.value })
  }

  updateCleanliness = e => {
    this.setState({ cleanliness: e.target.value })
  }

  render() {
    let sortedItems = _.orderBy(
      this.props.items,
      [item => item.attributes.name.toLowerCase()],
      [this.state.sort]
    )

    let items = sortedItems
      ? sortedItems.map(item => {
        return (
          <div className='content item' key={item.id}>
            <h1 className='item-name'>
              <Link 
                to={`/item/${item.id}`}
                onClick={(e) => this.props.setActiveItem(item)}
              >
                {item.attributes.name}
              </Link>
            </h1>
          </div>
        )
      })
      : 'No items to display'

    let totalCount = this.props.items.length
    let dustyCount = this.props.items.reduce((acc, curr) => {
      return curr.attributes.cleanliness === 'Dusty' ? acc + 1 : acc
    }, 0)
    let sparklingCount = this.props.items.reduce((acc, curr) => {
      return curr.attributes.cleanliness === 'Sparkling' ? acc + 1 : acc
    }, 0)
    let rancidCount = this.props.items.reduce((acc, curr) => {
      return curr.attributes.cleanliness === 'Rancid' ? acc + 1 : acc
    }, 0)

    return (
      <div>
        <section className='form'>
          <input
            className='input-name'
            type='text'
            placeholder='name'
            value={this.state.name}
            onChange={e => this.updateName(e)}
          />
          <input
            className='input-reason'
            type='text'
            placeholder='reason'
            value={this.state.reason}
            onChange={e => this.updateReason(e)}
          />
          <select
            className='select-cleanliness'
            name='cleanliness'
            onChange={e => this.updateCleanliness(e)}
            value={this.state.cleanliness}
          >
            <option value='Dusty'>Dusty</option>
            <option value='Rancid'>Rancid</option>
            <option value='Sparkling'>Sparkling</option>
          </select>
          <button className='form-submit' onClick={e => this.handleSubmit()}>
            Submit
          </button>
        </section>

        <section className='stats'>
          <div className='total-count'>Total: {totalCount}</div>
          <div className='dusty-count'>Dusty: {dustyCount}</div>
          <div className='sparkling-count'>Sparkling: {sparklingCount}</div>
          <div className='rancid-count'>Rancid: {rancidCount}</div>
          <button className='btn-sort' onClick={e => this.handleSort()}>
            Sort {this.state.sort === 'asc' ? 'desc' : 'asc'}
          </button>
        </section>

        <section className='items-list'>
          {items}
        </section>
      </div>
    )
  }
}
