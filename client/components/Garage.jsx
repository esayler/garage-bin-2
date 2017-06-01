import React from 'react'

export default class Garage extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      reason: '',
      cleanliness: 'Dusty',
    }
  }

  componentDidMount() {
    this.props.clearItems()
    this.props.getItems()
  }

  handleSubmit = () => {
    this.resetState()
    this.props.addItem(this.state)
  }

  resetState = () => {
    this.setState({
      name: '',
      reason: '',
      cleanliness: 'Dusty',
    })
  }

  updateName = (e) => {
    this.setState({ name: e.target.value })
  }

  updateReason = (e) => {
    this.setState({ reason: e.target.value })
  }

  updateCleanliness = (e) => {
    this.setState({ cleanliness: e.target.value })
  }

  render() {
    let items = this.props.items ? this.props.items.map(item => {
      return (
        <div className='content item'>
          <h1 className='item-id'>{item.id}</h1>
          <h1 className='item-name'>{item.attributes.name}</h1>
          <p className='item-reason'>{item.attributes.reason}</p>
          <p className='item-cleanliness'>{item.attributes.cleanliness}</p>
        </div>
      )
    }) : 'No items to display'

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
          <button
            onClick={e => this.handleSubmit()}
          >
            Submit
          </button>
        </section>

        <section className='items-list'>
          {items}
        </section>
      </div>
    )
  }
}
