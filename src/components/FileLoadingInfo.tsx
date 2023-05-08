import React from 'react';
import {ProgressBar} from 'react-native-paper';
import {useSelector} from '../utils/store/configureStore';
import {StyleSheet, View} from 'react-native';
import {FileStatus} from '../interfaces/files';
import Typography from './Typography';

interface FileLoadingInfoProps {
  status: FileStatus;
  surveyId: string;
  indeterminate?: boolean;
}

function FileLoadingInfo({
  status,
  surveyId,
  indeterminate,
}: FileLoadingInfoProps) {
  const files = useSelector(state =>
    state.fileLoading[surveyId]?.filter(i => i.status === status),
  );
  return (
    <>
      {files?.map(i => {
        return (
          <View style={styles.viewStyle} key={i.id}>
            <Typography size="Body 1">{i.name}</Typography>
            <ProgressBar progress={i.loadPart} indeterminate={indeterminate} />
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    marginBottom: 2,
  },
});

export default React.memo(FileLoadingInfo);
