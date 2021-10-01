import React from 'react';
import Typography from '../../../components/Typography';
import ItemWrapper from '../../../components/ItemWrapper';
import Services from '../../../components/Services';
import {StyleSheet} from 'react-native';
import Checkpoint from '../../../components/Checkpoint';
import {Chip, useTheme} from 'react-native-paper';
import useStandardData from '../../../hooks/useStandardData';
import StatusWithIcon from '../../../components/StatusWithIcon';
import CommentWithColor from '../../../components/CommentWithColor';
import HeaderText from '../../../components/HeaderText';
interface StandardInformationProps {
  id: string;
  surveyId: string;
}
function StandardInformation({id, surveyId}: StandardInformationProps) {
  const {colors} = useTheme();
  const data = useStandardData(surveyId, id);
  const styles = makeStyles(colors);
  return (
    <>
      <ItemWrapper paddingValue={0} style={styles.head}>
        <HeaderText status={data?.status} style={styles.header}>
          {data?.standardName}
        </HeaderText>
        <StatusWithIcon status={data?.status} />
      </ItemWrapper>
      <Typography size="Body 1" style={styles.hint}>
        {data?.standardNumber}
      </Typography>
      <ItemWrapper paddingValue={[24, 24]}>
        <Typography size="Body 1" numberOfLines={2} ellipsizeMode="tail">
          {data?.standardText}
        </Typography>
      </ItemWrapper>
      <ItemWrapper paddingValue={[0, 26]}>
        <Services services={data?.services} showNumber={4} />
      </ItemWrapper>
      <ItemWrapper paddingValue={0} style={styles.bottomContainer}>
        <Checkpoint checkpoint={data?.checkpoint} style={styles.bottomItem} />
        <Chip>{data?.standardType}</Chip>
      </ItemWrapper>
      {data?.infoForAuditor && (
        <ItemWrapper paddingValue={[32, 0]} title="Additional Info">
          <Typography size="Body 1">{data?.infoForAuditor}</Typography>
        </ItemWrapper>
      )}
      {data?.requiredDocuments && (
        <ItemWrapper paddingValue={[32, 0]} title="Documents Required">
          <Typography size="Body 1">{data?.requiredDocuments}</Typography>
        </ItemWrapper>
      )}
      {data?.overruleComment?.value && (
        <ItemWrapper paddingValue={[32, 0]}>
          <CommentWithColor
            title="Overrule Comment"
            value={data?.overruleComment?.value}
            hint={data?.overruleComment?.overruledHint}
            status={data?.status}
          />
        </ItemWrapper>
      )}
      {data?.attachedComment && (
        <ItemWrapper paddingValue={[32, 0]}>
          <CommentWithColor
            title={`${data?.commentType} comment`}
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
