import React, {forwardRef, MutableRefObject} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Surface, Switch, TextInput} from 'react-native-paper';
import {SignatureViewRef} from 'react-native-signature-canvas';
import {Signature} from '../../components/Signature';
import Typography from '../../components/Typography';

export interface SignaturePartnerProps {
  initialBase64?: string;
  email: string;
  onEmailChange: (value: string) => void;
  sendToMe: boolean;
  onSendToMeChange: (value: boolean) => void;
  partner: string;
  onPartnerChange: (value: string) => void;
  onSignatureBegin: () => void;
  onSignatureEnd: () => void;
  onSignatureCapture: (base64?: string) => void;
}

/**
 * Partner tab for signature screen
 */
export const SignaturePartner = forwardRef<
  SignatureViewRef,
  SignaturePartnerProps
>(
  (
    {
      initialBase64 = '',
      email,
      onEmailChange,
      sendToMe,
      onSendToMeChange,
      partner,
      onPartnerChange,
      onSignatureBegin,
      onSignatureEnd,
      onSignatureCapture,
    },
    ref,
  ) => {
    const {t} = useTranslation();
    const handleClear = () => {
      (ref as MutableRefObject<SignatureViewRef>).current?.clearSignature();
    };
    return (
      <>
        <Surface style={styles.signature}>
          <Signature
            initialBase64={initialBase64}
            ref={ref}
            onBegin={onSignatureBegin}
            onEnd={onSignatureEnd}
            onCapture={onSignatureCapture}
          />
        </Surface>
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            {t(
              "By signing the Survey Status Report I acknowledge that I have received the Survey Status Report and take notice of the results of today's audit",
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
            placeholder="Partner's name"
            value={partner}
            onChangeText={onPartnerChange}
          />
          <Typography size="Body 1" style={styles.sendLabel}>
            {t('Send the report')}
          </Typography>
          <TextInput
            keyboardType="email-address"
            mode="outlined"
            placeholder={t('Enter e-mail or several, split by comma')}
            value={email}
            onChangeText={onEmailChange}
          />
          <View style={styles.copy}>
            <Typography size="Subtitle 1">
              {t('Send a copy of the report to me')}
            </Typography>
            <Switch
              style={styles.switch}
              value={sendToMe}
              onValueChange={onSendToMeChange}
            />
          </View>
        </View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  sendLabel: {
    fontFamily: 'Roboto-Medium',
    marginTop: 35,
  },
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
  copy: {
    marginTop: 32,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  switch: {
    marginLeft: 12,
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
