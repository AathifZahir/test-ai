
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryDetails } from '../api/countriesApi';
import LoadingSpinner from '../components/LoadingSpinner';
import Logo from '../components/Logo';
import ThemeSelector from '../components/ThemeSelector';
import { ArrowLeft, Globe, Users, Flag, MapPin, Languages, Coins, Clock } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

const CountryDetailSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
    <div>
      <Skeleton className="aspect-video w-full rounded-lg" />
    </div>
    <div className="space-y-6">
      <div>
        <Skeleton className="h-10 w-2/3 mb-2" />
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Skeleton className="h-8 w-40 mb-3" />
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-5/6" />
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-40 mb-3" />
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CountryDetail = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        const data = await getCountryDetails(countryCode);
        setCountry(data);
      } catch (err) {
        console.error('Error fetching country details:', err);
        setError('Failed to load country details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryCode]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border sticky top-0 bg-background z-10 backdrop-blur-sm bg-opacity-90">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Logo size="md" />
          <ThemeSelector />
        </div>
      </header>

      <div className="container mx-auto py-8 px-4 flex-grow">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Countries
          </Link>
        </div>

        {loading ? (
          <CountryDetailSkeleton />
        ) : error || !country ? (
          <div className="text-center p-8">
            <h2 className="text-2xl font-semibold mb-4">Error</h2>
            <p className="text-muted-foreground mb-8">{error || 'Country not found'}</p>
            <Link
              to="/"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Back to Countries
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="aspect-video overflow-hidden rounded-lg shadow-md bg-muted relative group">
                <img 
                  src={country.flags?.svg || country.flags?.png} 
                  alt={`Flag of ${country.name.common}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div>
                <h1 className="text-3xl font-bold mb-2">{country.name.common}</h1>
                <p className="text-lg text-muted-foreground">
                  {country.name.official}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <Globe className="mr-2 h-5 w-5 text-primary" />
                    Basic Info
                  </h2>
                  <ul className="space-y-3">
                    {country.capital && (
                      <li className="flex items-start">
                        <MapPin className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Capital:</span>
                          <span className="ml-1">{country.capital.join(', ')}</span>
                        </div>
                      </li>
                    )}
                    <li className="flex items-start">
                      <Flag className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Region:</span>
                        <span className="ml-1">{country.region}</span>
                        {country.subregion && <span className="ml-1">({country.subregion})</span>}
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Users className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Population:</span>
                        <span className="ml-1">{country.population.toLocaleString()}</span>
                      </div>
                    </li>
                    {country.area && (
                      <li className="flex items-start">
                        <MapPin className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Area:</span>
                          <span className="ml-1">{country.area.toLocaleString()} km²</span>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <Flag className="mr-2 h-5 w-5 text-primary" />
                    Details
                  </h2>
                  <ul className="space-y-3">
                    {country.languages && Object.keys(country.languages).length > 0 && (
                      <li className="flex items-start">
                        <Languages className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Languages:</span>
                          <span className="ml-1">{Object.values(country.languages).join(', ')}</span>
                        </div>
                      </li>
                    )}
                    {country.currencies && Object.keys(country.currencies).length > 0 && (
                      <li className="flex items-start">
                        <Coins className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Currencies:</span>
                          <span className="ml-1">
                            {Object.values(country.currencies)
                              .map(currency => `${currency.name} (${currency.symbol || ''})`)
                              .join(', ')}
                          </span>
                        </div>
                      </li>
                    )}
                    {country.timezones && (
                      <li className="flex items-start">
                        <Clock className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Timezones:</span>
                          <span className="ml-1">
                            {country.timezones.slice(0, 3).join(', ')}
                            {country.timezones.length > 3 && ` +${country.timezones.length - 3} more`}
                          </span>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {country.borders && country.borders.length > 0 && (
                <div className="pt-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <h2 className="text-xl font-semibold mb-3">Bordering Countries</h2>
                  <div className="flex flex-wrap gap-2">
                    {country.borders.map(border => (
                      <Link
                        key={border}
                        to={`/country/${border}`}
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm hover:bg-secondary/80 hover:scale-105 transition-all duration-200"
                      >
                        {border}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <footer className="mt-auto py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Globe Wanderer &copy; {new Date().getFullYear()} | Data from REST Countries API</p>
        </div>
      </footer>
    </div>
  );
};

export default CountryDetail;
