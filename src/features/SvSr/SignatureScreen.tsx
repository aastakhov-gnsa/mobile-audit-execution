import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {SignatureViewRef} from 'react-native-signature-canvas';
import {NavigationParams} from '../../interfaces/navigation';
import {useTranslation} from 'react-i18next';
import {SignaturePartner} from './SignaturePartner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SignatureAuditor} from './SignatureAuditor';
import {useUploadSvSR} from './useUploadSvSR';

export function SignatureScreen() {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const partnerSignatureRef = useRef<SignatureViewRef>(null);
  const auditorSignatureRef = useRef<SignatureViewRef>(null);
  const [person, setPerson] = useState('partner');
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const navigation = useNavigation<NavigationParams>();
  const [email, setEmail] = useState('');
  const [sendToMe, setSendToMe] = useState(false);
  const [partner, setPartner] = useState('');
  const {t} = useTranslation();
  const [partnerBase64, setPartnerBase64] = useState<string | undefined>('');
  const [auditorBase64, setAuditorBase64] = useState<string | undefined>('');
  const [requestedTab, setRequestedTab] = useState('');
  const [requested, setRequested] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [uploadSvSR] = useUploadSvSR(
    {email, sendToMe, partner},
    () => {
      setRequested(true);
      setRequestedTab('');
    },
    () => {
      setRequested(false);
    },
  );
  const handleCancel = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    partnerSignatureRef.current?.readSignature();
    auditorSignatureRef.current?.readSignature();
    setRequestedTab('finish');
  };

  const handleSignTouchStart = useCallback(() => {
    setScrollEnabled(false);
  }, []);

  const handleSignTouchEnd = useCallback(() => {
    setScrollEnabled(true);
  }, []);

  const validateEmail = (val: string | any) => {
    const regexp =
      /^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,4}\s*?,?\s*?)+$/;
    setEmailError(val.length > 0 ? !regexp.test(email) : false);
  };
  return (
    <KeyboardAwareScrollView
      scrollEnabled={scrollEnabled}
      enableAutomaticScroll
      style={styles.keyboardContainer}
      contentContainerStyle={styles.container}>
      <View style={styles.tabs}>
        <Button
          pointerEvents={
            person === 'partner' || requestedTab === 'auditor' ? 'none' : 'auto'
          }
          loading={requestedTab === 'auditor'}
          color={person === 'partner' ? colors.primary : colors.disabled}
          style={person === 'partner' ? styles.selectedTab : styles.tab}
          mode="text"
          onPress={() => {
            setRequestedTab('partner');
            auditorSignatureRef.current?.readSignature();
          }}>
          {t('Partner')}
        </Button>
        <Button
          pointerEvents={
            person === 'auditor' || requestedTab === 'partner' ? 'none' : 'auto'
          }
          loading={requestedTab === 'partner'}
          color={person === 'auditor' ? colors.primary : colors.disabled}
          style={person === 'auditor' ? styles.selectedTab : styles.tab}
          mode="text"
          onPress={() => {
            setRequestedTab('auditor');
            partnerSignatureRef.current?.readSignature();
          }}>
          {t('Auditor')}
        </Button>
      </View>
      <ScrollView style={styles.content} scrollEnabled={scrollEnabled}>
        {person === 'partner' && (
          <SignaturePartner
            initialBase64={partnerBase64}
            email={email}
            ref={partnerSignatureRef}
            onEmailChange={val => {
              validateEmail(val);
              setEmail(val);
            }}
            sendToMe={sendToMe}
            onSendToMeChange={setSendToMe}
            partner={partner}
            onPartnerChange={setPartner}
            onSignatureBegin={handleSignTouchStart}
            onSignatureEnd={handleSignTouchEnd}
            onSignatureCapture={val => {
              setPartnerBase64(val);
              if (requestedTab === 'finish') {
                uploadSvSR(val!);
              } else {
                setPerson(requestedTab);
              }
              setRequestedTab('');
            }}
            emailError={emailError}
          />
        )}
        {person === 'auditor' && (
          <SignatureAuditor
            initialBase64={auditorBase64}
            ref={auditorSignatureRef}
            onSignatureBegin={handleSignTouchStart}
            onSignatureEnd={handleSignTouchEnd}
            onSignatureCapture={val => {
              setAuditorBase64(val);
              if (requestedTab === 'finish') {
                uploadSvSR(partnerBase64!);
              } else {
                setPerson(requestedTab);
              }
              setRequestedTab('');
            }}
          />
        )}
      </ScrollView>
      <View style={styles.actionsContainer}>
        <View style={styles.actions}>
          <Button mode="text" onPress={handleCancel}>
            {t('cancel')}
          </Button>
          <Button
            mode="contained"
            onPress={handleNext}
            loading={requested}
            disabled={!(!requested && !emailError)}>
            {t('Save and Upload')}
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    keyboardContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    content: {
      flex: 1,
    },
    tabs: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      borderBottomWidth: 2,
      borderTopWidth: 2,
      height: 60,
      borderColor: 'rgb(239, 239, 239)',
      paddingBottom: 2,
    },
    actionsContainer: {
      paddingTop: 16,
      paddingBottom: 16,
      backgroundColor: 'white',
      borderTopColor: 'rgb(239, 239, 239)',
      borderTopWidth: 2,
      flexGrow: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    actions: {
      display: 'flex',
      height: 'auto',
      flexDirection: 'row',
      paddingRight: 24,
    },
    tab: {
      borderBottomColor: 'transparent',
      borderBottomWidth: 2,
      color: colors.onBackground50,
    },
    selectedTab: {
      borderBottomColor: colors.primary,
      borderBottomWidth: 2,
      color: colors.disabled,
    },
  });
