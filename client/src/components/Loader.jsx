import React, { useEffect, useState } from "react";

const Loader = () => {
  const quotes = [
    "Every great developer you know started as a beginner.",
    "Code is like humor. When you have to explain it, it’s bad.",
    "First, solve the problem. Then, write the code.",
    "Dream in code, build in reality.",
    "Success in coding comes from curiosity and persistence.",
    "A computer is like a violin. You can imagine you are making music, but it takes practice.",
    "Don’t be afraid of bugs; they are opportunities to learn.",
    "Great coders are not born, they are self-taught learners.",
    "Your only limit in programming is your imagination.",
    "The best error message is the one that never shows up.",
    "Small steps in code lead to giant leaps in innovation.",
    "Every line of code you write today is an investment in your future.",
    "Learning to code is learning how to create.",
    "Coding is not about being perfect; it’s about making progress.",
    "Debugging is like being a detective in a crime movie where you are also the murderer.",
    "Stay curious, stay hungry, and keep coding.",
    "Don’t wait for opportunities, create them with code.",
    "Coding is the language of problem-solving.",
    "The future belongs to those who can imagine and build it.",
    "Consistency beats intensity in learning programming.",
  ];

  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);

    const interval = setInterval(() => {
      const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(newQuote);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-6 text-gray-700 text-center max-w-md text-lg font-medium italic">
        {quote}
      </p>
    </div>
  );
};

export default Loader;
