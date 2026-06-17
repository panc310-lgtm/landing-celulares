"use client";

import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { MarketingCharacterGLB } from "./MarketingCharacterGLB";
import { MarketingCharacterHybrid2D } from "./MarketingCharacterHybrid2D";

type CharacterErrorBoundaryProps = {
  children: ReactNode;
};

type CharacterErrorBoundaryState = {
  hasError: boolean;
};

class CharacterErrorBoundary extends Component<
  CharacterErrorBoundaryProps,
  CharacterErrorBoundaryState
> {
  state: CharacterErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Marketing GLB character failed, using 2.5D fallback.", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return <MarketingCharacterHybrid2D />;
    }

    return this.props.children;
  }
}

export function MarketingCharacter() {
  return (
    <CharacterErrorBoundary>
      <MarketingCharacterGLB />
    </CharacterErrorBoundary>
  );
}
