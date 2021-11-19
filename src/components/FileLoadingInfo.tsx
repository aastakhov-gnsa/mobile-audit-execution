import React from 'react';
import {ProgressBar} from 'react-native-paper';
import {useSelector} from '../utils/store/configureStore';
import {View} from 'react-native';
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
          <View style={{marginBottom: 2}}>
            <Typography size="Body 1">{i.name}</Typography>
            <ProgressBar progress={i.loadPart} indeterminate={indeterminate} />
          </View>
        );
      })}
    </>
  );
}

export default React.memo(FileLoadingInfo);
