import React from 'react';
import Typography from './Typography';

function NoDataFallback() {
  return <Typography size="Body 1">—</Typography>;
}

export default React.memo(NoDataFallback);
