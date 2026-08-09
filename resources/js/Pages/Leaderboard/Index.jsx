import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Index({ topUsers = [], quizLeaderboards = [] }) {
    const medalColors = ['🥇', '🥈', '🥉'];

    const scoreColor = (score) => {
        if (score >= 80) return 'text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-300';
        if (score >= 50) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-300';
        return 'text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-300';
    };

    return (
        <AdminLayout
            title="Leaderboard"
            heading="🏆 Global Leaderboard"
            showHeading={true}
            showBgBox={false}
        >
            <div className="space-y-10">
                {/* Top 3 Podium */}
                {topUsers.length > 0 && (
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg">
                        <h3 className="text-center text-2xl font-bold mb-8 opacity-90">Global Top Players</h3>
                        <div className="flex items-end justify-center gap-6">
                            {/* 2nd */}
                            {topUsers[1] && (
                                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                                    className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold mb-2">
                                        {topUsers[1].user?.name?.charAt(0)}
                                    </div>
                                    <p className="font-semibold text-sm">{topUsers[1].user?.name}</p>
                                    <p className="text-xs opacity-70">{Math.round(topUsers[1].avg_score)}%</p>
                                    <div className="mt-3 w-20 h-24 bg-white/20 rounded-t-2xl flex items-center justify-center text-3xl">🥈</div>
                                </motion.div>
                            )}
                            {/* 1st */}
                            {topUsers[0] && (
                                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                    className="flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-bold mb-2 shadow-lg text-gray-900">
                                        {topUsers[0].user?.name?.charAt(0)}
                                    </div>
                                    <p className="font-bold">{topUsers[0].user?.name}</p>
                                    <p className="text-sm opacity-70">{Math.round(topUsers[0].avg_score)}%</p>
                                    <div className="mt-3 w-20 h-32 bg-yellow-400/30 rounded-t-2xl flex items-center justify-center text-4xl">🥇</div>
                                </motion.div>
                            )}
                            {/* 3rd */}
                            {topUsers[2] && (
                                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                                    className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold mb-2">
                                        {topUsers[2].user?.name?.charAt(0)}
                                    </div>
                                    <p className="font-semibold text-sm">{topUsers[2].user?.name}</p>
                                    <p className="text-xs opacity-70">{Math.round(topUsers[2].avg_score)}%</p>
                                    <div className="mt-3 w-20 h-16 bg-orange-400/30 rounded-t-2xl flex items-center justify-center text-3xl">🥉</div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                )}

                {/* Full Rankings Table */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="px-8 py-5 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Overall Rankings</h3>
                    </div>
                    <div className="divide-y divide-gray-50 dark:divide-gray-700">
                        {topUsers.length === 0 ? (
                            <p className="text-center py-16 text-gray-400 dark:text-gray-500">No scores yet. Be the first!</p>
                        ) : topUsers.map((entry, i) => (
                            <motion.div key={entry.user_id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                                className="flex items-center px-8 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                <div className="w-10 text-center font-bold text-gray-400 dark:text-gray-500 text-sm">
                                    {i < 3 ? medalColors[i] : `#${i + 1}`}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center font-bold text-indigo-700 dark:text-indigo-300 ml-4">
                                    {entry.user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="font-semibold text-gray-800 dark:text-white">{entry.user?.name ?? 'Unknown'}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">{entry.quizzes_taken} quiz{entry.quizzes_taken !== 1 ? 'zes' : ''} taken</p>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${scoreColor(entry.avg_score)}`}>
                                        {Math.round(entry.avg_score)}%
                                    </span>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Best: {Math.round(entry.best_score)}%</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Per-Quiz Leaderboards */}
                {quizLeaderboards.length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Quiz Leaderboards</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {quizLeaderboards.map(quiz => (
                                <div key={quiz.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                                        <h4 className="font-bold text-gray-800 dark:text-white">{quiz.name}</h4>
                                        <Link href={route('leaderboard.quiz', quiz.id)}
                                            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                                            Full board →
                                        </Link>
                                    </div>
                                    <div className="divide-y divide-gray-50 dark:divide-gray-700">
                                        {(quiz.scores ?? []).slice(0, 5).map((score, i) => (
                                            <div key={score.id} className="flex items-center px-6 py-3">
                                                <span className="w-6 text-sm text-gray-400 dark:text-gray-500 font-medium">{i < 3 ? medalColors[i] : `${i + 1}.`}</span>
                                                <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 ml-3">{score.user?.name}</span>
                                                <span className={`text-sm font-bold ${score.score >= 80 ? 'text-green-600 dark:text-green-400' : score.score >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-500 dark:text-red-400'}`}>
                                                    {Math.round(score.score)}%
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
