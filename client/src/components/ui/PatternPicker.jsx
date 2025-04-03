import React from 'react';
import { usePatternContext } from '../../context/PatternContext';
import PatternButton from './PatternButton';

export default function PatternPicker() {
  const { patterns, selectPattern, loading } = usePatternContext();

  // const handlePatternSelect = (pattern) => {
  //   console.log('Выбран паттерн в пикере:', pattern);
  //   selectPattern(pattern);
  // };
  console.log('Паттерны:', patterns);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
      {loading ? (
        <p>Загрузка паттернов...</p>
      ) : Array.isArray(patterns) ? (
        patterns.map((pattern, index) => (
          <PatternButton
            key={index}
            pattern={pattern}
            onClick={() => selectPattern(pattern)}
            size={40}
          />
        ))
      ) : (
        <p>Нет доступных паттернов</p>
      )}
    </div>
  );
}
