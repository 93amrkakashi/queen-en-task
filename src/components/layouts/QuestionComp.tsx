import React from "react";
import Question from "../interfaces/interface";

interface Props {
  question: Question;
  answer: string | Number;
  resultMessage: string;
  showResult: boolean;
  handleNextQuestion: () => void;
}

const QuestionComp: React.FC<Props> = ({
  question,
  answer,
  resultMessage,
  showResult,
  handleNextQuestion,
}) => {
  return (
    <div className="row">
      <div className="col-sm-12">
        <h2 className="border border-secondary rounded p-3 text-align-center">
          {question.question
            .replaceAll("&quot;", '"')
            .replaceAll("&#039;", "'")}
        </h2>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="answerInput"
              // value={answer}
              disabled
            />
          </div>
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
                {question.correct_answer
                  ?.replaceAll("&quot;", '"')
                  .replaceAll("&#039;", "'")}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionComp;
