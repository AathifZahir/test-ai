
import React, { useState } from 'react';
import CountryList from '../components/CountryList';
import SearchBar from '../components/SearchBar';
import FilterControls from '../components/FilterControls';
import Logo from '../components/Logo';
import ThemeSelector from '../components/ThemeSelector';

const Index = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filterResults, setFilterResults] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // Determine which results to display
  const displayResults = isSearching ? searchResults : isFiltering ? filterResults : [];
  const isCustomResults = isSearching || isFiltering;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background z-10 backdrop-blur-sm bg-opacity-90">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Logo size="md" />
          <ThemeSelector />
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Explore the World's Countries
          </h1>
          <div className="bg-card rounded-lg shadow-md p-6 mb-8">
            <SearchBar 
              onSearchResults={setSearchResults} 
              onSearching={setIsSearching}
            />
            
            <FilterControls 
              onFilterResults={setFilterResults}
              onFiltering={setIsFiltering}
            />
          </div>
        </div>
        
        <CountryList 
          searchResults={displayResults}
          isSearching={isCustomResults}
        />
      </main>
      
      <footer className="mt-auto py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Globe Wanderer &copy; {new Date().getFullYear()} | Data from REST Countries API</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
