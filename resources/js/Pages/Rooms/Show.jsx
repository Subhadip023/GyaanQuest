import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ room, auth }) {
    const isOwner = auth?.user?.id === room.user_id;
    const [tab, setTab] = useState('quizzes'); // 'quizzes' | 'members'
    const [showInvite, setShowInvite] = useState(false);
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
        <AuthenticatedLayout header={
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{room.name}</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{room.description}</p>
                </div>
                <div className="flex items-center gap-3">
                    <code className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg font-mono font-bold">
                        Code: {room.code}
                    </code>
                    {isOwner ? (
                        <button onClick={handleDelete} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition">
                            Delete Room
                        </button>
                    ) : (
                        <button onClick={handleLeave} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition">
                            Leave Room
                        </button>
                    )}
                </div>
            </div>
        }>
            <Head title={room.name} />

            <div className="py-10 px-4 max-w-5xl mx-auto space-y-8">

                {/* Tab Navigation */}
                <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
                    {['quizzes', 'members'].map(t => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
                            {t === 'quizzes' ? `📝 Quizzes (${room.quizzes?.length ?? 0})` : `👥 Members (${room.members?.length ?? 0})`}
                        </button>
                    ))}
                </div>

                {/* Quizzes Tab */}
                {tab === 'quizzes' && (
                    <div className="space-y-4">
                        {isOwner && (
                            <div className="flex justify-end">
                                <button onClick={() => setShowAssign(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition">
                                    + Assign Quiz
                                </button>
                            </div>
                        )}
                        {(room.quizzes ?? []).length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                                <p className="text-4xl mb-3">📝</p>
                                <p className="text-gray-400">No quizzes assigned yet.</p>
                            </div>
                        ) : (room.quizzes ?? []).map(quiz => (
                            <div key={quiz.id} className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-between shadow-sm">
                                <div>
                                    <h3 className="font-bold text-gray-800">{quiz.name}</h3>
                                    <p className="text-sm text-gray-400 mt-1">{quiz.question?.length ?? 0} questions</p>
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
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm divide-y divide-gray-50">
                        {(room.members ?? []).map(member => (
                            <div key={member.id} className="flex items-center justify-between px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
                                        {member.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{member.name}</p>
                                        <p className="text-xs text-gray-400">{member.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${member.pivot?.role === 'teacher' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
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
            {showAssign && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Assign Quiz to Room</h2>
                        <form onSubmit={handleAssign} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Quiz ID</label>
                                <input type="number" value={assignForm.data.quiz_id} onChange={e => assignForm.setData('quiz_id', e.target.value)}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Available From</label>
                                    <input type="datetime-local" value={assignForm.data.available_from} onChange={e => assignForm.setData('available_from', e.target.value)}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Available Until</label>
                                    <input type="datetime-local" value={assignForm.data.available_until} onChange={e => assignForm.setData('available_until', e.target.value)}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none text-sm" />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowAssign(false)} className="flex-1 py-2 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
                                <button type="submit" disabled={assignForm.processing} className="flex-1 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50">
                                    {assignForm.processing ? 'Assigning...' : 'Assign'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
