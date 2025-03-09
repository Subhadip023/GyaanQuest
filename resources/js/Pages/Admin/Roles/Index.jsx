import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import ScButton from "@/Components/ScButton";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import Highlighter from "react-highlight-words";
import EditBtn from "@/Components/EditBtn";
import DeleteBtn from "@/Components/DeleteBtn";




function Index({ roles, permissions }) {
    const [openModal, setOpenModal] = useState(false);
    const [openPermissionModal, setOpenPermissionModal] = useState(false);
    const [searchRole, setSearchRole] = useState(null);
    const [filterRoles, setFilterRoles] = useState(roles);
    const [selectNumbers, setSelectNumbers] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
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
                setIsLoading(false);
                setFilterRoles(roles)

                console.log(roles);

            },
            onError: () => {
                setOpenModal(true)
            }
        });
        setIsLoading(false);
    };

    const submitAddPermission = (e) => {
        setIsLoading(true);
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
        setIsLoading(false);

    };

    const handleSearchRoles = (value) => {
        setSearchRole(value);

        if (!value) {
            setFilterRoles(roles);
            return;
        }

        setFilterRoles(
            roles.filter((role) =>
                role.name.toLowerCase().includes(value.toLowerCase()) || // Search by role name
                role.permissions.some((permission) =>
                    permission.name.toLowerCase().includes(value.toLowerCase()) // Search by permission name
                )
            )
        );
    };
    const handleDisplayChange = (e) => {
        const value = e.target.value;
        setSelectNumbers(value);  // Store selected value

        if (value !== "all") {
            setFilterRoles(roles.slice(0, Number(value))); // Use slice instead of splice
        } else {
            setFilterRoles(roles); // Show all roles when "all" is selected
        }
    };




    return (
        <AdminLayout title="Role" heading="Roles" loading={isLoading} searchFunction={handleSearchRoles} serachBoxPlaceHolder="Search by role or permiission name">

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
                            <ScButton
                                onClick={(e) => { e.preventDefault(); setOpenModal(false); }}
                                btnType="secondary"
                                disabled={createRoleForm.processing}
                            >
                                Close
                            </ScButton>

                            <ScButton
                                disabled={createRoleForm.processing}
                                type="submit"
                                btnType="success"
                            >
                                {createRoleForm.processing ? "Creating Role ..." : "Create Role"}
                            </ScButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Modal for Creating Permissions */}
            <Modal show={openPermissionModal} onClose={() => setOpenPermissionModal(false)} maxWidth="sm">
                <div className="p-5">
                    <form onSubmit={submitAddPermission}>
                        <div className="mb-6 w-full">
                            <InputLabel value="Enter Permission Name" />
                            <TextInput
                                name="name"
                                className="w-full"
                                value={createPermissionForm.data.name}
                                onChange={(e) => createPermissionForm.setData('name', e.target.value)}
                            />
                            {createPermissionForm.errors.name && <InputError message={createPermissionForm.errors.name} />}
                        </div>
                        <div className="w-full  flex items-center gap-x-2 justify-center">
                            <ScButton
                                disabled={createRoleForm.processing}
                                btnType="secondary" onClick={(e) => { e.preventDefault(); setOpenPermissionModal(false); }}
                            >
                                Close
                            </ScButton>

                            <ScButton
                                disabled={createPermissionForm.processing}
                                type="submit"
                                btnType="success"
                            >
                                {createPermissionForm.processing ? "Creating Permission ..." : "Create Permission"}
                            </ScButton>
                        </div>

                    </form>
                </div>
            </Modal>




            <section className="text-gray-600 dark:text-white body-font py-2 w-full">
                <div className="w-full flex items-center justify-between mb-5">
                    <div className="w-fit p-1 flex items-center rounded-lg bg-blue-700 text-white gap-x-2">Display
                        <select value={selectNumbers} onChange={handleDisplayChange} className="text-blue-600 w-fit" name="" id="">

                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>

                            <option value="all">All</option>


                        </select>records per page </div>

                    <div className="flex items-center w-fit justify-end gap-x-2 mb-5">
                        <ScButton
                            onClick={() => setOpenModal(true)}
                            btnType="primary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                            </svg> Role

                        </ScButton>
                        <ScButton
                            onClick={() => setOpenPermissionModal(true)}
                            btnType="primary"
                            disabled={createPermissionForm.processing}

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                            </svg> Permission
                        </ScButton>
                    </div>
                </div>

                <div className=" w-full mx-auto overflow-auto">
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
                                    <td className="px-4 py-3 dark:text-gray-100">

                                        <Highlighter
                                            highlightClassName="highlight"
                                            searchWords={[searchRole]}
                                            autoEscape={false}
                                            textToHighlight={role.name}
                                        />
                                    </td>
                                    <td className="px-4 py-3 dark:text-gray-100">{
                                        <Highlighter
                                            highlightClassName="highlight"
                                            searchWords={[searchRole]}
                                            autoEscape={false}
                                            textToHighlight={role.permissions?.map(p => p.name).join(", ") || "No Permissions"}
                                        />

                                    }</td>
                                    <td className="px-4 py-3 dark:text-gray-100 flex items-center gap-x-2"><EditBtn/> <DeleteBtn/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className=" w-full flex items-center justify-center gap-x-1">
                    <button className="px-5 py-2 bg-blue-700 hover:bg-blue-500 text-white ">{"<<Previous"}</button>

                    <button className="p-2 border border-blue-700">1</button>

                    <button className="px-5 py-2 bg-blue-700 hover:bg-blue-500 text-white">{"Next>>"}</button>
                </div>
            </section>
        </AdminLayout>
    );
}

export default Index;
