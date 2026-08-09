import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormModal from '@/Components/FormModal';

export default function Index({ ownedRooms = [], joinedRooms = [] }) {
    const [tab, setTab] = useState('joined'); // 'joined' | 'owned'
    const [showCreate, setShowCreate] = useState(false);
    const [showJoin, setShowJoin] = useState(false);

    const createForm = useForm({ name: '', description: '' });
    const joinForm = useForm({ code: '' });

    const handleCreate = (e) => {
        e.preventDefault();
        createForm.post(route('rooms.store'), {
            onSuccess: () => { setShowCreate(false); createForm.reset(); },
        });
    };

    const handleJoin = (e) => {
        e.preventDefault();
        joinForm.post(route('rooms.join'), {
            onSuccess: () => { setShowJoin(false); joinForm.reset(); },
        });
    };

    const rooms = tab === 'owned' ? ownedRooms : joinedRooms;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">Rooms & Classrooms</h2>}>
            <Head title="Rooms" />

            <div className="py-10 px-4 max-w-6xl mx-auto space-y-8">

                {/* Header Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Tabs */}
                    <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                        {['joined', 'owned'].map(t => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {t === 'joined' ? '🎓 Joined' : '🏫 My Rooms'}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowJoin(true)}
                            className="px-4 py-2 rounded-lg border-2 border-indigo-500 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
                        >
                            Enter Code
                        </button>
                        <button
                            onClick={() => setShowCreate(true)}
                            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                        >
                            + Create Room
                        </button>
                    </div>
                </div>

                {/* Room Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {rooms.length === 0 ? (
                            <div className="col-span-3 py-20 text-center">
                                <p className="text-5xl mb-4">🏫</p>
                                <p className="text-gray-500 text-lg">
                                    {tab === 'joined' ? "You haven't joined any rooms yet." : "You haven't created any rooms yet."}
                                </p>
                            </div>
                        ) : rooms.map((room) => (
                            <motion.div
                                key={room.id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">{room.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                            {room.description || 'No description'}
                                        </p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${room.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {room.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <span>👥 {room.members?.length ?? 0} members</span>
                                    <span>📝 {room.quizzes?.length ?? 0} quizzes</span>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-indigo-600">
                                        {room.code}
                                    </code>
                                    <Link
                                        href={route('rooms.show', room.id)}
                                        className="px-4 py-1.5 bg-indigo-50 text-indigo-600 font-semibold text-sm rounded-lg hover:bg-indigo-100 transition"
                                    >
                                        Enter →
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Create Room Modal */}
            <FormModal
                show={showCreate}
                onClose={() => setShowCreate(false)}
                onSubmit={handleCreate}
                title="Create a Room"
                description="Set up a virtual classroom for your students."
                submitText="Create Room"
                processing={createForm.processing}
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Room Name</label>
                    <input
                        type="text"
                        value={createForm.data.name}
                        onChange={e => createForm.setData('name', e.target.value)}
                        className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                        placeholder="e.g. Grade 10 Science"
                        required
                    />
                    {createForm.errors.name && <p className="text-red-500 text-xs mt-1">{createForm.errors.name}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Description (optional)</label>
                    <textarea
                        value={createForm.data.description}
                        onChange={e => createForm.setData('description', e.target.value)}
                        className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none h-24 resize-none"
                        placeholder="What is this room about?"
                    />
                </div>
            </FormModal>

            {/* Join Room Modal */}
            <FormModal
                show={showJoin}
                onClose={() => setShowJoin(false)}
                onSubmit={handleJoin}
                title="Join a Room"
                description="Enter the 6-character room code provided by your teacher."
                submitText="Join Room"
                processing={joinForm.processing}
                maxWidth="sm"
            >
                <div>
                    <input
                        type="text"
                        value={joinForm.data.code}
                        onChange={e => joinForm.setData('code', e.target.value.toUpperCase())}
                        maxLength={6}
                        className="w-full border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-3 text-center text-2xl font-mono tracking-widest focus:ring-2 focus:ring-indigo-400 outline-none uppercase"
                        placeholder="ABC123"
                        required
                    />
                    {joinForm.errors.code && <p className="text-red-500 text-xs mt-1 text-center">{joinForm.errors.code}</p>}
                </div>
            </FormModal>
        </AuthenticatedLayout>
    );
}
