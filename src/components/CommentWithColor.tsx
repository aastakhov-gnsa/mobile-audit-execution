import React from 'react';
import {StandardStatus} from '../interfaces/standard';
import CommentViewCard from './CommentViewCard';
import {ColorKey} from '../interfaces/common';

interface CommentWithColorProps {
  value?: string;
  title: string;
  status?: StandardStatus;
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

function getColorKey(status?: StandardStatus): ColorKey {
  switch (status) {
    case 'Failed - Overruled':
      return 'error';
    case 'Passed - Overruled':
      return 'green';
    default:
      return 'text';
  }
}
