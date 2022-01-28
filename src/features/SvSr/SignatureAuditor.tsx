import React, {forwardRef, MutableRefObject} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Surface, TextInput} from 'react-native-paper';
import {SignatureViewRef} from 'react-native-signature-canvas';
import {Signature} from '../../components/Signature';
import {useUserName} from '../../hooks/useUserName';

export interface SignatureAuditorProps {
  initialBase64?: string;
  onSignatureBegin: () => void;
  onSignatureEnd: () => void;
  onSignatureCapture: (base64?: string) => void;
}

/**
 * Auditor tab for signature screen
 */
export const SignatureAuditor = forwardRef<
  SignatureViewRef,
  SignatureAuditorProps
>(
  (
    {initialBase64 = '', onSignatureBegin, onSignatureEnd, onSignatureCapture},
    ref,
  ) => {
    const {t} = useTranslation();
    const userName = useUserName();
    const handleClear = () => {
      (ref as MutableRefObject<SignatureViewRef>).current?.clearSignature();
    };
    return (
      <>
        <Surface style={styles.signature}>
          <Signature
            ref={ref}
            initialBase64={initialBase64}
            onBegin={onSignatureBegin}
            onEnd={onSignatureEnd}
            onCapture={onSignatureCapture}
          />
        </Surface>
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            {t(
              'Signing the report is optional and dependes on the policy of your region',
            )}
          </Text>
          <Button icon="refresh" mode="text" onPress={handleClear}>
            {t('Reset Signature')}
          </Button>
        </View>
        <View style={styles.form}>
          <TextInput
            mode="outlined"
            style={styles.name}
            value={userName}
            disabled
          />
        </View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  form: {
    margin: 32,
  },
  signature: {
    marginTop: 32,
    marginRight: 32,
    marginLeft: 32,
    height: 458,
    elevation: 4,
  },
  name: {
    width: 374,
  },
  notice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 32,
    marginLeft: 32,
    marginTop: 32,
  },
  noticeText: {
    width: 509,
  },
});
