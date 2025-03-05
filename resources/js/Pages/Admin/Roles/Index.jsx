import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

function Index({ roles, permissions }) {
    const [openModal, setOpenModal] = useState(false);
    const [openPermissionModal, setOpenPermissionModal] = useState(false);
    const [searchRole, setSearchRole] = useState(null);
    const [filterRoles, setFilterRoles] = useState(roles);
    const createRoleForm = useForm('createRoleForm', {
        name: null,
        permissions: []
    });
    const createPermissionForm = useForm('createPermissionForm', {
        name: null
    });

    const lastrow = filterRoles.length - 1;


    const submitAddRoleForm = (e) => {
        e.preventDefault();

        createRoleForm.post(route('roles.store'), {
            preserveScroll: true,
            onSuccess: () => {
                createRoleForm.reset();
                setOpenModal(false);
            },
            // onError
        });
    };

    const submitAddPermission = (e) => {
        e.preventDefault();

        createPermissionForm.post(route('permissions.store'), {
            preserveScroll: true,
            onSuccess: () => {
                createPermissionForm.reset();
                setOpenPermissionModal(false);
                setFilterRoles(roles);
            },
            onError: (errors) => {
                setOpenPermissionModal(true);
                console.error("Validation Errors:", errors);
            }
        });
    };
    const handleSearchRoles = (e) => {
        const value = e.target.value;
        setSearchRole(value);

        if (!value) {
            setFilterRoles(roles); // Reset to all roles when input is empty
            return;
        }

        setFilterRoles(roles.filter((role) => role.name.includes(value)));


    };


    return (
        <AdminLayout title="Role" heading="Roles">

            {/* Modal for Creating Roles */}
            <Modal show={openModal} onClose={() => setOpenModal(false)} maxWidth="lg" className="dark:text-white">
                <div className="p-5 dark:text-white">
                    <form onSubmit={submitAddRoleForm}>
                        <div className="w-4/5 p-5 flex flex-col items-center justify-center mx-auto">
                            {/* Role Name Input */}
                            <div className="mb-6 w-full">
                                <InputLabel value="Enter Role Name" />
                                <TextInput
                                    name="name"
                                    className="w-full"
                                    value={createRoleForm.data.name}
                                    onChange={(e) => createRoleForm.setData('name', e.target.value)}
                                />
                                {createRoleForm.errors.name && <InputError message={createRoleForm.errors.name} />}
                            </div>

                            {/* Permissions Checkboxes */}
                            <div className="mb-6 w-full">
                                <InputLabel value="Assign Permissions" />
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    {permissions.map((permission, index) => (
                                        <label key={index} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value={permission}
                                                checked={createRoleForm.data.permissions.includes(permission)}
                                                onChange={(e) => {
                                                    const selectedPermissions = createRoleForm.data.permissions.includes(permission)
                                                        ? createRoleForm.data.permissions.filter((p) => p !== permission)
                                                        : [...createRoleForm.data.permissions, permission];

                                                    createRoleForm.setData('permissions', selectedPermissions);
                                                }}
                                            />
                                            <span className="text-gray-700 dark:text-gray-400">{permission}</span>
                                        </label>
                                    ))}
                                </div>
                                {createRoleForm.errors.permissions && <InputError message={createRoleForm.errors.permissions} />}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="w-full p-5 flex items-center gap-x-2 justify-end">
                            <button
                                className="px-5 py-2 flex items-center gap-x-2 text-white rounded-lg hover:bg-gray-700 bg-gray-500 duration-200"
                                onClick={(e) => { e.preventDefault(); setOpenModal(false); }}
                            >
                                Close
                            </button>

                            <button
                                disabled={createRoleForm.processing}
                                type="submit"
                                className={`px-5 py-2 flex items-center gap-x-2 text-white rounded-lg 
                                ${createRoleForm.processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'} 
                                bg-blue-700 duration-200`}
                            >
                                {createRoleForm.processing ? "Creating Role ..." : "Create Role"}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Modal for Creating Permissions */}
            <Modal show={openPermissionModal} onClose={() => setOpenPermissionModal(false)} maxWidth="sm">
                <div className="p-5">
                    <form onSubmit={submitAddPermission}>
                        <div className="mb-6 w-full">
                            <InputLabel value="Enter Role Name" />
                            <TextInput
                                name="name"
                                className="w-full"
                                value={createPermissionForm.data.name}
                                onChange={(e) => createPermissionForm.setData('name', e.target.value)}
                            />
                            {createPermissionForm.errors.name && <InputError message={createPermissionForm.errors.name} />}
                        </div>
                        <div className="w-full  flex items-center gap-x-2 justify-center">
                            <button
                                className="px-5 py-2 flex items-center gap-x-2 text-white rounded-lg hover:bg-gray-700 bg-gray-500 duration-200"
                                onClick={(e) => { e.preventDefault(); setOpenPermissionModal(false); }}
                            >
                                Close
                            </button>

                            <button
                                disabled={createPermissionForm.processing}
                                type="submit"
                                className={`px-5 py-2 flex items-center gap-x-2 text-white rounded-lg 
                                    ${createPermissionForm.processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'} 
                                    bg-blue-700 duration-200`}
                            >
                                {createPermissionForm.processing ? "Creating Permission ..." : "Create Permission"}
                            </button>
                        </div>

                    </form>
                </div>
            </Modal>




            {/* Table Section */}
            <section className="text-gray-600 body-font py-2">
                <div className="flex items-center justify-between mb-5">
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input

                            value={searchRole}
                            type="text"
                            id="search-navbar"
                            className="block w-64 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Role Name"
                            onChange={handleSearchRoles}
                        />
                    </div>
                    <div className="flex items-center gap-x-2"> <button
                        onClick={() => setOpenModal(true)}
                        className="px-5 py-2 flex items-center gap-x-2 text-white rounded-lg hover:bg-blue-500 bg-blue-700 duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                        </svg> Role                    </button>
                        <button
                            onClick={() => setOpenPermissionModal(true)}
                            className="px-5 py-2 flex items-center gap-x-2 text-white rounded-lg hover:bg-blue-500 bg-blue-700 duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                            </svg> Permission
                        </button></div>
                </div>

                <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                    <table className="table-auto w-full text-left whitespace-no-wrap">
                        <thead className="border-b-2 border-gray-500 dark:border-gray-100">
                            <tr>
                                <th className="px-4 py-3 font-medium text-gray-900 dark:text-gray-50 text-lg">#</th>
                                <th className="px-4 py-3 font-medium text-gray-900 dark:text-gray-50 text-lg">Name</th>
                                <th className="px-4 py-3 font-medium text-gray-900 dark:text-gray-50 text-lg">Permissions</th>
                                <th className="px-4 py-3 font-medium text-gray-900 dark:text-gray-50 text-lg">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterRoles.length == 0 ? <div className="text-red-500  font-bold w-full  my-5">No Role Present </div> : filterRoles.map((role, index) => (
                                <tr key={role.id || index} className={`${index == lastrow ? "" : 'border-b-2 border-gray-300'}`}>
                                    <td className="px-4 py-3 dark:text-gray-100">{index + 1}</td>
                                    <td className="px-4 py-3 dark:text-gray-100">{role.name}</td>
                                    <td className="px-4 py-3 dark:text-gray-100">{role.permissions?.map(p => p.name).join(", ") || "No Permissions"}</td>
                                    <td className="px-4 py-3 dark:text-gray-100">edit delete</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </AdminLayout>
    );
}

export default Index;
