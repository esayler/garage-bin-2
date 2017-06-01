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

  handleSubmit = () => {
    this.resetState()
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
        </section>
      </div>
    )
  }
}
