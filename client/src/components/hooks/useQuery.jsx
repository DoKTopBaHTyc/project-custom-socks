import React, { useEffect, useState } from 'react';

export default function useQuery(queryFunction, initialData) {
  const [data, setData] = useState(initialData ?? null);

  useEffect(() => {
    queryFunction().then(setData);
  }, []);
  return [data, setData];
}
