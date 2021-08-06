import React, {Dispatch, SetStateAction} from 'react';

export default function useFetch<T>(url: string) {
  const [data, setData]: [T, Dispatch<SetStateAction<T>>] = React.useState(
    null as unknown as T,
  );
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const f = async () => {
      try {
        const res = await fetch(url, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error('fetch error', e);
        setError(e);
      }
    };
    f();
  }, [url]);
  return {data, error};
}
