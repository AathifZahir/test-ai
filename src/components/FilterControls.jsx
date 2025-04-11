
import React, { useState, useEffect } from 'react';
import { getAllRegions, filterCountriesByRegion, filterCountriesByLanguage, getAllLanguages } from '../api/countriesApi';

const FilterControls = ({ onFilterResults, onFiltering }) => {
  const [regions, setRegions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load regions and languages on component mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [regionsData, languagesData] = await Promise.all([
          getAllRegions(),
          getAllLanguages()
        ]);
        
        setRegions(regionsData);
        setLanguages(languagesData);
      } catch (err) {
        console.error('Error loading filter options:', err);
        setError('Failed to load filter options');
      }
    };
    
    loadFilterOptions();
  }, []);

  const handleRegionChange = async (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    
    if (!region) {
      // If clearing the region filter and no language filter
      if (!selectedLanguage) {
        onFilterResults([]);
        onFiltering(false);
        return;
      }
    }
    
    try {
      setIsLoading(true);
      setError(null);
      onFiltering(true);
      
      const results = await filterCountriesByRegion(region);
      onFilterResults(results);
    } catch (err) {
      setError('Error applying region filter');
      onFilterResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = async (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    
    if (!language) {
      // If clearing the language filter and no region filter
      if (!selectedRegion) {
        onFilterResults([]);
        onFiltering(false);
        return;
      }
    }
    
    try {
      setIsLoading(true);
      setError(null);
      onFiltering(true);
      
      const results = await filterCountriesByLanguage(language);
      onFilterResults(results);
    } catch (err) {
      setError('Error applying language filter');
      onFilterResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilters = () => {
    setSelectedRegion('');
    setSelectedLanguage('');
    setError(null);
    onFilterResults([]);
    onFiltering(false);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="region-filter" className="block text-sm font-medium mb-1">
            Filter by Region
          </label>
          <select
            id="region-filter"
            value={selectedRegion}
            onChange={handleRegionChange}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label htmlFor="language-filter" className="block text-sm font-medium mb-1">
            Filter by Language
          </label>
          <select
            id="language-filter"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">All Languages</option>
            {languages.map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={clearFilters}
            disabled={!selectedRegion && !selectedLanguage}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 disabled:opacity-50"
          >
            Clear Filters
          </button>
        </div>
      </div>
      
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      {isLoading && <p className="mt-2 text-sm text-muted-foreground">Applying filters...</p>}
    </div>
  );
};

export default FilterControls;
