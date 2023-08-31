import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadActualData, setUserEmail } from "../redux/quizReducer";

const App = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);
      const result = await axios.get("https://opentdb.com/api.php?amount=15");
      dispatch(loadActualData(result.data.results));
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading || error) {
    return (
      <main className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl">
          {loading ? "...Loading 🔃" : "Server Error ⚠️"}
        </p>
      </main>
    );
  }

  const handleSetEmail = (event) => {
    event.preventDefault();
    const currentTime = new Date();

    const endTime = new Date(currentTime.getTime() + 30 * 60 * 1000); // Add 30 minutes in milliseconds
    dispatch(setUserEmail({ email, endTime }));
    navigate("/quiz");
  };

  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md ">
        <h1 className="text-2xl text-center mb-10">Welcome to Quiz 🧠</h1>
        <p className="text-xs text-gray-600">Email</p>

        <form onSubmit={handleSetEmail}>
          <input
            className="w-full px-4 py-2  rounded-md border border-gray-300 mb-4"
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </main>
  );
};

export default App;
