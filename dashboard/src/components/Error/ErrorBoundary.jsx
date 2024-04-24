import PropTypes from 'prop-types';
import { Component } from "react";
import './error-boundary.css';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static propTypes = {
        children: PropTypes.node.isRequired, // Ensure children prop is provided
        fallback: PropTypes.node // Fallback UI
    };


    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error) {
        this.setState({ errorMessage: error.message }); // Set error message in state
        console.error('Error caught by error boundary:', error); // Optionally log error
    }


    render() {
        if (this.state.hasError) {
            // If a custom fallback is provided, render it
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Otherwise, render a default fallback UI
            return (
                <div className='error-boundary-default'>
                    <h2>Oho, jokin meni vikaan.</h2>
                    <code>{this.state.errorMessage}</code>
                </div>
            );
        }
        return this.props.children;
    }
}