import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function InvitationsIndex({ invitations = [] }) {
    const accept = (token) => router.get(route('invitations.accept', token));

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">📬 My Invitations</h2>}>
            <Head title="Invitations" />

            <div className="py-10 px-4 max-w-3xl mx-auto space-y-4">
                {invitations.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                        <p className="text-5xl mb-4">📭</p>
                        <p className="text-gray-400 text-lg">No pending invitations.</p>
                    </div>
                ) : invitations.map(inv => (
                    <div key={inv.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-gray-800">{inv.quiz?.name}</h3>
                            <p className="text-sm text-gray-400 mt-1">
                                Expires {new Date(inv.expires_at).toLocaleDateString()}
                            </p>
                        </div>
                        <button
                            onClick={() => accept(inv.token)}
                            className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition"
                        >
                            Accept →
                        </button>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
