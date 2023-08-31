import { useState, useEffect } from "react";
import { useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Timer = () => {
  const navigate = useNavigate();

  const currentTime = new Date();
  const data = useAppSelector((state) => state.quizReducer);
  
  const endTime = new Date(data.endTime);
  const timeDifference = endTime - currentTime;
  
  const remainingMinutes = Math.floor(timeDifference / (1000 * 60));
  const remainingSeconds = Math.floor((timeDifference / 1000) % 60);
  
  const [text, setText] = useState(
    `${remainingMinutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  );
  
  const [timer, setTimer] = useState(timeDifference);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let intervalId;

    if (running) {
      intervalId = setInterval(() => {
        if (timer > 0) {
          const minutes = Math.floor(timer / 1000 / 60);
          const seconds = Math.floor((timer / 1000) % 60);

          setText(
            `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          );
          setTimer((prevTimer) => prevTimer - 1000);
        } else {
          setRunning(false);
          navigate("/result");
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [navigate, running, timer]);

  return (
    <div className="border rounded-md py-2 px-3 text-white bg-[#FE5746]">
      {text} min left
    </div>
  );
};

export default Timer;
