import React from 'react';
import {Survey} from '../interfaces/survey';
import {Card, useTheme, ActivityIndicator} from 'react-native-paper';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import Services from './Services';
import StatusWithIcon from './StatusWithIcon';
import {useSurveyQuery} from '../features/Survey/surveyService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ICON_SIZE} from '../constants/constants';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../navigation/navigation';
import ItemWrapper from './ItemWrapper';
import CompanyAddress from './CompanyAddress';
import Typography from './Typography';
import {NavigationParams} from '../interfaces/navigation';
import {useSelector} from '../utils/store/configureStore';
import {SvSr} from '../features/SvSr/SvSr';
import {useTranslation} from 'react-i18next';
import FileLoadingInfo from './FileLoadingInfo';
import Button from './Button';
import {useUploadSurvey} from '../hooks/useUploadSurvey';
import LoadingModal from './LoadingModal';
import SimpleToast from 'react-native-simple-toast';
import NetInfo from '@react-native-community/netinfo';

function SurveyCard({survey}: {survey: Survey}) {
  const {
    id,
    plannedDate,
    companyId,
    outletId,
    legalName,
    outletAddress,
    number,
    resultCd,
    services,
  } = survey;
  const navigation = useNavigation<NavigationParams>();
  const [uploadSurvey, isUploading] = useUploadSurvey(id);
  const [skip, setSkip] = React.useState(true);
  const handleDownload = React.useCallback(() => setSkip(false), []);
  const {isLoading} = useSurveyQuery(id, {skip});
  const data = useSelector(state => state.evaluation[id]);
  const uploadingFiles = useSelector(state =>
    state.fileLoading[id]?.filter(i => i.status === 'uploading'),
  );
  const downloadingFiles = useSelector(state =>
    state.fileLoading[id]?.filter(i => i.status === 'downloading'),
  );
  React.useEffect(() => {
    if (data) {
      setSkip(true);
    }
  }, [data]);
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const [isConnected, setIsConnected] = React.useState(false);
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });
    return () => unsubscribe();
  }, []);
  const createUploadAlert = () =>
    Alert.alert(
      t('Caution: Survey Upload'),
      t(
        'Please make sure that you have a stable internet connection before starting the upload process. If you have a stable internet connection, click OK to start the uploading process.',
      )!,
      [
        {
          text: t('Cancel')!,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('OK')!,
          onPress: () => {
            uploadSurvey();
            SimpleToast.show(
              t(
                'Do not close the application while the upload process is continuing.',
              ),
              SimpleToast.LONG,
            );
          },
        },
      ],
    );
  const createConnectionErrorToast = () => {
    SimpleToast.show(
      t('Please check your internet connection.'),
      SimpleToast.LONG,
    );
  };
  const RightContent = React.useCallback(() => {
    if (
      isLoading ||
      uploadingFiles?.length > 0 ||
      downloadingFiles?.length > 0
    ) {
      return <ActivityIndicator animating={true} color={colors.primary} />;
    }
    if (data) {
      return <StatusWithIcon status={data?.resultCd ?? resultCd} />;
    }
    return (
      <Icon name="download-outline" size={ICON_SIZE} color={colors.backdrop} />
    );
  }, [
    isLoading,
    uploadingFiles?.length,
    downloadingFiles?.length,
    data,
    colors.backdrop,
    colors.primary,
    resultCd,
  ]);
  const handlePress = React.useCallback(() => {
    if (!isUploading && data) {
      navigation.navigate(ScreenNames.StandardList, {id: id});
    }
  }, [isUploading, data, navigation, id]);
  const handleAuditDetailsPress = React.useCallback(
    () => navigation.navigate(ScreenNames.AuditDetails, {id: id}),
    [id, navigation],
  );
  const handleLoadingPopupText = () => {
    if (isUploading) {
      return t('Survey is uploading...');
    } else if (isLoading) {
      return t('Survey is downloading...');
    } else if (uploadingFiles?.length > 0) {
      return t('Files are uploading...');
    } else if (downloadingFiles?.length > 0) {
      return t('Files are downloading...');
    } else {
      return t('Popup error! Please contact us.');
    }
  };
  const {t} = useTranslation();
  return (
    <Card style={styles.card} key={id} onPress={handlePress}>
      <Card.Title
        style={styles.title}
        title={
          <Typography size="Body 1" style={styles.titleText}>
            {data?.number ?? number}
          </Typography>
        }
        subtitle={
          <Typography size="Body 1">{`${t('Planned Date')}: ${
            data?.plannedDate ?? plannedDate
              ? format(
                  parse(
                    data?.plannedDate ?? plannedDate,
                    "yyyy-MM-dd'T'HH:mm:SS",
                    new Date(),
                  ),
                  'dd.MM.yyyy',
                )
              : ''
          }`}</Typography>
        }
        rightStyle={styles.rightContainer}
        right={RightContent}
      />
      <Card.Content>
        <ItemWrapper>
          <CompanyAddress
            companyId={data?.companyId ?? companyId}
            outletId={data?.outletId ?? outletId}
            legalName={data?.legalName ?? legalName}
            outletAddress={data?.outletAddress ?? outletAddress}
          />
        </ItemWrapper>
        <Services services={data?.services ?? services} showNumber={4} />
        {downloadingFiles?.length > 0 && (
          <ItemWrapper title={t('Downloading files')!}>
            <FileLoadingInfo status="downloading" surveyId={id} indeterminate />
          </ItemWrapper>
        )}
        {uploadingFiles?.length > 0 && (
          <ItemWrapper title={t('Uploading files')!}>
            <FileLoadingInfo status="uploading" surveyId={id} />
          </ItemWrapper>
        )}
      </Card.Content>
      <Card.Actions style={styles.actionsContainer}>
        <ScrollView style={styles.actionsLeft} horizontal={true}>
          {data && (
            <Button
              icon="information-outline"
              onPress={handleAuditDetailsPress}>
              {t('Audit Details')}
            </Button>
          )}
          {data &&
            (downloadingFiles?.length < 1 ||
              typeof downloadingFiles === 'undefined') && <SvSr data={data} />}
          {isLoading && (
            <Typography size="Button" style={styles.hint}>
              {t('Downloading survey').toUpperCase()}...
            </Typography>
          )}
          {!data &&
            !isLoading &&
            (uploadingFiles?.length < 1 ||
              typeof uploadingFiles === 'undefined') && (
              <Button
                onPress={() =>
                  isConnected ? handleDownload() : createConnectionErrorToast()
                }>
                {t('Download')}
              </Button>
            )}
          {data && !isLoading && (
            <>
              {isUploading && (
                <Typography size="Button" style={styles.hint}>
                  {t('Uploading survey').toUpperCase()}...
                </Typography>
              )}
              {!isUploading &&
                (downloadingFiles?.length < 1 ||
                  typeof downloadingFiles === 'undefined') && (
                  <Button
                    onPress={() =>
                      isConnected
                        ? createUploadAlert()
                        : createConnectionErrorToast()
                    }>
                    {t('upload')}
                  </Button>
                )}
            </>
          )}
        </ScrollView>
      </Card.Actions>
      <LoadingModal
        title={handleLoadingPopupText()}
        visible={isUploading || isLoading || downloadingFiles?.length > 0}
      />
    </Card>
  );
}

export default React.memo(SurveyCard);

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    title: {
      alignItems: 'flex-start',
      paddingTop: 16,
    },
    titleText: {
      fontFamily: 'Roboto-Medium',
    },
    rightContainer: {
      paddingRight: 16,
    },
    actionsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    actionsLeft: {
      display: 'flex',
      flexDirection: 'row',
    },
    nameContainer: {
      marginTop: 16,
      marginBottom: 16,
    },
    card: {
      borderWidth: 1,
      borderColor: colors.onBackground20,
      marginBottom: '2%',
    },
    hint: {
      color: colors.text50,
    },
  });
