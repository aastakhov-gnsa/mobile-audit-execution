import React from 'react';
import {Modal, Portal} from 'react-native-paper';
import {popoverTheme} from '../constants/constants';
import {StyleProp, ViewStyle} from 'react-native';

interface PopoverProps {
  children: React.ReactNode;
  onDismiss: () => void;
  visible: boolean;
  style: StyleProp<ViewStyle>;
}

function Popover({children, onDismiss, visible, style}: PopoverProps) {
  return (
    <Portal>
      <Modal
        theme={popoverTheme}
        visible={visible}
        onDismiss={onDismiss}
        style={style}>
        {children}
      </Modal>
    </Portal>
  );
}

export default React.memo(Popover);
