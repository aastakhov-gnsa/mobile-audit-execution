import React from 'react';
import {Modal, Portal} from 'react-native-paper';
import {popoverTheme} from '../constants/constants';
import {StyleProp, ViewStyle} from 'react-native';

interface PopoverProps {
  children: React.ReactNode;
  backdrop?: boolean;
  onDismiss?: () => void;
  visible: boolean;
  style?: StyleProp<ViewStyle>;
}

function Popover({
  children,
  onDismiss,
  visible,
  style,
  backdrop,
}: PopoverProps) {
  return (
    <Portal>
      <Modal
        theme={!backdrop ? popoverTheme : undefined}
        visible={visible}
        onDismiss={onDismiss}
        style={style}>
        {children}
      </Modal>
    </Portal>
  );
}

export default React.memo(Popover);
