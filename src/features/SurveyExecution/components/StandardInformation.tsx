import React, { useCallback, useState } from 'react';
import Typography from '../../../components/Typography';
import ItemWrapper from '../../../components/ItemWrapper';
import Services from '../../../components/Services';
import {StyleSheet, Text} from 'react-native';
import Checkpoint from '../../../components/Checkpoint';
import {Chip, useTheme} from 'react-native-paper';
import useStandardData from '../../../hooks/useStandardData';
import StatusWithIcon from '../../../components/StatusWithIcon';
import CommentWithColor from '../../../components/CommentWithColor';
import HeaderText from '../../../components/HeaderText';
import useCurrentLanguage from '../../../hooks/useCurrentLanguage';
import {useTranslation} from 'react-i18next';
import FilesPanel from '../../../components/FilesPanel';

interface StandardInformationProps {
  id: string;
  surveyId: string;
}

function StandardInformation({id, surveyId}: StandardInformationProps) {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore,setLengthMore] = useState(false);
  const toggleNumberOfLines = () => {
      setTextShown(!textShown);
  }
  const onTextLayout = useCallback(e =>{
      setLengthMore(e.nativeEvent.lines.length >=2);
  },[]);
  const {colors} = useTheme();
  const data = useStandardData(surveyId, id);
  const [langCode, needTranslation] = useCurrentLanguage();
  const styles = makeStyles(colors);
  const {t} = useTranslation();
  return (
    <>
      <ItemWrapper paddingValue={0} style={styles.head}>
        <HeaderText status={data?.status} style={styles.header}>
          {needTranslation && data?.nameTranslations?.[langCode]
            ? data?.nameTranslations?.[langCode]
            : data?.standardName}
        </HeaderText>
        <StatusWithIcon status={data?.status} />
      </ItemWrapper>
      <Typography size="Body 1" style={styles.hint}>
        {data?.standardNumber}
      </Typography>
      <ItemWrapper paddingValue={[24, 24]}>
        <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 2}
              style={{lineHeight: 21,
                      fontSize: 16,
                      fontFamily: "Roboto-Regular"}}>
                      {needTranslation && data?.textTranslations?.[langCode]
                      ? data?.textTranslations?.[langCode]
                      : data?.standardText}</Text>
              {
                  lengthMore ? <Text
                  onPress={toggleNumberOfLines}
                  style={{ color: 'blue', lineHeight: 21, marginTop: 10 }}>
                    {textShown ? t('Read less...') : t('Read more...')}</Text>
                    :null
              }
      </ItemWrapper>
      <ItemWrapper paddingValue={[0, 26]}>
        <Services services={data?.services} showNumber={4} />
      </ItemWrapper>
      <ItemWrapper paddingValue={0} style={styles.bottomContainer}>
        {!!data?.checkpoint && (
          <Checkpoint
            checkpoint={t(data.checkpoint)}
            style={styles.bottomItem}
          />
        )}
        {!!data?.standardType && <Chip>{t(data.standardType)}</Chip>}
      </ItemWrapper>
      {!!data?.infoForAuditor?.length && (
        <ItemWrapper paddingValue={[32, 0]} title={t('Additional Info')}>
          <Typography size="Body 1">{data?.infoForAuditor}</Typography>
        </ItemWrapper>
      )}
      {!!data?.requiredDocuments?.length && (
        <ItemWrapper paddingValue={[32, 0]} title={t('Documents Required')}>
          <Typography size="Body 1">{data?.requiredDocuments}</Typography>
        </ItemWrapper>
      )}
      {!!data?.files?.length && (
        <ItemWrapper paddingValue={[32, 0]} title="Files">
          <FilesPanel
            files={data.files}
            surveyId={surveyId}
            standardId={data.id}
          />
        </ItemWrapper>
      )}
      {data?.overruleComment?.value && (
        <ItemWrapper paddingValue={[32, 0]}>
          <CommentWithColor
            title={t('Overrule Comment')}
            value={data?.overruleComment?.value}
            hint={data?.overruleComment?.overruledHint}
            status={data?.status}
          />
        </ItemWrapper>
      )}
      {data?.attachedComment && (
        <ItemWrapper paddingValue={[32, 0]}>
          <CommentWithColor
            title={`${t(
              data.commentType! === 'External'
                ? 'External Comment'
                : 'Internal Comment',
            )}`}
            value={data?.attachedComment}
          />
        </ItemWrapper>
      )}
    </>
  );
}

export default React.memo(StandardInformation);

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    head: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    hint: {
      marginTop: 4,
      color: colors.text50,
    },
    header: {
      width: '75%',
    },
    bottomContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bottomItem: {
      marginRight: 20,
    },
  });
