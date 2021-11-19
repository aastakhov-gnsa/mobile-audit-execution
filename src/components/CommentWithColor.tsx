import React from 'react';
import CommentViewCard from './CommentViewCard';
import {ColorKey, Status} from '../interfaces/common';

interface CommentWithColorProps {
  value?: string;
  title: string;
  status?: Status;
  hint?: string;
}

function CommentWithColor({value, title, status, hint}: CommentWithColorProps) {
  return (
    <CommentViewCard
      value={value}
      title={title}
      hint={hint}
      leftColor={getColorKey(status)}
    />
  );
}

export default React.memo(CommentWithColor);

function getColorKey(status?: Status): ColorKey {
  switch (status) {
    case 'Failed - Overruled':
      return 'error';
    case 'Passed - Overruled':
      return 'green';
    default:
      return 'text';
  }
}
