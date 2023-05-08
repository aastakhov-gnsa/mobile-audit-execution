import React from 'react';
import {Dimensions, ScaledSize} from 'react-native';

/**
 * whether tablet orientation is portrait
 */
export default function useOrientation(): [boolean] {
  const [dimensions, setDimensions] = React.useState({
    window: Dimensions.get('window'),
  });
  React.useEffect(() => {
    const handler = ({window}: {window: ScaledSize}) => {
      setDimensions({window});
    };
    const subscription = Dimensions.addEventListener('change', handler);
    return () => subscription?.remove();
  }, []);
  return React.useMemo(
    () => [dimensions.window.height > dimensions.window.width],
    [dimensions.window.height, dimensions.window.width],
  );
}
