import React, { createContext, useContext, useState } from "react";
import type { SearchContextType, SearchParams } from "@/types";

/**
 * Search Context
 * Manages search parameters across the application
 */
const SearchContext = createContext<SearchContextType | undefined>(undefined);

const defaultSearchParams: SearchParams = {
  destination: "",
  checkin: "",
  checkout: "",
  guests: 2,
};

/**
 * Search Provider Component
 * Wraps the app and provides search state management
 */
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchParams, setSearchParams] =
    useState<SearchParams>(defaultSearchParams);

  /**
   * Update search parameters (partial update)
   */
  const updateSearch = (params: Partial<SearchParams>) => {
    setSearchParams((prev) => ({ ...prev, ...params }));
  };

  /**
   * Clear all search parameters
   */
  const clearSearch = () => {
    setSearchParams(defaultSearchParams);
  };

  const value: SearchContextType = {
    searchParams,
    updateSearch,
    clearSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

/**
 * Custom hook to use search context
 * Must be used within SearchProvider
 */
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
