import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import Button from '@/Components/Button';

export default function Dashboard({ allQuizzes = [], recentScores = [] }) {
    return (
        <AdminLayout
            title="Dashboard"
            heading="My Learning Dashboard"
            showHeading={true}
            showBgBox={false}
        >
            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome back! 👋</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Knowledge is power. What are you learning today?</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Quiz Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white px-2">Available Quizzes</h2>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden divide-y divide-gray-100 dark:divide-gray-700">
                            {allQuizzes.length === 0 ? (
                                <div className="p-10 text-center text-gray-400 dark:text-gray-500 italic">
                                    No quizzes available yet. Check back later!
                                </div>
                            ) : (
                                allQuizzes.map((quiz) => (
                                    <div key={quiz.id} className="p-6 flex items-center justify-between text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{quiz.name}</h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md line-clamp-1">
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
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white px-2">Recent Performance</h2>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            {recentScores.length === 0 ? (
                                <div className="text-center py-10">
                                    <div className="text-4xl mb-3">📈</div>
                                    <p className="text-gray-400 dark:text-gray-500">Complete a quiz to see your progress!</p>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    {recentScores.map((score) => (
                                        <div key={score.id} className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${
                                                score.score >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' : 
                                                score.score >= 50 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300' : 
                                                'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                                            }`}>
                                                {Math.round(score.score)}%
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="font-bold text-gray-800 dark:text-white truncate text-sm">{score.quiz?.name || 'Quiz'}</p>
                                                <p className="text-gray-400 dark:text-gray-500 text-xs">{new Date(score.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <p className="text-xs text-center text-gray-400 dark:text-gray-500 italic">Showing your last {recentScores.length} attempts</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
