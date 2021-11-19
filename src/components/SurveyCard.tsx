import React from 'react';
import {Survey} from '../interfaces/survey';
import {Card, Button, useTheme, ActivityIndicator} from 'react-native-paper';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import {StyleSheet, View} from 'react-native';
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
import UploadSurvey from './UploadSurvey';
import {SvSr} from '../features/SvSr/SvSr';
import {useTranslation} from 'react-i18next';
import FileLoadingInfo from './FileLoadingInfo';

function SurveyCard({survey}: {survey: Survey}) {
  const {
    id,
    plannedDate,
    companyId,
    outletAddress,
    number,
    resultCd,
    services,
  } = survey;
  const navigation = useNavigation<NavigationParams>();
  const [skip, setSkip] = React.useState(true);
  const handleDownload = React.useCallback(() => setSkip(!skip), [skip]);
  const {isLoading} = useSurveyQuery(id, {skip});
  const data = useSelector(state => state.evaluation[id]);
  const uploadingFiles = useSelector(state =>
    state.fileLoading[id]?.filter(i => i.status === 'uploading'),
  );
  const downloadingFiles = useSelector(state =>
    state.fileLoading[id]?.filter(i => i.status === 'downloading'),
  );
  React.useEffect(() => {
    if (!data) {
      setSkip(true);
    }
  }, [data]);
  const {colors} = useTheme();
  const styles = makeStyles(colors);
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
      <Icon name="download-outline" size={ICON_SIZE} color={colors.text50} />
    );
  }, [
    isLoading,
    uploadingFiles?.length,
    downloadingFiles?.length,
    data,
    colors.text50,
    colors.primary,
    resultCd,
  ]);
  const handlePress = React.useCallback(() => {
    if (data) {
      navigation.navigate(ScreenNames.StandardList, {id: id});
    }
  }, [id, data, navigation]);
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
            outletAddress={data?.outletAddress ?? outletAddress}
          />
        </ItemWrapper>
        <Services services={data?.services ?? services} showNumber={4} />
        {downloadingFiles?.length > 0 && (
          <ItemWrapper title={t('Downloading files')}>
            <FileLoadingInfo status="downloading" surveyId={id} indeterminate />
          </ItemWrapper>
        )}
        {uploadingFiles?.length > 0 && (
          <ItemWrapper title={t('Uploading files')}>
            <FileLoadingInfo status="uploading" surveyId={id} />
          </ItemWrapper>
        )}
      </Card.Content>
      <Card.Actions style={styles.actionsContainer}>
        <View style={styles.actionsLeft}>
          {data && (
            <Button
              icon="information-outline"
              onPress={() =>
                navigation.navigate(ScreenNames.AuditDetails, {id: id})
              }>
              {t('Audit Details')}
            </Button>
          )}
          {data && <SvSr data={data} />}
        </View>
        {isLoading && (
          <Typography size="Button" style={styles.hint}>
            {t('Downloading survey').toUpperCase()}...
          </Typography>
        )}
        {!data && !isLoading && (
          <Button onPress={handleDownload}>{t('Download')}</Button>
        )}
        {data && !isLoading && <UploadSurvey id={id} />}
      </Card.Actions>
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
