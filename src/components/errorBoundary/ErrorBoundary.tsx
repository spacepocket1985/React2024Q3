import { Component, ReactNode } from 'react';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../../routes/routePaths';

type ErrorBoundaryPropsType = {
  children?: ReactNode;
};

type ErrorBoundarStateType = {
  hasError: boolean;
  error: string;
};

class ErrorBoundary extends Component<
  ErrorBoundaryPropsType,
  ErrorBoundarStateType
> {
  state: ErrorBoundarStateType = {
    hasError: false,
    error: '',
  };

  componentDidCatch(error: Error): void {
    this.setState({
      hasError: true,
      error: error.message,
    });
  }

  render():
    | string
    | number
    | boolean
    | Iterable<ReactNode>
    | JSX.Element
    | null
    | undefined {
    if (this.state.hasError) {
      return (
        <>
          <ErrorMessage errorMsg={this.state.error.toString()} />
          <h2>ErrorBoundary is working</h2>
          <Link className="buttonError" to={RoutePaths.SEARCHPAGE}>
            Go back
          </Link>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
