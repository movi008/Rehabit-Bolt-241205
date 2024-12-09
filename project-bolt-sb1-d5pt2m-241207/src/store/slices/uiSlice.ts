import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ViewMode, ViewType } from '../../types';

interface UIState {
  viewMode: ViewMode;
  viewType: ViewType;
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
}

const initialState: UIState = {
  viewMode: 'grid',
  viewType: 'classic',
  sidebarOpen: true,
  theme: 'light',
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    setViewType: (state, action: PayloadAction<ViewType>) => {
      state.viewType = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setViewMode,
  setViewType,
  toggleSidebar,
  setTheme,
  setLoading,
} = uiSlice.actions;
export default uiSlice.reducer;