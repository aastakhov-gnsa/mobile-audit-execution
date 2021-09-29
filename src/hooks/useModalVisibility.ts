import React from 'react';

export default function useModalVisibility(): [boolean, () => void] {
  const [visible, setVisible] = React.useState(false);
  const handleVisible = React.useCallback(
    () => setVisible(!visible),
    [visible],
  );
  return [visible, handleVisible];
}
