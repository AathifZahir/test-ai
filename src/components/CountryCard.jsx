
import React from 'react';
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  if (!country) return null;

  return (
    <Link 
      to={`/country/${country.cca3}`}
      className="block h-full"
    >
      <div className="bg-card text-card-foreground rounded-lg overflow-hidden hover-scale card-shadow h-full flex flex-col">
        <div className="h-40 overflow-hidden bg-muted">
          <img 
            src={country.flags?.svg || country.flags?.png} 
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{country.name.common}</h3>
          <div className="space-y-1 mt-auto">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Region:</span> {country.region}
            </p>
            {country.capital && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Capital:</span> {country.capital[0]}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Population:</span> {country.population.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
