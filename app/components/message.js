import React from 'react';

export default class Message extends React.Component {
	constructor(props) {
		super(props);
		//initialize message to empty string
		this.state = {message: ''};
		//this is apparently necessary to access class state in onClick callback
		this.addMessage = this.addMessage.bind(this);
	}

	//start timer and call clearMessage function after five seconds
	startTimer() {
		this.timerID = setInterval(
			() => this.clearMessage(),
			5000
		);
	}

	//clear timer
	clearTimer() {
		clearInterval(this.timerID);
	}

	//reset timer and add message to state
	addMessage() {
		this.clearTimer();
		this.setState((prevState) => ({
			message: prevState.message + 'ping '
		}));
		this.startTimer();
	}

	//reset state message to empty string
	clearMessage() {
		this.setState(() => ({
			message: ''
		}));
	}

	//clear timer when component lifecycle ends
	componentWillUnmount() {
		this.clearTimer();
	}

	//return rendered component
	render() {
		return (
			<div>
				<button onClick={this.addMessage}>
					<span>Pong</span>
				</button>
				<p>
					{this.state.message}
				</p>
			</div>
		);
	}

}