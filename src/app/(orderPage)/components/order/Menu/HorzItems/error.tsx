"use client";

import React from "react";
export class ErrorBoundray extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo.componentStack);
  }

  render(): React.ReactNode {
    //@ts-ignore
    if (this.state.hasError) {
      //@ts-ignore
      return this.props.fallback;
    }
    //@ts-ignore
    return this.props.children;
  }
}
