import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import firebase from './firebase';
// React Components
import Modal from './components/Modal';
import QuestionCard from './components/QuestionCard';
import Spinner from './components/Spinner';
import { fetchData, Difficulty, QuestionWithShuffledAnswers } from './API';
// Material UI Components
import { Button, Container, Typography } from '@material-ui/core';

const TOTAL_QUESTIONS = 10;

const App : React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [allQuestions, setAllQuestions] = useState<QuestionWithShuffledAnswers[]>([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [userResponse, setUserResponse] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {

    const messaging = firebase.messaging();
    messaging.requestPermission()
      .then(() => messaging.getToken())
      .then(token => console.log('token', token))
      .catch(err => {
        console.log('Permission not granted', err);
      })
      
    // eslint-disable-next-line
  }, []);

  // Function to start quiz
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    setCurrentQuestionNumber(0);
    setScore(0);
    setUserResponse(false);
    await setAllQuestions(await fetchData(10, Difficulty.EASY) || allQuestions);
    if(allQuestions === []){
      prompt('You need to connect your Internet to fetch new Questions.')
    }
    setLoading(false);
  };

  // Function to check answer and update DOM
  const checkAnswer = (answer: string) => {
    setUserResponse(true);
    if(answer === allQuestions[currentQuestionNumber].correct_answer){
      setScore(score + 1);
      document.getElementById(answer)?.classList.add('correct');
    } else {
      document.getElementById(answer)?.classList.add('incorrect');
      document.getElementById(allQuestions[currentQuestionNumber].correct_answer)?.classList.add('correct');
    }
  }

  // Function to jump to next question
  const nextQuestion = () => {
    setCurrentQuestionNumber(currentQuestionNumber + 1);
    setUserResponse(false);
  };

  // Function to end quiz
  const endQuiz = () => {
    setGameOver(true);
    setCurrentQuestionNumber(0);
    setUserResponse(false);
  }

  return (
    <Fragment>
      {/* Modal */}
      <Modal />
      {/* Header */}
      <Typography variant="body1" align="left" className="name white-font-with-shadow" gutterBottom>By Ahmed Faraz</Typography>
      <Container maxWidth="sm" className="container">
        <Typography variant="h3" align="center" className="title white-font-with-shadow" gutterBottom>Quiz App</Typography>
        <Typography variant="body2" align="center" className="info" gutterBottom>
          Developed using <span className="react">React</span> & <span className="typescript">Typescript</span>
        </Typography>
        {/* Score */}
        <Typography variant="h4" className="score white-font-with-shadow" gutterBottom>Score: {score}</Typography>
        {/* Show Start button when quiz is over */}
        {
          gameOver &&  (
            <Button variant="contained" color="secondary" onClick={startQuiz}>
              Start
            </Button>
          )
        }
        {/* Show Spinner when its loading */}
        {
          loading && <Spinner />
        }
        {/* Show QuestionCard and Next Button when quiz is On */}
        {
          !loading && allQuestions.length !== 0 && !gameOver && (
            <Fragment>
              <QuestionCard
                question = {allQuestions[currentQuestionNumber].question}
                answers = {allQuestions[currentQuestionNumber].answers}
                checkAnswer = {checkAnswer}
                userResponse = {userResponse}
                questionNumber = {currentQuestionNumber + 1}
                totalQuestions = {TOTAL_QUESTIONS}
              />
              <br />
              {
                // Next Button is not for the last question
                (currentQuestionNumber + 1 < TOTAL_QUESTIONS) && (
                  <Button disabled={!userResponse} variant="contained" color="primary" onClick={nextQuestion}>
                    Next
                  </Button>
                )
              }
              {
                // Done Button is only for the last question
                (currentQuestionNumber + 1 === TOTAL_QUESTIONS) && (
                  <Fragment>
                    {' '}
                    <Button disabled={!userResponse} variant="contained" color="secondary" onClick={endQuiz}>
                      Done
                    </Button>
                  </Fragment>
                )
              }
            </Fragment>
          )
        }
      </Container>
    </Fragment>
  );
}

export default App;
