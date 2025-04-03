import useQuery from '../components/hooks/useQuery';
import PatternService from '../api/patternService';
import { createContext, useContext, useState } from 'react';

const PatternContext = createContext();

export const usePatternContext = () => {
  const context = useContext(PatternContext);
  if (context === undefined) {
    throw new Error('usePatternContext must be used within a PatternContextProvider');
  }
  return context;
};

export const PatternContextProvider = ({ children }) => {
  const [patterns, setPatterns] = useQuery(() => PatternService.getAllPatterns(), []);
  const [selectedPattern, setSelectedPattern] = useState(null);

  const selectPattern = (pattern) => {
    console.log('Выбран паттерн в контексте:', pattern);
    setSelectedPattern(pattern);
  };

  const loading = patterns === null || !Array.isArray(patterns) || patterns.length === 0;

  return (
    <PatternContext.Provider
      value={{
        patterns: Array.isArray(patterns) ? patterns : [],
        selectedPattern,
        selectPattern,
        loading,
      }}
    >
      {children}
    </PatternContext.Provider>
  );
};
