// api.ts
import axios from 'axios';

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export async function getTriviaQuestion(): Promise<Question> {
  const response = await axios.get('https://opentdb.com/api.php?amount=1');
  return response.data.results[0];
}
