import { Component } from 'react';

import { EmptyPropsType } from '../../types';

type ErrorButtonStateType = {
  hasError: boolean;
};

export class ErrorButton extends Component<
  EmptyPropsType,
  ErrorButtonStateType
> {
  constructor(props: EmptyPropsType) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  onClickError = (): void => {
    this.setState({ hasError: true });
  };
  render() {
    if (this.state.hasError) {
      throw new Error('Ooppps! We have some problems!');
    }
    return <button className='buttonError' onClick={this.onClickError}>Get an Error</button>;
  }
}
