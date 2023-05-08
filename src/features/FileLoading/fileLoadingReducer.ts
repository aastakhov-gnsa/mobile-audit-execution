import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FileLoadingState, FileStatus} from '../../interfaces/files';

const initState: FileLoadingState = {};

export const fileLoading = createSlice({
  name: 'fileLoading',
  initialState: initState,
  reducers: {
    addFile: (
      state,
      action: PayloadAction<{
        surveyId: string;
        entityId: string;
        fileId: string;
        path: string;
        name: string;
        status: FileStatus;
      }>,
    ) => {
      const {surveyId, fileId, path, name, status, entityId} = action.payload;
      if (!state[surveyId]) {
        state[surveyId] = [];
      }
      state[surveyId].push({
        id: fileId,
        entityId: entityId,
        name,
        path,
        status,
      });
    },
    deleteFile: (
      state,
      action: PayloadAction<{
        entityId: string;
        fileId: string;
        surveyId: string;
      }>,
    ) => {
      const index = state[action.payload.surveyId].findIndex(
        i => i.id === action.payload.fileId,
      );
      if (index !== -1) {
        state[action.payload.surveyId].splice(index, 1);
      }
    },
    changeFileStatus: (
      state,
      action: PayloadAction<{
        surveyId: string;
        entityId: string;
        fileId: string;
        newStatus: FileStatus;
      }>,
    ) => {
      const file = state[action.payload.surveyId].find(
        i => i.id === action.payload.fileId,
      );
      if (file) {
        file.status = action.payload.newStatus;
      }
    },
    changeLoadPart: (
      state,
      action: PayloadAction<{
        entityId: string;
        fileId: string;
        part: number;
        surveyId: string;
      }>,
    ) => {
      const {fileId, part, surveyId} = action.payload;
      const file = state[surveyId].find(i => i.id === fileId);
      if (file) {
        file.loadPart = part;
      }
    },
  },
});

export const {addFile, deleteFile, changeFileStatus, changeLoadPart} =
  fileLoading.actions;
