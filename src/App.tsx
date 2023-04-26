import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./components/interfaces/interface";
import "./App.css";
import NavBar from "./components/layouts/NavBar";

// URL for API call
const API_URL = "https://opentdb.com/api.php?amount=1";

function App() {
  // State variables using useState hook
  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [answer, setAnswer] = useState<String | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // useEffect hook to fetch question when component mounts
  useEffect(() => {
    fetchQuestion();
  }, []);

  // Function to fetch a question from API
  const fetchQuestion = async () => {
    try {
      const res = await axios.get(API_URL);
      setQuestion(res.data.results[0]);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Checking if user's answer is correct or not and displaying message accordingly
    if (userAnswer === question?.correct_answer) {
      setResultMessage("Correct!😊");
    } else {
      setResultMessage("Incorrect!☹️");
    }
    setShowResult(true);
    setUserAnswer("");
    setAnswer(question!.correct_answer);
  };

  // Function to handle clicking on "Next question" button
  const handleNextQuestion = () => {
    setShowResult(false);
    setUserAnswer("");
    fetchQuestion();
  };

  return (
    <div className={isDarkMode ? "App dark-mode" : "App light-mode"}>
      {/* navbar component */}
      <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <div className="container my-4">
        {question ? (
          <div className="row">
            <div className="col-sm-12">
              {/* Displaying the question */}
              <h2 className="border border-secondary rounded p-3 text-align-center">
                {question.question
                  .replaceAll("&quot;", '"')
                  .replaceAll("&#039;", "'")}
              </h2>
              {/* Handling form submission */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Type answer</label>
                  <input
                    type="text"
                    className="form-control"
                    id="answerInput"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-2 mr-2"
                  disabled={!userAnswer.length}
                >
                  Submit
                </button>
              </form>
              {/* Handling next question */}
              <button
                onClick={handleNextQuestion}
                className="btn btn-secondary w-100 mt-2"
              >
                Next question
              </button>
              {/* Displaying result */}
              <div className="correct">
                {showResult && <p className="text-center">{resultMessage}</p>}
                {showResult && (
                  <p className="text-center">
                    Correct answer is :{" "}
                    <span className="correct-answer">
                      {answer
                        ?.replaceAll("&quot;", '"')
                        .replaceAll("&#039;", "'")}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            {/* Loading message if question is loading */}
            <div className="col-sm-12">
              <p>Loading question...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
