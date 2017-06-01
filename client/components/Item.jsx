import React from 'react'

export default class Item extends React.Component {
  constructor() {
    super()
    this.state = {
      cleanliness: '',
    }
  }

  componentDidMount() {
    if (this.props.activeItem) {
      this.setState({ cleanliness: this.props.activeItem.attributes.cleanliness })
    } else {
      this.props.getActiveItem()
    }
  }

  updateCleanliness = e => {
    this.setState({ cleanliness: e.target.value })
    let updatedItem = Object.assign({}, this.props.activeItem, {
      attributes: {
        cleanliness: e.target.value,
        name: this.props.activeItem.attributes.name,
        reason: this.props.activeItem.attributes.reason,
      },
    })
    this.props.updateItem(updatedItem)
  }

  render() {
    let item = this.props.activeItem || {id: '', attributes: { name: '', reason: '', cleanliness: ''}}
    return (
      <div>
        <div className='content item' key={item.id}>
          <h1 className='item-id'>{item.id}</h1>
          <h1 className='item-name'>{item.attributes.name}</h1>
          <p className='item-reason'>{item.attributes.reason}</p>
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
        </div>
      </div>
    )
  }
}
