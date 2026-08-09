import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function QuizLeaderboard({ quiz, scores = [] }) {
    const medalColors = ['🥇', '🥈', '🥉'];

    return (
        <AuthenticatedLayout header={
            <div className="flex items-center gap-4">
                <Link href={route('leaderboard.index')} className="text-indigo-500 hover:underline text-sm">← All Leaderboards</Link>
                <h2 className="text-xl font-semibold text-gray-800">{quiz.name} — Leaderboard</h2>
            </div>
        }>
            <Head title={`${quiz.name} Leaderboard`} />

            <div className="py-10 px-4 max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-800">Top Scores</h3>
                        <span className="text-sm text-gray-400">{scores.length} participants</span>
                    </div>

                    <div className="divide-y divide-gray-50">
                        {scores.length === 0 ? (
                            <p className="text-center py-16 text-gray-400">No attempts yet. Be the first!</p>
                        ) : scores.map((entry, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                                className="flex items-center px-8 py-4 hover:bg-gray-50 transition-colors">
                                <div className="w-10 text-center font-bold text-gray-400 text-sm">
                                    {i < 3 ? medalColors[i] : `#${i + 1}`}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 ml-4">
                                    {entry.user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="font-semibold text-gray-800">{entry.user?.name}</p>
                                    <p className="text-xs text-gray-400">{entry.date}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${entry.score >= 80 ? 'bg-green-50 text-green-600' : entry.score >= 50 ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-500'}`}>
                                    {entry.score}%
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
