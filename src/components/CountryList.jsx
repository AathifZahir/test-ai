
import React, { useState, useEffect, useRef, useCallback } from 'react';
import CountryCard from './CountryCard';
import CountryCardSkeleton from './CountryCardSkeleton';
import { getCountries } from '../api/countriesApi';
import LoadingSpinner from './LoadingSpinner';

const CountryList = ({ searchResults, isSearching }) => {
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // Function to load initial or more countries
  const loadCountries = useCallback(async (pageNum = 1) => {
    try {
      setLoading(true);
      const data = await getCountries(pageNum);
      
      if (pageNum === 1) {
        setCountries(data.countries);
      } else {
        setCountries(prev => [...prev, ...data.countries]);
      }
      
      setHasMore(data.hasMore);
    } catch (err) {
      setError('Failed to load countries. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    if (!isSearching) {
      loadCountries(1);
    }
  }, [loadCountries, isSearching]);

  // Set up intersection observer for infinite scrolling
  const lastCountryElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isSearching) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, isSearching]);

  // Load more countries when page changes
  useEffect(() => {
    if (page > 1 && !isSearching) {
      loadCountries(page);
    }
  }, [page, loadCountries, isSearching]);

  // Display search results when available
  const displayedCountries = isSearching ? searchResults : countries;

  if (initialLoading) {
    return (
      <div className="animate-fade-in">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <CountryCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-destructive">
        <p>{error}</p>
        <button 
          onClick={() => loadCountries(1)} 
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (displayedCountries.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-xl font-medium">No countries found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedCountries.map((country, index) => {
          // If this is the last element and we're not searching, attach the ref
          if (index === displayedCountries.length - 1 && !isSearching) {
            return (
              <div key={country.cca3} ref={lastCountryElementRef}>
                <CountryCard country={country} />
              </div>
            );
          }
          return <CountryCard key={country.cca3} country={country} />;
        })}
      </div>
      
      {loading && !initialLoading && (
        <div className="flex justify-center my-8">
          <LoadingSpinner variant="globe" size="lg" />
        </div>
      )}
      
      {!hasMore && !isSearching && countries.length > 0 && (
        <p className="text-center text-muted-foreground my-8">
          You've reached the end of the list
        </p>
      )}
    </div>
  );
};

export default CountryList;
