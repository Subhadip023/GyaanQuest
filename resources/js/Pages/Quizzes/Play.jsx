import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Button from '@/Components/Button';

export default function Play({ auth, quiz, flash }) {
    const questions = quiz.question || [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const { data, setData, post, processing } = useForm({
        answers: {},
    });

    useEffect(() => {
        setData('answers', selectedAnswers);
    }, [selectedAnswers]);

    const currentQuestion = questions[currentIndex];
    const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

    const handleSelect = (answerId) => {
        console.log('Selected answer:', answerId, 'for question:', currentQuestion.id);
        setSelectedAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: answerId
        }));
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setShowResults(true);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleSubmit = () => {
        post(route('quizzes.submit', quiz.id));
    };

    if (questions.length === 0) {
        return (
            <AuthenticatedLayout auth={auth}>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800">No questions found for this quiz.</h2>
                        <Link href={route('dashboard')} className="mt-4 inline-block text-blue-600 hover:underline">Back to Dashboard</Link>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {quiz.name}
                    </h2>
                    <span className="text-sm font-medium text-gray-500">
                        Question {currentIndex + 1} of {questions.length}
                    </span>
                </div>
            }
        >
            <Head title={`Playing: ${quiz.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {/* Progress Bar */}
                    <div className="mb-8 overflow-hidden bg-gray-200 rounded-full h-2.5">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="bg-blue-600 h-2.5 rounded-full"
                        ></motion.div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-8">
                            {!showResults && !flash.score ? (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentQuestion.id}
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                            {currentQuestion.question}
                                        </h3>

                                        <div className="space-y-4">
                                            {currentQuestion.answers.map((answer) => (
                                                <div 
                                                    key={answer.id}
                                                    onClick={() => handleSelect(answer.id)}
                                                    className={`
                                                        p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-4
                                                        ${selectedAnswers[currentQuestion.id] === answer.id 
                                                            ? 'border-blue-500 bg-blue-50 shadow-md' 
                                                            : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'}
                                                    `}
                                                >
                                                    <div className={`
                                                        w-6 h-6 rounded-full border-2 flex items-center justify-center
                                                        ${selectedAnswers[currentQuestion.id] === answer.id 
                                                            ? 'border-blue-500 bg-blue-500' 
                                                            : 'border-gray-300'}
                                                    `}>
                                                        {selectedAnswers[currentQuestion.id] === answer.id && (
                                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                                        )}
                                                    </div>
                                                    <span className="text-lg text-gray-700">{answer.answare}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-10 flex justify-between h-12">
                                            <Button 
                                                btnType="outline" 
                                                onClick={handlePrev}
                                                disabled={currentIndex === 0}
                                            >
                                                Previous
                                            </Button>
                                            
                                            {currentIndex === questions.length - 1 ? (
                                                <Button 
                                                    btnType="primary" 
                                                    onClick={handleNext}
                                                    disabled={!selectedAnswers[currentQuestion.id]}
                                                >
                                                    Finish Quiz
                                                </Button>
                                            ) : (
                                                <Button 
                                                    btnType="primary" 
                                                    onClick={handleNext}
                                                    disabled={!selectedAnswers[currentQuestion.id]}
                                                >
                                                    Next Question
                                                </Button>
                                            )}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            ) : flash.score ? (
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100">
                                        <span className="text-4xl">🏆</span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h3>
                                    <p className="text-gray-600 mb-8">Great job on finishing {quiz.name}.</p>
                                    
                                    <div className="bg-gray-50 rounded-2xl p-8 max-w-sm mx-auto mb-10">
                                        <div className="text-5xl font-extrabold text-blue-600 mb-2">
                                            {Math.round(flash.score)}%
                                        </div>
                                        <div className="text-gray-500 font-medium">
                                            Score: {flash.correctCount} / {flash.totalCount}
                                        </div>
                                    </div>

                                    <Link href={route('dashboard')}>
                                        <Button btnType="primary" className="px-10 py-3 text-lg">
                                            Back to Dashboard
                                        </Button>
                                    </Link>
                                </motion.div>
                            ) : (
                                <div className="text-center py-10">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to submit?</h3>
                                    <p className="text-gray-600 mb-10">You've answered all questions. Review your answers or submit now.</p>
                                    
                                    <div className="flex flex-col gap-4 max-w-xs mx-auto">
                                        <Button 
                                            btnType="primary" 
                                            className="w-full justify-center"
                                            onClick={handleSubmit}
                                            disabled={processing}
                                        >
                                            {processing ? 'Submitting...' : 'Submit Now'}
                                        </Button>
                                        <Button 
                                            btnType="outline" 
                                            className="w-full justify-center"
                                            onClick={() => setShowResults(false)}
                                        >
                                            Review Answers
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
