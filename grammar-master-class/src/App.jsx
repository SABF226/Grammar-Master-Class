import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Clock,
  Target,
  Award,
  Zap,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Play,
} from "lucide-react";

export default function JKDGrammarSession() {
  const [currentSection, setCurrentSection] = useState("overview");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const grammarDomains = [
    {
      id: 1,
      title: "Tenses & Time Logic",
      frequency: "HIGH",
      description: "Correct tense selection in context, logical time sequence",
      areas: [
        "Present Simple vs Continuous",
        "Past Simple vs Present Perfect",
        "Future forms",
      ],
      trap: "Memorizing rules instead of understanding context",
    },
    {
      id: 2,
      title: "Modals & Intention",
      frequency: "HIGH",
      description: "Meaning-based, not form-based",
      areas: [
        "can/may (ability vs permission)",
        "must/have to/should (obligation)",
        "might/could (possibility)",
      ],
      trap: "Grammatically correct but contextually wrong",
    },
    {
      id: 3,
      title: "Prepositions & Fixed Expressions",
      frequency: "MEDIUM",
      description: "Classic JKD elimination tool",
      areas: ["in/on/at (time)", "interested in", "good at", "afraid of"],
      trap: "Applying general rules instead of memorizing expressions",
    },
    {
      id: 4,
      title: "Articles (A/AN/THE/Ø)",
      frequency: "HIGH",
      description: "Fast points if you know the rules",
      areas: ["First mention vs known", "General truth vs specific"],
      trap: "Overthinking simple cases",
    },
    {
      id: 5,
      title: "Comparatives & Superlatives",
      frequency: "MEDIUM",
      description: "Short questions, quick wins",
      areas: ["Adjective length logic", "Irregular forms"],
      trap: "'more better', 'most fastest'",
    },
    {
      id: 6,
      title: "Conditionals",
      frequency: "LOW-MEDIUM",
      description: "Mostly zero and first conditional",
      areas: ["If + present → will", "Time sequences"],
      trap: "Mixing conditional types",
    },
  ];

  const warmUpQuestions = [
    {
      id: 1,
      question:
        "By the time the competition starts, the team ___ all the exercises.",
      options: ["finishes", "has finished", "will have finished", "finished"],
      correct: 2,
      domain: "Tenses",
      explanation:
        "Future perfect: action completed before future time. 'will have finished' is correct.",
    },
    {
      id: 2,
      question: "Students ___ their phones during the exam.",
      options: [
        "mustn't use",
        "don't have to use",
        "shouldn't use",
        "might not use",
      ],
      correct: 0,
      domain: "Modals",
      explanation: "'mustn't' = prohibition (rule). Other options are weaker.",
    },
    {
      id: 3,
      question: "___ English is an international language.",
      options: ["A", "An", "The", "Ø (no article)"],
      correct: 3,
      domain: "Articles",
      explanation: "General truth about a language → no article needed.",
    },
    {
      id: 4,
      question: "She is good ___ solving complex problems.",
      options: ["in", "at", "for", "with"],
      correct: 1,
      domain: "Prepositions",
      explanation: "Fixed expression: 'good at' + gerund/noun",
    },
    {
      id: 5,
      question: "This exam is ___ than the previous one.",
      options: [
        "more difficult",
        "difficulter",
        "more difficulter",
        "most difficult",
      ],
      correct: 0,
      domain: "Comparatives",
      explanation: "Long adjective (3+ syllables) → more + adjective",
    },
    {
      id: 6,
      question: "If the team ___ hard, they will succeed.",
      options: ["work", "works", "will work", "worked"],
      correct: 1,
      domain: "Conditionals",
      explanation:
        "First conditional: If + present simple, will + infinitive. 'team' = singular",
    },
    {
      id: 7,
      question: "I ___ three languages fluently since childhood.",
      options: ["speak", "have spoken", "spoke", "am speaking"],
      correct: 1,
      domain: "Tenses",
      explanation:
        "Present perfect: action starting in past, continuing now ('since childhood')",
    },
    {
      id: 8,
      question: "You ___ submit your assignment by Friday.",
      options: ["can", "may", "must", "might"],
      correct: 2,
      domain: "Modals",
      explanation:
        "'must' = strong obligation. Deadline = obligation, not permission/possibility.",
    },
    {
      id: 9,
      question: "Mount Everest is ___ mountain in the world.",
      options: ["higher", "the highest", "more high", "most high"],
      correct: 1,
      domain: "Superlatives",
      explanation:
        "Superlative: the + -est (short adjective). Comparing to ALL mountains.",
    },
    {
      id: 10,
      question: "The meeting starts ___ 3 PM ___ Monday.",
      options: ["at / on", "in / at", "on / in", "at / in"],
      correct: 0,
      domain: "Prepositions",
      explanation: "Time: 'at' + specific time, 'on' + day",
    },
  ];

  const commonMistakes = [
    {
      mistake: "Overthinking simple sentences",
      solution: "Trust your first instinct on easy questions",
      example: "'The sun rises in the east' - don't look for hidden complexity",
    },
    {
      mistake: "Ignoring time markers",
      solution: "Underline keywords: already, yet, tomorrow, now, since, for",
      example: "'already' → present perfect, 'yesterday' → past simple",
    },
    {
      mistake: "Confusing grammar correctness with meaning",
      solution: "Ask: 'Does this make sense in context?'",
      example: "'He can swim' (ability) vs 'He may swim' (permission)",
    },
    {
      mistake: "Poor time management",
      solution: "Max 30 seconds per MCQ, flag and return if stuck",
      example: "Don't spend 2 minutes on 1 question worth 1 point",
    },
  ];

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                📚 Grammar Master Class
              </h1>
              <p className="text-xl opacity-90">
                JKD English Quiz Format - Session 1
              </p>
            </div>
            {timeLeft !== null && (
              <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  <span className="text-3xl font-bold">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Overview */}
        {currentSection === "overview" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Session Identity
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl text-center border-l-4 border-blue-600">
                  <Target className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <p className="font-bold text-gray-800 text-lg mb-2">Focus</p>
                  <p className="text-gray-600">Grammar Accuracy & Speed</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl text-center border-l-4 border-purple-600">
                  <Clock className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <p className="font-bold text-gray-800 text-lg mb-2">
                    Duration
                  </p>
                  <p className="text-gray-600">90 minutes</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-xl text-center border-l-4 border-yellow-600">
                  <Award className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                  <p className="font-bold text-gray-800 text-lg mb-2">
                    Objective
                  </p>
                  <p className="text-gray-600">Maximize MCQ points</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-100 to-yellow-100 border-l-4 border-red-600 p-6 rounded-r-xl mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="text-red-600" />
                  Strategic Note
                </h3>
                <p className="text-lg text-gray-800 font-semibold">
                  JKD does NOT reward "knowing grammar".
                  <br />
                  It rewards{" "}
                  <span className="text-red-600">
                    choosing correctly under pressure
                  </span>
                  .
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Session Structure (90 min)
              </h3>

              <div className="space-y-3">
                <div
                  className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => {
                    setCurrentSection("warmup");
                    setTimeLeft(15 * 60);
                  }}
                >
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-gray-800">
                      Grammar Warm-Up (15 min)
                    </p>
                    <p className="text-sm text-gray-600">
                      10 JKD-style MCQs • Individual • Timed
                    </p>
                  </div>
                  <Play className="text-blue-600" />
                </div>

                <div
                  className="flex items-center gap-4 bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => setCurrentSection("domains")}
                >
                  <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-gray-800">
                      Core Grammar Drills (40 min)
                    </p>
                    <p className="text-sm text-gray-600">
                      6 domains • Group correction • Explanation
                    </p>
                  </div>
                  <Play className="text-purple-600" />
                </div>

                <div
                  className="flex items-center gap-4 bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => {
                    setCurrentSection("speed");
                    setTimeLeft(20 * 60);
                  }}
                >
                  <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-gray-800">
                      Speed Challenge (20 min)
                    </p>
                    <p className="text-sm text-gray-600">
                      15 questions • Team vs Clock
                    </p>
                  </div>
                  <Play className="text-red-600" />
                </div>

                <div
                  className="flex items-center gap-4 bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => setCurrentSection("mistakes")}
                >
                  <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    4
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-gray-800">
                      Error Analysis (10 min)
                    </p>
                    <p className="text-sm text-gray-600">
                      Why wrong answers look correct
                    </p>
                  </div>
                  <Play className="text-yellow-600" />
                </div>

                <div className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    5
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-gray-800">
                      Takeaways & Assignments (5 min)
                    </p>
                    <p className="text-sm text-gray-600">
                      Practice 20 MCQs/day • Focus on meaning
                    </p>
                  </div>
                  <CheckCircle className="text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                📺 Reference: JKD 3ᵉ édition
              </h3>
              <a
                href="https://www.youtube.com/live/2fQrslhhnYg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold underline"
              >
                Watch Competition Recording →
              </a>
            </div>
          </div>
        )}

        {/* Part 1: Warm-Up */}
        {currentSection === "warmup" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-blue-700">
                  Part 1: Grammar Warm-Up
                </h2>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    Question {currentQuestion + 1} of 10
                  </p>
                  <p className="text-sm text-gray-500">
                    {warmUpQuestions[currentQuestion].domain}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-xl mb-6">
                <p className="text-2xl font-semibold text-gray-800 mb-6">
                  {warmUpQuestions[currentQuestion].question}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {warmUpQuestions[currentQuestion].options.map(
                    (option, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setAnswers({ ...answers, [currentQuestion]: idx });
                          setShowExplanation(true);
                        }}
                        className={`p-4 rounded-xl text-left font-semibold transition-all ${
                          answers[currentQuestion] === idx
                            ? idx === warmUpQuestions[currentQuestion].correct
                              ? "bg-green-500 text-white shadow-lg"
                              : "bg-red-500 text-white shadow-lg"
                            : showExplanation &&
                                idx === warmUpQuestions[currentQuestion].correct
                              ? "bg-green-200 border-2 border-green-500"
                              : "bg-white hover:bg-blue-50 border-2 border-gray-200"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}) {option}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {showExplanation && (
                <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-r-xl mb-6 animate-fade-in">
                  <h4 className="font-bold text-gray-800 mb-2">
                    💡 Explanation:
                  </h4>
                  <p className="text-gray-700">
                    {warmUpQuestions[currentQuestion].explanation}
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setCurrentQuestion(Math.max(0, currentQuestion - 1));
                    setShowExplanation(false);
                  }}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold disabled:opacity-50"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => {
                    if (currentQuestion < 9) {
                      setCurrentQuestion(currentQuestion + 1);
                      setShowExplanation(false);
                    } else {
                      setCurrentSection("domains");
                      setCurrentQuestion(0);
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg"
                >
                  {currentQuestion < 9 ? "Next →" : "Continue to Drills"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Part 2: Grammar Domains */}
        {currentSection === "domains" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-purple-700 mb-6">
                Part 2: Core Grammar Domains
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {grammarDomains.map((domain) => (
                  <div
                    key={domain.id}
                    className="border-2 rounded-xl p-6 hover:shadow-lg transition-all"
                    style={{
                      borderColor:
                        domain.frequency === "HIGH"
                          ? "#DC2626"
                          : domain.frequency === "MEDIUM"
                            ? "#F59E0B"
                            : "#10B981",
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">
                        {domain.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          domain.frequency === "HIGH"
                            ? "bg-red-100 text-red-700"
                            : domain.frequency === "MEDIUM"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {domain.frequency}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4">{domain.description}</p>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Key Areas:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {domain.areas.map((area, idx) => (
                          <li key={idx}>• {area}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                      <p className="text-sm font-semibold text-red-800">
                        ⚠️ Trap:
                      </p>
                      <p className="text-sm text-gray-700">{domain.trap}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setCurrentSection("speed")}
                className="mt-8 w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl"
              >
                Continue to Speed Challenge →
              </button>
            </div>
          </div>
        )}

        {/* Part 4: Common Mistakes */}
        {currentSection === "mistakes" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-yellow-700 mb-6">
                Part 4: Common Mistakes Analysis
              </h2>

              <div className="space-y-6">
                {commonMistakes.map((item, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-yellow-600 bg-yellow-50 p-6 rounded-r-xl"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-bold text-red-700 mb-2">
                          ❌ Mistake:
                        </p>
                        <p className="text-gray-800">{item.mistake}</p>
                      </div>
                      <div>
                        <p className="font-bold text-green-700 mb-2">
                          ✅ Solution:
                        </p>
                        <p className="text-gray-800">{item.solution}</p>
                      </div>
                    </div>
                    <div className="mt-4 bg-white p-3 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Example:
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        {item.example}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  📝 Home Preparation Assignment
                </h3>
                <ul className="space-y-3 text-lg text-gray-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" />
                    <span>Review JKD grammar summary sheet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" />
                    <span>
                      Practice <strong>20 MCQs per day</strong> (timed: 30
                      sec/question)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" />
                    <span>
                      <strong>Focus on meaning before form</strong> - context is
                      king!
                    </span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setCurrentSection("overview")}
                className="mt-6 w-full px-6 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl"
              >
                Back to Overview
              </button>
            </div>
          </div>
        )}

        {/* Speed Challenge Placeholder */}
        {currentSection === "speed" && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <Zap className="w-24 h-24 text-red-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-red-700 mb-4">
              Part 3: Speed Challenge
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Team vs Clock: 15 questions in 20 minutes
            </p>
            <p className="text-gray-600 mb-8">
              This section will be conducted live during the session with the
              facilitator.
            </p>
            <button
              onClick={() => setCurrentSection("mistakes")}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl"
            >
              Continue to Error Analysis →
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 bg-gray-800 text-white py-8 rounded-xl">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Section */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <i className="fas fa-address-card"></i>
                  Contact Me
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://www.linkedin.com/in/sabf-sanon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <i className="fab fa-linkedin text-xl"></i>
                    <span>Abdoul Ben SANON</span>
                  </a>
                  <a
                    href="mailto:sabfsanon@gmail.com"
                    className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <i className="fas fa-envelope text-xl"></i>
                    <span>sabfsanon@gmail.com</span>
                  </a>
                  <a
                    href="https://www.github.com/SABF226"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <i className="fab fa-github text-xl"></i>
                    <span>SABF226</span>
                  </a>
                </div>
              </div>

              {/* Copyright & Info */}
              <div className="text-center md:text-right">
                <h3 className="text-lg font-bold mb-4">📚 BIT English Club</h3>
                <p className="text-gray-400 text-sm mb-2">
                  JKD Grammar Master Class • Session 1 of 4
                </p>
                <p className="text-gray-500 text-xs">
                  Excellence in Grammar • Speed in Execution
                </p>
                <p className="text-gray-400 text-sm mt-4">
                  &copy; {new Date().getFullYear()} BIT English Club. All rights
                  reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
