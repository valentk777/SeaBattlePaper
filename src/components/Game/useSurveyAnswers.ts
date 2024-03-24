// import { useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { SurveyAnswer } from "../entities";
// import { answersSlice, selectAnswers } from "./store";

// type SurveyAnswersHookResult = {
//   answers: SurveyAnswer[];
//   updateAnswer: ({ id, value }: { id: string; value: number }) => void;
// };

// export const useSurveyAnswers = (): SurveyAnswersHookResult => {
//   const answers = useSelector(selectAnswers);
//   const dispatch = useDispatch();
//   const updateAnswer = useCallback((params: { id: string; value: number }) => {
//     dispatch(answersSlice.actions.updateAnswer(params));
//   }, [dispatch]);

//   return { answers, updateAnswer };
// };
