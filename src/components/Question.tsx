import React, { useState } from 'react';

interface QuestionProps {
  question: string;
  answer: string;
  onSubmit: (isCorrect: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({ question, answer, onSubmit }) => {
  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isCorrect = userAnswer.trim().toLowerCase() === answer.trim().toLowerCase();
    onSubmit(isCorrect);
  };

  return (
    <div>
      <h2>{question}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={userAnswer} onChange={event => setUserAnswer(event.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Question;
