import confettiAnimation from "../confettiAnimation.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { useAppSelector } from "../redux/store";

const Result = () => {
  const data = useAppSelector((state) => state.quizReducer);
  const actualData = data.actualData;
  const myAnswer = data.userAnswer;
  let totalCorrect = 0;
  actualData.forEach((element, index) => {
    if (element.correct_answer === myAnswer[index]) {
      totalCorrect += 1;
    }
  });

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto">
        <div className="flex pb-10 pt-14  items-center justify-center">
          <div className="text-center">
            <div className="relative ">
              <div className="absolute [top:-113px] [left:-28px] border h-full w-full">
                <Player
                  autoplay
                  loop={false}
                  src={confettiAnimation}
                  style={{ height: "300px", width: "300px" }}
                ></Player>
              </div>
              <p className="text-6xl  font-semibold [color:#F9BD21]">
                {totalCorrect}
              </p>
            </div>
            <div className="mt-12">
              <p className="text-3xl font-semibold">Congratulations!</p>
              <p className="text-sm font-semibold">
                You got {totalCorrect} correct ✔️ and {15 - totalCorrect} wrong
                ❌
              </p>
              <a href="/">
                <button className="mt-6 btn-contained">Retake</button>
              </a>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl text-semibold">Result </h1>
          <div>
            {actualData.map((item, index) => (
              <div key={index} className="mb-8">
                <p className="mb-1">
                  Q{index}. {item.question}
                </p>
                {[...item.incorrect_answers, item.correct_answer].map(
                  (option, subIndex) => {
                    const userAnswer = myAnswer[index];

                    let statusClass = "";
                    if (userAnswer && userAnswer === option) {
                      if (userAnswer === item.correct_answer) {
                        statusClass = "correct";
                      } else {
                        statusClass = "wrong";
                      }
                    }

                    return (
                      <div
                        key={subIndex}
                        className={`flex gap-3 mb-2  items-center  border rounded-md py-2 px-3 ${statusClass}`}
                      >
                        <p className="capitalize">{option}</p>
                      </div>
                    );
                  }
                )}
                <p
                  className="text-sm py-1 px-3"
                  style={{
                    background: "#E5F6FD",
                    color: "#418944",
                  }}
                >
                  Correct Answer: {item.correct_answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
