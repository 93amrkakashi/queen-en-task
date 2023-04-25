// App.tsx
import React, { useState, useEffect } from 'react';
import { getTriviaQuestion, Question } from './components/Api';

function App() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    async function fetchQuestion() {
      const question = await getTriviaQuestion();
      setQuestion(question);
      console.log(question)
      setAnswer('');
      setResult('');
    }
    fetchQuestion();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question && answer.toLowerCase() === question.correct_answer.toLowerCase()) {
      setResult('Correct!');
    } else {
      setResult('Incorrect.');
    }
  };

  return (
    <div>
      {question && (
        <>
          <p>{question.question.replace(/(&quot\;)/g,"\"").replace(/(&#039;)/g,"\'")}</p>
          <form onSubmit={handleSubmit}>
            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
            <button type="submit">Submit</button>
          </form>
          {result && <p>{result}</p>}
        </>
      )}
    </div>
  );
}

export default App;
