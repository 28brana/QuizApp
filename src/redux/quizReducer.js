import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  userAnswer: [],
  actualData: [],
  currentIndex:7,
};

const quiz = createSlice({
  name: "common",
  initialState,
  reducers: {
    loadActualData(state, actions) {
      state.actualData = actions.payload;
      state.currentIndex= 1;
      state.userAnswer=[];
      state.email="";
    },
    setCurrentIndex(state,actions){
        state.currentIndex=actions.payload;
    }
  },
});

export default quiz.reducer;

export const { loadActualData,setCurrentIndex } = quiz.actions;
