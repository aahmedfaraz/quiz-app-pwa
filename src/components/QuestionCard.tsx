import React, { useEffect } from 'react';
// Material UI Components
import { Button, Typography } from '@material-ui/core';

type Props = {
    question: string;
    answers: string[];
    questionNumber: number;
    totalQuestions: number;
    checkAnswer: any;
    userResponse: boolean;
}

const QuestionCard : React.FC<Props> = ({ question, answers, checkAnswer, userResponse, questionNumber, totalQuestions }) => {

    // Render new card whenever question changes
    useEffect(() => {
        document.querySelectorAll('.option-btn').forEach( button => {
            button.classList.remove('correct');
            button.classList.remove('incorrect');
        })
    }, [question]);

    // Function to send answer to root component
    const onClick = ( e : any ) => {
        // Allow proceed if only not responded yet, if responded then dont allow
        if(!userResponse){
            const answer = e.target.getAttribute('data-value') || e.target.parentElement.getAttribute('data-value');
            checkAnswer(answer)
        }
    }

    return (
        <div className="question-card">
            <Typography variant="subtitle2" color="primary" gutterBottom>Question: {questionNumber}/{totalQuestions}</Typography>
            <Typography variant="subtitle1" gutterBottom><strong dangerouslySetInnerHTML={{__html: question}}></strong></Typography>
            {
                answers.map( (answer: string, index) => (
                    <Button key={index} variant="outlined" className="option-btn" onClick={onClick} id={answer} data-value={answer}>{answer}</Button>
                ))
            }
        </div>
    )
}

export default QuestionCard;
