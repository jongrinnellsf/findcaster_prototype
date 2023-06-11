import React, { useState } from 'react';

function QuizPage() {
  // State to keep track of the current question
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // State to keep track of the user's answers
  const [answers, setAnswers] = useState([]);
  // State to keep track of the user's score
  const [score, setScore] = useState(0);

  // Array of quiz questions
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Rome", "Madrid"],
      answer: "Paris"
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Jupiter", "Mars", "Saturn"],
      answer: "Jupiter"
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Salvador Dali"],
      answer: "Leonardo da Vinci"
    }
  ];

  // Function to handle when the user submits an answer
  const handleSubmit = (e, selectedOption) => {
    e.preventDefault();
    // Add the selected option to the answers array
    setAnswers(prevAnswers => [...prevAnswers, selectedOption]);
    // Check if the selected option is the correct answer
    if (selectedOption === questions[currentQuestion].answer) {
      // If it is, increase the score by 1
      setScore(prevScore => prevScore + 1);
    }
    // Go to the next question
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
  }

  return (
    <div>
      <h1>Quiz</h1>
      {currentQuestion < questions.length ? (
        <div>
          <p>{questions[currentQuestion].question}</p>
          {questions[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={(e) => handleSubmit(e, option)}>{option}</button>
          ))}
        </div>
      ) : (
        <div>
          <p>Quiz complete! Your score is {score}/{questions.length}</p>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
