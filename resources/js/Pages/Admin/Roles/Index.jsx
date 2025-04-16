import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import EditBtn from "@/Components/EditBtn";
import DeleteBtn from "@/Components/DeleteBtn";
import { router } from "@inertiajs/react";
import defualtRoleData from "@/utils/defualtRoleData";
import PaginationSelector from "@/Components/PaginationSelector";
import Table from "@/Components/Table/Table";
import TableRow from "@/Components/Table/TableRow";
import TableData from "@/Components/Table/TableData";
import Pluse from "@/Components/Svgs/Pluse";
function Index({ roles, permissions }) {

    const perPage = roles.per_page || 10;
    const [openModal, setOpenModal] = useState(false);
    const [openPermissionModal, setOpenPermissionModal] = useState(false);
    const [searchRole, setSearchRole] = useState(null);
    const [filterRoles, setFilterRoles] = useState([]);
    const [selectNumbers, setSelectNumbers] = useState(perPage);
    const [isLoading, setIsLoading] = useState(false);
    const [openEditRoleModal, setOpenEditRoleModal] = useState(false);

    const createRoleForm = useForm('createRoleForm', defualtRoleData);
    const paginageRoleForm = useForm();

    const createPermissionForm = useForm(' ', {
        name: null
    });
    const editRoleForm = useForm(defualtRoleData);
    const deleteRoleForm = useForm();

    useEffect(() => {
        setFilterRoles(roles.data);
    }, [roles])

    const submitAddRoleForm = (e) => {

        e.preventDefault();

        createRoleForm.post(route('roles.store'), {
            preserveScroll: true,
            onSuccess: () => {
                createRoleForm.reset();
                setOpenModal(false);
                setIsLoading(false);
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
        if (value !== null) {
            router.get(route("roles.index"), { search: value, perpage: perPage }, { preserveState: true });
        }
    };

    const handleDisplayChange = (e) => {
        const value = Number(e.target.value);
        setSelectNumbers(value);
        paginageRoleForm.get(route('roles.index', { perpage: value }));
    };

    const handleEditRoleForm = (id) => {
        const editRole = filterRoles.find((role) => role.id == id)
        editRoleForm.setData('id', id);
        editRoleForm.setData('name', editRole.name)
        editRoleForm.setData('permissions', [...editRole.permissions.map((p) => p.name)])
        setOpenEditRoleModal(true);
    }

    const handleDeleteRoleForm = (id) => {
        setIsLoading(true);

        deleteRoleForm.delete(route('roles.destroy', { id }), {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };

    const submitEditRoleForm = (e) => {
        e.preventDefault();
        console.log(editRoleForm.data)
        editRoleForm.put(route('roles.update', { id: editRoleForm.data.id }), {
            preserveScroll: true,
            onSuccess: () => {
                editRoleForm.reset();
                setOpenEditRoleModal(false);
            },
            onError: (errors) => {
                setOpenEditRoleModal(true);
                console.error("Validation Errors:", errors);
            }
        })

    }
    const closeEditRoleModal = () => {
        setOpenEditRoleModal(false);
    }

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
                            <Button
                                onClick={(e) => { e.preventDefault(); setOpenModal(false); }}
                                btnType="secondary"
                                disabled={createRoleForm.processing}
                            >
                                Close
                            </Button>

                            <Button
                                disabled={createRoleForm.processing}
                                type="submit"
                                btnType="success"
                            >
                                {createRoleForm.processing ? "Creating Role ..." : "Create Role"}
                            </Button>
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
                            <Button
                                disabled={createRoleForm.processing}
                                btnType="secondary" onClick={(e) => { e.preventDefault(); setOpenPermissionModal(false); }}
                            >
                                Close
                            </Button>

                            <Button
                                disabled={createPermissionForm.processing}
                                type="submit"
                                btnType="success"
                            >
                                {createPermissionForm.processing ? "Creating Permission ..." : "Create Permission"}
                            </Button>
                        </div>

                    </form>
                </div>
            </Modal>

            {/* Modal for Edit Role */}

            <Modal show={openEditRoleModal} onClose={closeEditRoleModal}>
                <div className="p-5 dark:text-white">
                    <form onSubmit={submitEditRoleForm}>
                        <div className="w-4/5 p-5 flex flex-col items-center justify-center mx-auto">
                            {/* Role Name Input */}
                            <div className="mb-6 w-full">
                                <InputLabel value="Enter Role Name" />
                                <TextInput
                                    name="name"
                                    className="w-full"
                                    value={editRoleForm.data.name}
                                    onChange={(e) => editRoleForm.setData('name', e.target.value)}
                                />
                                {editRoleForm.errors.name && <InputError message={editRoleForm.errors.name} />}
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
                                                checked={editRoleForm.data.permissions.includes(permission)}
                                                onChange={(e) => {
                                                    const selectedPermissions = editRoleForm.data.permissions.includes(permission)
                                                        ? editRoleForm.data.permissions.filter((p) => p !== permission)
                                                        : [...editRoleForm.data.permissions, permission];

                                                    editRoleForm.setData('permissions', selectedPermissions);
                                                }}
                                            />
                                            <span className="text-gray-700 dark:text-gray-400">{permission}</span>
                                        </label>
                                    ))}
                                </div>
                                {editRoleForm.errors.permissions && <InputError message={editRoleForm.errors.permissions} />}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="w-full p-5 flex items-center gap-x-2 justify-end">
                            <Button
                                onClick={(e) => { e.preventDefault(); closeEditRoleModal() }}
                                btnType="secondary"
                                disabled={editRoleForm.processing}
                            >
                                Close
                            </Button>

                            <Button
                                disabled={editRoleForm.processing}
                                type="submit"
                                btnType="success"
                            >
                                {editRoleForm.processing ? "Creating Role ..." : "Create Role"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>

            <section className="text-gray-600 dark:text-white body-font py-2 w-full">
                <div className="w-full flex items-center justify-between mb-5">

                    <PaginationSelector handleDisplayChange={handleDisplayChange} selectNumbers={selectNumbers} total={roles.total} />
                    <div className="flex items-center w-fit justify-end gap-x-2 mb-5">
                        <Button
                            onClick={() => setOpenModal(true)}
                            btnType="primary"
                        >
                            <Pluse/> Role

                        </Button>
                        <Button
                            onClick={() => setOpenPermissionModal(true)}
                            btnType="primary"
                            disabled={createPermissionForm.processing}
                        >
                            <Pluse/> Permission
                        </Button>
                    </div>
                </div>

                <Table columns={['#', 'Name', 'Permissions', 'Action']}>
                    {filterRoles.length == 0 ? <div className="text-red-500  font-bold w-full  my-5">No Role found on {searchRole} </div> : filterRoles.map((role, index) => (

                        <TableRow key={role.id || index} isLast={index == filterRoles.length - 1} >
                            <TableData>{index + 1}</TableData>
                            <TableData>
                                <Highlighter
                                    highlightClassName="highlight"
                                    searchWords={[searchRole]}
                                    autoEscape={false}
                                    textToHighlight={role.name}
                                />
                            </TableData>
                            <TableData>{
                                <Highlighter
                                    highlightClassName="highlight"
                                    searchWords={[searchRole]}
                                    autoEscape={false}
                                    textToHighlight={role.permissions?.map(p => p.name).join(", ") || "No Permissions"}
                                />
                            }</TableData>
                            <TableData>
                                <div className="flex items-center gap-x-2">
                                <EditBtn onClick={() => handleEditRoleForm(role.id)} />
                                <DeleteBtn onClick={() => handleDeleteRoleForm(role.id)} />
                                </div>
                               
                            </TableData>
                        </TableRow>

                    ))}
                </Table>

                <nav aria-label="Pagination" className="mt-10 flex">
                    <ul className="inline-flex -space-x-px text-sm mx-auto">
                        {roles.links.map((link, index) => (
                            <li key={index}>
                                <Link
                                    href={link.url ? `${link.url}${link.url.includes("?") ? "&" : "?"}perpage=${perPage}` : "#"}

                                    className={`flex items-center justify-center px-3 h-8 border ${link.active
                                        ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white"
                                        : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        } ${!link.url ? "cursor-not-allowed opacity-50" : ""}`}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>
        </AdminLayout>

    );
}

export default Index;
