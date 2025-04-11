
import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

// Create an axios instance with common configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get initial countries with limited fields
export const getCountries = async (page = 1, limit = 20) => {
  try {
    const response = await api.get('/all', {
      params: {
        fields: 'name,flags,region,population,cca3,capital',
      },
    });
    
    // Implement pagination on client side since API doesn't support it
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = response.data.slice(startIndex, endIndex);
    
    return {
      countries: paginatedData,
      hasMore: endIndex < response.data.length,
      total: response.data.length
    };
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

// Search countries by name
export const searchCountriesByName = async (name, fullText = false) => {
  try {
    const response = await api.get(`/name/${name}`, {
      params: {
        fullText: fullText ? 'true' : undefined,
        fields: 'name,flags,region,population,cca3,capital',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return []; // Return empty array for no results
    }
    console.error('Error searching countries:', error);
    throw error;
  }
};

// Filter countries by region
export const filterCountriesByRegion = async (region) => {
  try {
    const response = await api.get(`/region/${region}`, {
      params: {
        fields: 'name,flags,region,population,cca3,capital',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error filtering countries by region:', error);
    throw error;
  }
};

// Filter countries by language
export const filterCountriesByLanguage = async (language) => {
  try {
    const response = await api.get(`/lang/${language}`, {
      params: {
        fields: 'name,flags,region,population,cca3,capital',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error filtering countries by language:', error);
    throw error;
  }
};

// Get detailed information for a specific country
export const getCountryDetails = async (countryCode) => {
  try {
    const response = await api.get(`/alpha/${countryCode}`);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching country details:', error);
    throw error;
  }
};

// Get all available languages for filter dropdown
export const getAllLanguages = async () => {
  try {
    const response = await api.get('/all', {
      params: {
        fields: 'languages',
      },
    });
    
    // Extract and deduplicate all languages
    const languages = new Set();
    response.data.forEach(country => {
      if (country.languages) {
        Object.entries(country.languages).forEach(([code, name]) => {
          languages.add(name);
        });
      }
    });
    
    return Array.from(languages).sort();
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
};

// Get all regions for filter dropdown
export const getAllRegions = async () => {
  try {
    const response = await api.get('/all', {
      params: {
        fields: 'region',
      },
    });
    
    // Extract and deduplicate all regions
    const regions = new Set();
    response.data.forEach(country => {
      if (country.region) {
        regions.add(country.region);
      }
    });
    
    return Array.from(regions).sort();
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
};
