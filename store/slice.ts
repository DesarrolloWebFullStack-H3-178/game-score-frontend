import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  action: string;
  userId: string | null;
}

const initialState: ModalState = {
  isOpen: false,
  action: '',
  userId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ userId: string; action: string }>) => {
      state.isOpen = true;
      state.userId = action.payload.userId;
      state.action = action.payload.action;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.userId = null;
      state.action = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
