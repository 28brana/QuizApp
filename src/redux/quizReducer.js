import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  userAnswer: Array.from({ length: 15 }, () => undefined),
  actualData: [],
  currentIndex: 0,
  endTime:null,
};

const quiz = createSlice({
  name: "common",
  initialState,
  reducers: {
    loadActualData(state, actions) {
      state.actualData = actions.payload;
    },
    setCurrentIndex(state, actions) {
      state.currentIndex = actions.payload;
    },
    setUserEmail(state, actions) {
      state.email = actions.payload.email;
      state.userAnswer = Array.from({ length: 15 }, () => undefined);
      state.currentIndex=0;
      state.endTime=actions.payload.endTime;
    },
    setUserAnswer(state, actions) {
      console.log(actions.payload)
      const arr = [...state.userAnswer];
      const index = actions.payload.index;
      const value = actions.payload.value;
      arr[index] = value;
      state.userAnswer = arr;
    },
  },
});

export default quiz.reducer;

export const { loadActualData, setCurrentIndex, setUserEmail, setUserAnswer } =
  quiz.actions;
