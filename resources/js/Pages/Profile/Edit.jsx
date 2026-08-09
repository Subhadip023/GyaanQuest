import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AdminLayout
            title="Profile"
            heading="Profile Settings"
            showHeading={true}
            showBgBox={false}
        >
            <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 shadow-sm sm:rounded-2xl sm:p-8 border border-gray-100 dark:border-gray-700">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 shadow-sm sm:rounded-2xl sm:p-8 border border-gray-100 dark:border-gray-700">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 shadow-sm sm:rounded-2xl sm:p-8 border border-gray-100 dark:border-gray-700">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AdminLayout>
    );
}
