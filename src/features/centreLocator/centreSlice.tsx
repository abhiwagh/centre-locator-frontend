import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CentreState {
  selectedCentreType: number;
  selectedClassType?: string;
  selectedLocation: string;
}

const initialState: CentreState = {
  selectedCentreType: 938,
  selectedClassType: "",
  selectedLocation: "All",
};

const centreSlice = createSlice({
  name: "centre",
  initialState,
  reducers: {
    setCentreType(state, action: PayloadAction<number>) {
      state.selectedCentreType = action.payload;
      state.selectedClassType = "";
    },
    setClassType(state, action: PayloadAction<string>) {
      state.selectedClassType = action.payload;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.selectedLocation = action.payload;
    },
  },
});

export const { setCentreType, setClassType, setLocation } = centreSlice.actions;
export default centreSlice.reducer;
