import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentIndex, setUserAnswer } from "../redux/quizReducer";
import { useAppSelector } from "../redux/store";

const AnswerComponent = ({ options = [], number }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAnswer = useAppSelector((state) => state.quizReducer.userAnswer);
  const getAnswer = userAnswer[number];

  const handleChange = (event) => {
    dispatch(setUserAnswer({ index: number, value: event.target.value }));
  };

  const handleNextQuestion = () => {
    if (number === 14) {
      const isConfirmed = window.confirm(
        "Are you sure you want to submit the quiz?"
      );
      if (isConfirmed) {
        navigate("/result");
      }
    } else {
      dispatch(setCurrentIndex(number + 1));
    }
  };
  
  const handleSkip = () => {
    dispatch(setUserAnswer({ index: number, value: undefined }));
    handleNextQuestion();
  };
  const handleSave = () => {
    handleNextQuestion();
  };

  return (
    <div>
      <div className="flex gap-2 flex-col">
        {options.map((option, index) => (
          <label
            key={index}
            className="flex gap-3 cursor-pointer items-center bg-background border-blue-500 border rounded-md py-2 px-3"
          >
            <div>
              <input
                type="radio"
                name={`question-${number}`}
                value={option}
                checked={getAnswer ===option}
                onChange={handleChange}
              />
            </div>
            <p className="capitalize">{option}</p>
          </label>
        ))}
      </div>
      <div className="flex justify-end gap-4 mt-4">
        {number !== 14 && (
          <button className="btn-outlined" onClick={handleSkip}>
            Skip
          </button>
        )}
        <button className="btn-contained" onClick={handleSave}>
          {number === 14 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default AnswerComponent;
