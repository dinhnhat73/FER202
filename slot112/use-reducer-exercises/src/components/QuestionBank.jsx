import React, { useReducer, useEffect, useRef } from "react";
import { Button, Card, Container, ProgressBar } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const STORAGE_KEY = "qr_highscore_v1";

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  feedback: null, // { ok: true/false, text: '...' }
  timer: 10,
  highScore: 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SET_HIGH_SCORE":
      return { ...state, highScore: action.payload };
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };
    case "REVEAL_FEEDBACK":
      return { ...state, feedback: action.payload };
    case "NEXT_QUESTION":
      {
        const isCorrect = state.selectedOption === state.questions[state.currentQuestion].answer;
        const nextIndex = state.currentQuestion + 1;
        const showScore = nextIndex >= state.questions.length;
        const newScore = isCorrect ? state.score + 1 : state.score;
        return {
          ...state,
          score: newScore,
          currentQuestion: nextIndex,
          selectedOption: "",
          showScore,
          feedback: null,
          timer: 10,
        };
      }
    case "TIME_OUT":
      {
        // treat as incorrect
        const nextIndex = state.currentQuestion + 1;
        const showScore = nextIndex >= state.questions.length;
        return {
          ...state,
          currentQuestion: nextIndex,
          selectedOption: "",
          showScore,
          feedback: { ok: false, text: `Time's up! Correct: ${state.questions[state.currentQuestion].answer}` },
          timer: 10,
        };
      }
    case "RESTART_QUIZ":
      return { ...initialState, questions: state.questions, highScore: state.highScore };
    case "SET_TIMER":
      return { ...state, timer: action.payload };
    default:
      return state;
  }
}

export default function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, currentQuestion, selectedOption, score, showScore, feedback, timer, highScore } = state;
  const intervalRef = useRef(null);

  useEffect(() => {
    // load high score
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      dispatch({ type: "SET_HIGH_SCORE", payload: Number(stored) });
    }
  }, []);

  useEffect(() => {
    // start timer for active question unless quiz ended
    if (showScore) return;
    // clear existing
    if (intervalRef.current) clearInterval(intervalRef.current);
    dispatch({ type: "SET_TIMER", payload: 10 });
    intervalRef.current = setInterval(() => {
      dispatch({ type: "SET_TIMER", payload: (prev => {
        // we can't get prev from dispatch; so instead use function below
        return null;
      }) });
    }, 1000);

    // We'll implement timer using another pattern: local interval reading state.timer via ref
    // Clear and set a standard interval that decrements via direct method below
    if (intervalRef.current) clearInterval(intervalRef.current);
    let t = 10;
    dispatch({ type: "SET_TIMER", payload: t });
    intervalRef.current = setInterval(() => {
      t -= 1;
      // Update timer
      dispatch({ type: "SET_TIMER", payload: t });
      if (t <= 0) {
        clearInterval(intervalRef.current);
        dispatch({ type: "REVEAL_FEEDBACK", payload: { ok: false, text: `Time's up! Correct: ${questions[currentQuestion].answer}` } });
        // small delay then move next
        setTimeout(() => dispatch({ type: "NEXT_QUESTION" }), 900);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, showScore]);

  // Note: Because dispatch cannot read previous state when used inside interval creation above,
  // we used a closure variable `t` to decrement and dispatch the SET_TIMER value.

  const handleOptionSelect = (option) => {
    // reveal immediate feedback (or you can choose to wait until Next)
    dispatch({ type: "SELECT_OPTION", payload: option });
    const ok = option === questions[currentQuestion].answer;
    dispatch({ type: "REVEAL_FEEDBACK", payload: { ok, text: ok ? "Correct! 🎉" : `Incorrect. Correct: ${questions[currentQuestion].answer}` } });
    // stop timer and move next after a short delay
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeout(() => {
      dispatch({ type: "NEXT_QUESTION" });
    }, 900);
  };

  const handleRestart = () => {
    // update highscore
    const stored = localStorage.getItem(STORAGE_KEY);
    const hs = stored ? Number(stored) : 0;
    if (score > hs) {
      localStorage.setItem(STORAGE_KEY, score);
      dispatch({ type: "SET_HIGH_SCORE", payload: score });
    }
    dispatch({ type: "RESTART_QUIZ" });
  };

  useEffect(() => {
    // when showScore becomes true, store high score if needed
    if (showScore) {
      const stored = localStorage.getItem(STORAGE_KEY);
      const hs = stored ? Number(stored) : 0;
      if (score > hs) {
        localStorage.setItem(STORAGE_KEY, score);
        dispatch({ type: "SET_HIGH_SCORE", payload: score });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showScore]);

  if (!questions || questions.length === 0) return <div>No questions</div>;

  if (showScore) {
    return (
      <Card className="p-3 mb-3">
        <h4>Quiz hoàn tất</h4>
        <p>Your Score: {score} / {questions.length}</p>
        <p>High Score (localStorage): {highScore}</p>
        <div className="d-flex gap-2">
          <Button onClick={() => {
            dispatch({ type: "RESTART_QUIZ" });
          }}>Restart</Button>
        </div>
      </Card>
    );
  }

  const q = questions[currentQuestion];
  const progress = Math.round(((currentQuestion) / questions.length) * 100);

  return (
    <Card className="p-3 mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <h5>Question {currentQuestion + 1} / {questions.length}</h5>
        <div>High score: {highScore}</div>
      </div>

      <ProgressBar now={progress} label={`${currentQuestion}/${questions.length}`} className="mb-3" />

      <h6>{q.question}</h6>

      <div className="mt-3">
        {q.options.map((opt, i) => {
          const variant = selectedOption === opt ? "primary" : "outline-secondary";
          return (
            <Button
              key={i}
              className="me-2 mb-2"
              variant={selectedOption === opt ? "primary" : "outline-secondary"}
              onClick={() => handleOptionSelect(opt)}
            >
              {opt}
            </Button>
          );
        })}
      </div>

      <div className="mt-3">
        <strong>Timer:</strong>{" "}
        <span style={{ color: timer <= 5 ? "red" : "inherit", fontWeight: 700 }}>
          {timer}s
        </span>
      </div>

      {feedback && (
        <div className="mt-2">
          {feedback.ok ? (
            <div style={{ color: "green", display: "flex", alignItems: "center", gap: 8 }}>
              <FaCheckCircle /> {feedback.text}
            </div>
          ) : (
            <div style={{ color: "red", display: "flex", alignItems: "center", gap: 8 }}>
              <FaTimesCircle /> {feedback.text}
            </div>
          )}
        </div>
      )}

      <div className="mt-3">
        <small>Score: {score}</small>
      </div>
    </Card>
  );
}
