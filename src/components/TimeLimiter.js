import React from 'react'
import ProgressBar from './ProgressBar'

export default class TimeLimiter extends React.Component {
  constructor(props) {
    super(props)

    this.callbackFunction = this.props.callbackFunction
    this.state = {
      percentage: 100,
      timeLeft: this.props.totalTimeInSeconds,
      timeTotal: this.props.totalTimeInSeconds
    }

    this.tick = this.tick.bind(this)
    this.stop = this.stop.bind(this)
  }

  componentDidMount() {
    this.setState({intervalId: setInterval(this.tick, 1000)});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  tick() {
    if(this.state.timeLeft <= 0) {
      this.stop()
      return
    }

    const currentTimeLeft = this.state.timeLeft - 1
    const percentage = currentTimeLeft / this.state.timeTotal * 100;

    this.setState({timeLeft: currentTimeLeft, percentage})
  }

  stop() {
    clearInterval(this.state.intervalId);
    this.callbackFunction()
  }

  render() {
    return (
      <ProgressBar percentage={this.state.percentage} />
    )
  }
}
