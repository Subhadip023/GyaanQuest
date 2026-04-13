import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Button from '@/Components/Button';
export default function Dashboard({ allQuizzes = [], recentScores = [] }) {
    console.log({ allQuizzes, recentScores });
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Learning Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Welcome Section */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome back! 👋</h1>
                            <p className="text-gray-500 text-lg">Knowledge is power. What are you learning today?</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Quiz Feed */}
                        <div className="lg:col-span-2 space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 px-2">Available Quizzes</h2>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                                {allQuizzes.length === 0 ? (
                                    <div className="p-10 text-center text-gray-400 italic">
                                        No quizzes available yet. Check back later!
                                    </div>
                                ) : (
                                    allQuizzes.map((quiz) => (
                                        <div key={quiz.id} className="p-6 flex items-center justify-between text-gray-900 hover:bg-gray-50 transition-colors">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-800 mb-1">{quiz.name}</h3>
                                                <p className="text-gray-500 text-sm max-w-md line-clamp-1">
                                                    {quiz.description || 'Test your knowledge in this subject.'}
                                                </p>
                                            </div>
                                            <Link href={route('quizzes.show', quiz.id)}>
                                                <Button btnType="primary" className="px-6">Take Quiz</Button>
                                            </Link>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Stats/Recent Performance */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 px-2">Recent Performance</h2>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                {recentScores.length === 0 ? (
                                    <div className="text-center py-10">
                                        <div className="text-4xl mb-3">📈</div>
                                        <p className="text-gray-400">Complete a quiz to see your progress!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-5">
                                        {recentScores.map((score) => (
                                            <div key={score.id} className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${
                                                    score.score >= 80 ? 'bg-green-100 text-green-700' : 
                                                    score.score >= 50 ? 'bg-yellow-100 text-yellow-700' : 
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                    {Math.round(score.score)}%
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <p className="font-bold text-gray-800 truncate text-sm">{score.quiz.name}</p>
                                                    <p className="text-gray-400 text-xs">{new Date(score.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="pt-4 border-t border-gray-100">
                                            <p className="text-xs text-center text-gray-400 italic">Showing your last {recentScores.length} attempts</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
