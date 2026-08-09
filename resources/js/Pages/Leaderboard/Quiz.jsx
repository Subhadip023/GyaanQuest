import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function QuizLeaderboard({ quiz, scores = [] }) {
    const medalColors = ['🥇', '🥈', '🥉'];

    return (
        <AdminLayout
            title={`${quiz.name} Leaderboard`}
            heading={`${quiz.name} — Leaderboard`}
            showHeading={true}
            showBgBox={false}
        >
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <Link href={route('leaderboard.index')} className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-semibold flex items-center gap-1">
                        ← Back to All Leaderboards
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="px-8 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Top Scores</h3>
                        <span className="text-sm text-gray-400 dark:text-gray-500">{scores.length} participants</span>
                    </div>

                    <div className="divide-y divide-gray-50 dark:divide-gray-700">
                        {scores.length === 0 ? (
                            <p className="text-center py-16 text-gray-400 dark:text-gray-500">No attempts yet. Be the first!</p>
                        ) : scores.map((entry, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                                className="flex items-center px-8 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                <div className="w-10 text-center font-bold text-gray-400 dark:text-gray-500 text-sm">
                                    {i < 3 ? medalColors[i] : `#${i + 1}`}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center font-bold text-indigo-700 dark:text-indigo-300 ml-4">
                                    {entry.user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="font-semibold text-gray-800 dark:text-white">{entry.user?.name}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">{entry.date}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                    entry.score >= 80 ? 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-300' : 
                                    entry.score >= 50 ? 'bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-300' : 
                                    'bg-red-50 text-red-500 dark:bg-red-950 dark:text-red-300'
                                }`}>
                                    {entry.score}%
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
