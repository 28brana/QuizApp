import { useAppSelector } from "../redux/store";

const RouteBtn = ({ index }) => {
  const data = useAppSelector((state) => state.quizReducer);
  const isSolved = data.userAnswer[index];
  const isSelected = data.currentIndex === index;
  let currentClass = "";
  if (isSelected) {
    currentClass = "bg-background border border-blue-500 text-blue-500";
  } else if (isSolved) {
    currentClass = "saved";
  } else {
    currentClass = "not-saved";
  }

  return (
    <div className={`circle-btn  cursor-pointer ${currentClass}  `}>
      <p>{index}</p>
    </div>
  );
};

export default RouteBtn;
