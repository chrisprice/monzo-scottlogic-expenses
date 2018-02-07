import React, { Component } from 'react';
import ms from 'ms';

export default (interval) =>
  (WrappedComponent) => {

    let timer = null;

    return class extends Component {

      constructor(props) {
        super(props);
        this.state = { count: 0 };
      }

      componentDidMount() {
        timer = window.setInterval(
          () => {
            const { count } = this.state;
            this.setState({ count: count + 1 });
          },
          ms(interval)
        );
      }

      componentWillUnmount() {
        window.clearInterval(timer);
      }

      render() {
        return <WrappedComponent
          tick={this.state.count}
          {...this.props}
        />;
      }
    };
  }