import { useState, useEffect, useCallback } from "react";
import {
  BookOpen,
  Calculator,
  Microscope,
  Gavel,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  Lock,
  FileText,
} from "lucide-react";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import {
  getNonRepeatingQuestions,
  getAllQuestionsForStudy,
  fullQuestionBank,
} from "@/data/quizData";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const CATEGORIES = [
  {
    id: "physics_math",
    title: "Engineering & Tech",
    icon: Calculator,
    desc: "Advanced Math and Physics for Engineering (CSE, EEE, Civil).",
  },
  {
    id: "biology_chemistry",
    title: "Pharmacy & Biological",
    icon: Microscope,
    desc: "Biology and Chemistry for Pharmacy, Genetics & Medical.",
  },
  {
    id: "business_commerce",
    title: "BBA & Economics",
    icon: BookOpen,
    desc: "Business Math, Analytics, and Economics foundations.",
  },
  {
    id: "arts_law",
    title: "Law, Arts & General",
    icon: Gavel,
    desc: "English, Grammar, Analytical Logic and General Knowledge.",
  },
];

export default function Preparation() {
  const { role, loading, saveTestResult } = useAuth();
  const isAuthenticated = Boolean(role);

  const [testState, setTestState] = useState("selection");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const finishAndSaveTest = useCallback(
    async (finalScore) => {
      const newEntry = {
        id: Date.now(),
        category: selectedCategory,
        score: finalScore,
        total: questions.length,
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };

      try {
        await saveTestResult(newEntry);
      } catch (err) {
        console.error("Failed to sync test score:", err);
      }
      setTestState("result");
    },
    [selectedCategory, questions.length, saveTestResult],
  );

  useEffect(() => {
    let timer;
    if (testState === "playing" && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (
      testState === "playing" &&
      timeLeft === 0 &&
      questions.length > 0
    ) {
      finishAndSaveTest(score);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, testState, score, questions.length, finishAndSaveTest]);

  const startStudy = (category) => {
    setSelectedCategory(CATEGORIES.find((c) => c.id === category).title);
    setQuestions(getAllQuestionsForStudy(category));
    setTestState("studying");
  };

  const startMockTest = (category) => {
    const qList = getNonRepeatingQuestions(category, 10);
    setSelectedCategory(CATEGORIES.find((c) => c.id === category).title);
    setQuestions(qList);
    setScore(0);
    setCurrentQIndex(0);
    setTimeLeft(10 * 60);
    setIsAnswerChecked(false);
    setSelectedAnswer("");
    setTestState("playing");

    const used = JSON.parse(localStorage.getItem(`used_qs_${category}`)) || [];
    const total = fullQuestionBank[category].length;
    toast.info(
      `Generating set... (${total - used.length + 10} fresh questions left in bank)`,
    );
  };

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) {
      toast.error("Please select an answer!");
      return;
    }

    setIsAnswerChecked(true);
    const isCorrect = selectedAnswer === questions[currentQIndex].answer;
    const updatedScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(updatedScore);

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(currentQIndex + 1);
        setSelectedAnswer("");
        setIsAnswerChecked(false);
      } else {
        finishAndSaveTest(updatedScore);
      }
    }, 1500);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <Section className="min-h-[80vh]">
      <SectionHeading
        eyebrow="Phase 7: Admission Prep"
        title="Question Bank & Mock Tests"
        subtitle="Study over 500+ premium questions per department, then test your skills without facing repeated questions."
      />

      {loading ? (
        <div className="mt-12 text-center text-sm text-content-muted">
          Checking session...
        </div>
      ) : !isAuthenticated ? (
        <div className="mt-12 max-w-lg mx-auto card-base p-10 text-center shadow-lift border-t-4 border-t-amber-500">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-6">
            <Lock className="w-8 h-8" />
          </span>
          <h2 className="text-2xl font-bold text-content mb-3">
            Sign in Required
          </h2>
          <p className="text-content-muted mb-8 leading-relaxed">
            You need a free student account to study the question bank, take
            non-repeating mock tests, and track your scores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/login" className="w-full sm:w-auto px-8">
              Log In
            </Button>
            <Button
              to="/signup"
              variant="secondary"
              className="w-full sm:w-auto px-8"
            >
              Create Account
            </Button>
          </div>
        </div>
      ) : (
        <>
          {testState === "selection" && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="card-base p-6 transition hover:border-brand-500/50 hover:shadow-lift flex flex-col h-full"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-300 shrink-0">
                      <cat.icon className="w-7 h-7" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-content">
                        {cat.title}
                      </h3>
                      <p className="text-xs font-semibold text-brand-600 mt-1">
                        500+ Questions in Bank
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-content-muted mb-6 flex-1">
                    {cat.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-auto border-t border-line pt-4">
                    <Button
                      onClick={() => startStudy(cat.id)}
                      variant="secondary"
                      className="text-xs"
                    >
                      <FileText className="w-4 h-4 mr-1" /> Study Bank
                    </Button>
                    <Button
                      onClick={() => startMockTest(cat.id)}
                      className="text-xs"
                    >
                      <Clock className="w-4 h-4 mr-1" /> Mock Test
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {testState === "studying" && (
            <div className="mt-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-content">
                    {selectedCategory} Bank
                  </h2>
                  <p className="text-content-muted">
                    Review questions before taking the test.
                  </p>
                </div>
                <Button
                  onClick={() => setTestState("selection")}
                  variant="secondary"
                  size="sm"
                >
                  Back to Categories
                </Button>
              </div>

              <div className="grid gap-4">
                {questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="card-base p-5 border-l-4 border-l-brand-500"
                  >
                    <p className="font-semibold text-content mb-3">
                      <span className="text-brand-600 mr-2">Q{idx + 1}.</span>{" "}
                      {q.q}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm text-content-muted ml-7">
                      {q.o.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2 rounded-lg ${
                            opt === q.a
                              ? "bg-emerald-500/10 text-emerald-700 font-bold border border-emerald-500/30"
                              : "bg-surface border border-line"
                          }`}
                        >
                          {opt}{" "}
                          {opt === q.a && (
                            <CheckCircle2 className="inline w-4 h-4 ml-1" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {testState === "playing" && (
            <div className="mt-8 max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-6 bg-card p-4 rounded-2xl border border-line shadow-sm">
                <div className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                  {selectedCategory} • Q {currentQIndex + 1} /{" "}
                  {questions.length}
                </div>
                <div
                  className={`flex items-center gap-2 font-mono font-bold text-lg ${
                    timeLeft < 60 ? "text-red-500" : "text-content"
                  }`}
                >
                  <Clock className="w-5 h-5" /> {formatTime(timeLeft)}
                </div>
              </div>

              <div className="card-base p-8 shadow-lift">
                <h2 className="text-xl md:text-2xl font-bold text-content mb-8 leading-relaxed">
                  {questions[currentQIndex].question}
                </h2>

                <div className="grid gap-3 mb-8">
                  {questions[currentQIndex].options.map((opt, i) => {
                    const isCorrect = opt === questions[currentQIndex].answer;
                    const isSelected = selectedAnswer === opt;

                    let optionStyle =
                      "bg-card border-line hover:border-brand-500 hover:bg-brand-500/5 text-content";
                    if (isAnswerChecked) {
                      if (isCorrect)
                        optionStyle =
                          "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400";
                      else if (isSelected && !isCorrect)
                        optionStyle =
                          "bg-red-500/10 border-red-500 text-red-700 dark:text-red-400";
                      else
                        optionStyle =
                          "bg-card border-line opacity-50 text-content-muted";
                    } else if (isSelected) {
                      optionStyle =
                        "border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-300 ring-2 ring-brand-500/20";
                    }

                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={isAnswerChecked}
                        onClick={() => setSelectedAnswer(opt)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium flex justify-between items-center ${optionStyle}`}
                      >
                        {opt}
                        {isAnswerChecked && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        )}
                        {isAnswerChecked && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <Button
                  onClick={handleAnswerSubmit}
                  disabled={!selectedAnswer || isAnswerChecked}
                  size="lg"
                  className="w-full"
                >
                  {currentQIndex === questions.length - 1
                    ? "Finish Test"
                    : "Next Question"}
                </Button>
              </div>
            </div>
          )}

          {testState === "result" && (
            <div className="mt-12 max-w-xl mx-auto card-base p-10 text-center shadow-lift border-t-4 border-t-brand-500">
              <Award className="w-20 h-20 text-brand-500 mx-auto mb-6" />
              <h2 className="text-3xl font-extrabold text-content mb-2">
                Test Completed!
              </h2>
              <p className="text-content-muted mb-8">
                Your score has been saved to your dashboard.
              </p>

              <div className="bg-surface-muted rounded-2xl p-6 mb-8 border border-line">
                <p className="text-sm font-semibold uppercase tracking-wider text-content-muted mb-2">
                  Final Score
                </p>
                <div className="text-6xl font-black text-brand-600 dark:text-brand-400">
                  {score}{" "}
                  <span className="text-2xl text-content-muted">
                    / {questions.length}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setTestState("selection")}
                  variant="secondary"
                >
                  Take Another Test
                </Button>
                <Button to="/dashboard">View Score in Dashboard</Button>
              </div>
            </div>
          )}
        </>
      )}
    </Section>
  );
}
