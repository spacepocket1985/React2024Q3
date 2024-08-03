"use client"

import { Component, ReactNode } from 'react';  
import Link from 'next/link';  
import { ErrorMessage } from '../errorMessage/ErrorMessage';  

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

  render(): ReactNode {  
    if (this.state.hasError) {  
      return (  
        <>  
          <ErrorMessage errorMsg={this.state.error.toString()} />  
          <h2>ErrorBoundary is working</h2>  
          <Link className="buttonError" href="/">   
            Go back  
          </Link>   
        </>  
      );  
    }  

    return this.props.children;  
  }  
}  

export default ErrorBoundary;