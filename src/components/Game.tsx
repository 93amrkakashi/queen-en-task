import React, { useEffect, useState } from 'react';
import Question from './Question';

interface QuestionData {
  question: string;
  correct_answer: string;
}

const TriviaGame: React.FC = () => {
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const fetchQuestion = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=1');
    const data = await response.json();
    const { question, correct_answer } = data.results[0];
    setQuestionData({ question, correct_answer });
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    setIsCorrect(isCorrect);
    setTimeout(() => {
      setIsCorrect(null);
      fetchQuestion();
    }, 2000);
  };

  if (!questionData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isCorrect !== null && (
        <div>{isCorrect ? 'Correct!' : 'Incorrect!'}</div>
      )}
      <Question
        question={questionData.question}
        answer={questionData.correct_answer}
        onSubmit={handleAnswer}
      />
    </div>
  );
};

export default TriviaGame;
