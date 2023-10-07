import { useDispatch } from "react-redux";
import RouteBtn from "../components/RouteBtn";
import AnswerComponent from "../components/AnswerComponent";
import RulesBoard from "../components/RulesBoard";
import { useAppSelector } from "../redux/store";
import { logout, setCurrentIndex } from "../redux/quizReducer";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useAppSelector((state) => state.quizReducer);

  const currentIndex = data.currentIndex;
  const question = data.actualData[currentIndex]?.question;
  const incorrect_answers = data.actualData[currentIndex]?.incorrect_answers;
  const correct_answer = data.actualData[currentIndex]?.correct_answer;

  const options = [...incorrect_answers, correct_answer];

  const email = data.email;

  if (!email || data.actualData.length === 0) {
    return (
      <main className="flex items-center justify-center h-screen">
        <h1 className="text-xl">Access Denied 🚫</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="border">
        <div className="flex items-center py-4 justify-between container mx-auto">
          <div>
            <p>Quiz 🧠</p>
          </div>
          <div>
            <Timer />
          </div>
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
            className=" rounded-md py-2 px-3 text-[#FE5746]"
            style={{
              border: "1px solid #FE5746",
            }}
          >
            Logout{" "}
          </button>
        </div>
      </div>
      <div className="container mx-auto py-10">
        <div className="flex gap-4 mb-10 flex-wrap">
          {[...Array(15)].map((_, index) => (
            <div
              key={index}
              onClick={() => {
                dispatch(setCurrentIndex(index));
              }}
            >
              <RouteBtn index={index} />
            </div>
          ))}
        </div>
        <div className="flex md:flex-row flex-col-reverse md:gap-20 gap-6">
          <div className="flex-1 px-3">
            <div className="py-2 text-center">
              <h1 className="text-xl font-semibold">
                Question no {currentIndex} / 15
              </h1>
            </div>
            <div className="md:py-4 py-2">
              <p className="text-center">
                <span>Q {currentIndex} . </span>
                {question}
              </p>
            </div>
            <div className="py-2">
              <AnswerComponent options={options} number={currentIndex} />
            </div>
          </div>
          <div>
            <RulesBoard />
          </div>
        </div>
      </div>
    </main>
  );
}
