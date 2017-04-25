import React from 'react';
import ReactDOM from 'react-dom';

class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state = {message: ''};
		this.handleClick = this.handleClick.bind(this);
	}

	clearTimer() {
		clearInterval(this.timerID);
	}

	startTimer() {
		this.timerID = setInterval(
			() => this.clearMessage(),
			5000
		);
	}

	handleClick() {
		this.clearTimer();
		this.setState((prevState) => ({
			message: prevState.message + ' ping'
		}));
		this.startTimer();
	}

	clearMessage() {
		this.setState(() => ({
			message: ''
		}));
	}

	componentDidMount() {
		this.startTimer();
	}

	componentDidUnmount() {
		this.clearTimer();
	}

	render() {
		return (
			<div>
				<button onClick={this.handleClick}>
					<span>Pong</span>
				</button>
				<p>
					{this.state.message}
				</p>
			</div>
		);
	}

}

function App() {
	return <Message />;
}

ReactDOM.render(<App />, document.getElementById('root'));