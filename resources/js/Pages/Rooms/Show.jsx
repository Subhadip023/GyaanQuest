import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import FormModal from '@/Components/FormModal';

export default function Show({ room, auth }) {
    const isOwner = auth?.user?.id === room.user_id;
    const [tab, setTab] = useState('quizzes'); // 'quizzes' | 'members'
    const [showAssign, setShowAssign] = useState(false);

    const assignForm = useForm({ quiz_id: '', available_from: '', available_until: '' });

    const handleAssign = (e) => {
        e.preventDefault();
        assignForm.post(route('rooms.quizzes.assign', room.id), {
            onSuccess: () => { setShowAssign(false); assignForm.reset(); },
        });
    };

    const handleLeave = () => {
        if (confirm('Are you sure you want to leave this room?')) {
            router.delete(route('rooms.leave', room.id));
        }
    };

    const handleDelete = () => {
        if (confirm('Permanently delete this room and all its data?')) {
            router.delete(route('rooms.destroy', room.id));
        }
    };

    const removeMember = (userId) => {
        if (confirm('Remove this member from the room?')) {
            router.delete(route('rooms.members.remove', room.id), { data: { user_id: userId } });
        }
    };

    return (
        <AdminLayout
            title={room.name}
            heading={room.name}
            showHeading={true}
            showBgBox={false}
        >
            <div className="space-y-8">
                {/* Header Actions & Code */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{room.description || 'No description provided.'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <code className="text-sm bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 px-4 py-2 rounded-xl font-mono font-bold">
                            Code: {room.code}
                        </code>
                        {isOwner ? (
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-xl text-sm font-semibold hover:bg-red-100 transition">
                                Delete Room
                            </button>
                        ) : (
                            <button onClick={handleLeave} className="px-4 py-2 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-xl text-sm font-semibold hover:bg-red-100 transition">
                                Leave Room
                            </button>
                        )}
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
                    {['quizzes', 'members'].map(t => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}>
                            {t === 'quizzes' ? `📝 Quizzes (${room.quizzes?.length ?? 0})` : `👥 Members (${room.members?.length ?? 0})`}
                        </button>
                    ))}
                </div>

                {/* Quizzes Tab */}
                {tab === 'quizzes' && (
                    <div className="space-y-4">
                        {isOwner && (
                            <div className="flex justify-end">
                                <button onClick={() => setShowAssign(true)} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition shadow-sm">
                                    + Assign Quiz
                                </button>
                            </div>
                        )}
                        {(room.quizzes ?? []).length === 0 ? (
                            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <p className="text-4xl mb-3">📝</p>
                                <p className="text-gray-400 dark:text-gray-500">No quizzes assigned yet.</p>
                            </div>
                        ) : (room.quizzes ?? []).map(quiz => (
                            <div key={quiz.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 flex items-center justify-between shadow-sm">
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-white text-lg">{quiz.name}</h3>
                                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{quiz.question?.length ?? 0} questions</p>
                                </div>
                                <Link href={route('quizzes.show', quiz.id)}
                                    className="px-5 py-2 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition">
                                    Take Quiz →
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                {/* Members Tab */}
                {tab === 'members' && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm divide-y divide-gray-50 dark:divide-gray-700">
                        {(room.members ?? []).map(member => (
                            <div key={member.id} className="flex items-center justify-between px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center font-bold text-indigo-700 dark:text-indigo-300">
                                        {member.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-white">{member.name}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">{member.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${member.pivot?.role === 'teacher' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'}`}>
                                        {member.pivot?.role ?? 'student'}
                                    </span>
                                    {isOwner && member.id !== room.user_id && (
                                        <button onClick={() => removeMember(member.id)}
                                            className="text-red-400 hover:text-red-600 text-xs font-semibold transition">
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Assign Quiz Modal */}
            <FormModal
                show={showAssign}
                onClose={() => setShowAssign(false)}
                onSubmit={handleAssign}
                title="Assign Quiz to Room"
                description="Select a quiz ID and set optional availability dates."
                submitText="Assign Quiz"
                processing={assignForm.processing}
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Quiz ID</label>
                    <input type="number" value={assignForm.data.quiz_id} onChange={e => assignForm.setData('quiz_id', e.target.value)}
                        className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Available From</label>
                        <input type="datetime-local" value={assignForm.data.available_from} onChange={e => assignForm.setData('available_from', e.target.value)}
                            className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Available Until</label>
                        <input type="datetime-local" value={assignForm.data.available_until} onChange={e => assignForm.setData('available_until', e.target.value)}
                            className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none text-sm" />
                    </div>
                </div>
            </FormModal>
        </AdminLayout>
    );
}
