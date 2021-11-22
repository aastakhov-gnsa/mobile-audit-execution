import React, {forwardRef } from 'react'
import CanvasSignature, {SignatureViewRef} from 'react-native-signature-canvas';

/**
 * Android Studio emulator does not always support hardware acceleration and might crash when enabled
 */
const useHardwareAcceleration = __DEV__ ? false : true;

export interface SignatureProps {
    initialBase64?: string
    onBegin?: () => void
    onEnd?: () => void
    onCapture?: (base64sign?: string) => void
}

export const Signature = forwardRef<SignatureViewRef, SignatureProps>(({
    initialBase64 = '', onBegin, onEnd, onCapture
}, ref) => {
    
    return <CanvasSignature
        ref={ref}
        dataURL={initialBase64}
        webStyle={webStyle}
        androidHardwareAccelerationDisabled={!useHardwareAcceleration}
        descriptionText=""
        backgroundColor="white"
        minWidth={3}
        onOK={onCapture}
        onEmpty={onCapture}
        onBegin={onBegin}
        onEnd={onEnd}
    />
})

/**
 * By default `react-native-signature-canvas` thinks it's on a separate dedicated screen
 *
 * These styles make it suitable for embedding to an existing screen 
 */
const webStyle = `.m-signature-pad--footer
    .save {
        display: none;
    }
    .clear {
        display: none;
    }
    .m-signature-pad {
        box-shadow: none; border: none;
        margin-left: 0px;
        margin-top: 0px;
      } 
       .m-signature-pad--body
        canvas {
          background-color: #E5E5F1;
        }
      .m-signature-pad--body {border: none}
      .m-signature-pad--footer {display: none; margin: 0px;}
      body,html {
         width: 100%; 
         height: 100%;
      }
`;
