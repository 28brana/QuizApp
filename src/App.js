import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadActualData } from "./redux/quizReducer";

const App=()=> {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading || error) {
    return (
      <main className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl">
          {loading ? "...Loading 🔃" : "Server Error ⚠️"}
        </p>
      </main>
    );
  }

  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md ">
        <h1 className="text-2xl text-center mb-10">Welcome to Quiz 🧠</h1>
        <p className="text-xs text-gray-600">Email</p>
        <input
          className="w-full px-4 py-2  rounded-md border border-gray-300 mb-4"
          type="email"
          name="email"
          placeholder="Enter Email"
        />
        <a href={"/quiz"}>
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Start Quiz
          </button>
        </a>
      </div>
    </main>
  );
}

export default App;