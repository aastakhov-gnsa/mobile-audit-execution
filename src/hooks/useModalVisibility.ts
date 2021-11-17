import React from 'react';

export default function useModalVisibility(
  init: boolean = false,
): [boolean, () => void] {
  const [visible, setVisible] = React.useState(init);
  const handleVisible = React.useCallback(
    () => setVisible(!visible),
    [visible],
  );
  return [visible, handleVisible];
}
