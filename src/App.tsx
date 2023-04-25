import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./components/Api";
import "./App.css";

const API_URL = "https://opentdb.com/api.php?amount=1";

function App() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [answer, setAnswer] = useState<String | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(API_URL);
      setQuestion(res.data.results[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userAnswer === question?.correct_answer) {
      setResultMessage("Correct!😀");
    } else {
      setResultMessage("Incorrect!☹️");
    }
    setShowResult(true);
    setUserAnswer("");
    setAnswer(question!.correct_answer);
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setUserAnswer("");
    fetchQuestion();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "App dark-mode" : "App light-mode"}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="/">
            Trivia Game
          </a>
          <button onClick={toggleDarkMode} className="btn btn-secondary">
            {isDarkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </nav>
      <div className="container my-4">
        {question ? (
          <div className="row">
            <div className="col-sm-12">
              <h2 className="border border-secondary rounded p-3 text-align-center">
                {question.question
                  .replaceAll("&quot;", '"')
                  .replaceAll("&#039;", "'")}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
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
              <button
                onClick={handleNextQuestion}
                className="btn btn-secondary w-100 mt-2"
              >
                Next question
              </button>
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
