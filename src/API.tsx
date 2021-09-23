import { shuffleArray } from "./utilities";
import { defaultData } from "./defaultData";

// Function to fetch Quiz from API and return modified(required) results
export const fetchData = async (totalNumber: number, difficulty: Difficulty) => {
    try {
        const res = await fetch(`https://opentdb.com/api.php?amount=${totalNumber}&difficulty=${difficulty}&type=multiple`);
        const data = (await res.json()).results;
        return data.map((question : Question) => ({
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }))
    } catch (error) {
        const data = defaultData;
        return data.map((question : Question) => ({
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }))
    }
};

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
};

type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
};

export type QuestionWithShuffledAnswers = Question & { answers: string[] };