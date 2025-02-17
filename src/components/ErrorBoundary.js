import React, { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state to show fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
                    <h2 className="text-3xl font-bold text-red-500">Something went wrong.</h2>
                    <p className="text-lg mt-2">{this.state.error?.message || "An unexpected error occurred."}</p>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg mt-5 transition"
                        onClick={this.handleReset}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
