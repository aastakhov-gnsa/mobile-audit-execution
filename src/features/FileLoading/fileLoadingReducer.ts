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
        entityId: string;
        fileId: string;
        path: string;
        name: string;
        status: FileStatus;
      }>,
    ) => {
      const {fileId, path, name, status, entityId} = action.payload;
      if (!state[entityId]) {
        state[entityId] = [];
      }
      state[entityId].push({
        id: fileId,
        entityId: entityId,
        name,
        path,
        status,
      });
    },
    deleteFile: (
      state,
      action: PayloadAction<{entityId: string; fileId: string}>,
    ) => {
      const index = state[action.payload.entityId].findIndex(
        i => i.id === action.payload.fileId,
      );
      if (index !== -1) {
        state[action.payload.entityId].splice(index, 1);
      }
    },
    changeFileStatus: (
      state,
      action: PayloadAction<{
        entityId: string;
        fileId: string;
        newStatus: FileStatus;
      }>,
    ) => {
      const file = state[action.payload.entityId].find(
        i => i.id === action.payload.fileId,
      );
      if (file) {
        file.status = action.payload.newStatus;
      }
    },
    changeLoadPart: (
      state,
      action: PayloadAction<{entityId: string; fileId: string; part: number}>,
    ) => {
      const {fileId, part, entityId} = action.payload;
      const file = state[entityId].find(i => i.id === fileId);
      if (file) {
        file.loadPart = part;
      }
    },
  },
});

export const {addFile, deleteFile, changeFileStatus, changeLoadPart} =
  fileLoading.actions;
