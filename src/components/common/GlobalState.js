import React from 'react';

class state {
	constructor() {
		this.state = {};
		this.subscriptions = [];
	}

	subscribe(cb) {
		this.subscriptions.push(cb);
		return this.subscriptions.lastIndexOf(cb);
	}

	unsubscribe(handle) {
		delete this.subscriptions[handle];
	}

	setState(obj, cb) {
		this.state =  Object.assign({}, this.state, obj);
		this.subscriptions.forEach((cb) => {
			if(cb) {
				cb();
			}
		})
		if(cb){
			cb();
		}
	}
}

const globState = new state();

const gs = (Component) => {
	  return class GlobalState extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				state: globState.state //{}
			}
		}

		componentDidMount() {
			this.subsHandle = globState.subscribe(this.handleChange.bind(this));
		}

		componentWillUnmount() {
			globState.unsubscribe(this.subsHandle);
		}

		handleChange() {
			this.setState({ state: globState.state });
		}

		render() {
    	return <Component {...this.props} state={this.state.state} setState={globState.setState.bind(globState)} />
    }
  }
}

export {gs};
