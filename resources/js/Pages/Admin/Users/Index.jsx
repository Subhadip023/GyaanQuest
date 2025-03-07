import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal'
import ScButton from '@/Components/ScButton';
import AdminLayout from '@/Layouts/AdminLayout'
import { useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react'

function Index({ users = [], roles = [] }) {

    const { auth } = usePage().props;


    const [openAddRoleModal, setOpenAddRoleModal] = useState(false);

    const createAssignRoleForm = useForm({
        userId: null,
        name: [],
    })
    const openAddRoleModalfunction = (user) => {
        createAssignRoleForm.setData('userId', user.id);
        const selctedUser = users.find((u) => u == user);
        createAssignRoleForm.setData('name', selctedUser.roles.map((role) => role.name))
        console.log(selctedUser.roles.map((role) => role.name))
        setOpenAddRoleModal(true);
    }


    const handelSubmitAssignRoleForm = (e) => {
        e.preventDefault();
        console.log(createAssignRoleForm)
        createAssignRoleForm.post(route('assign-role'), {
            preserveScroll: true,
            onSuccess: () => { createAssignRoleForm.reset(); setOpenAddRoleModal(false) },
            onError: (errors) => { console.log(errors); setOpenAddRoleModal(true) },
        });

    }


    return (
        <AdminLayout title='Users' heading='Users'>
            <Modal show={openAddRoleModal} onClose={() => setOpenAddRoleModal(false)} maxWidth='lg'>
                <div className="p-5 w-full ">
                    <form onSubmit={handelSubmitAssignRoleForm} >
                        <InputLabel className="text-xl w-full dark:text-white">Select Role</InputLabel>

                        <div className="w-full flex flex-wrap gap-x-2 gap-y-1">
                            <div className='grid grid-cols-3  h-[70vh] scrollbar overflow-y-auto '> {roles
                                .filter((role) => auth.role.includes('admin') || role !== 'admin') // Keep 'admin' only if the user is an admin
                                .map((role) => (
                                    <div key={role} className="px-5 py-2 text-green-600 flex gap-1 items-center">
                                        <input
                                            type="checkbox"
                                            value={role}
                                            onChange={(e) => {
                                                createAssignRoleForm.setData(
                                                    "name",
                                                    e.target.checked
                                                        ? [...createAssignRoleForm.data.name, role]
                                                        : createAssignRoleForm.data.name.filter((r) => r !== role)
                                                );
                                            }}
                                            checked={createAssignRoleForm.data.name.includes(role)}
                                        />
                                        {role}
                                    </div>
                                ))}</div>


                            <div className="w-full p-5 flex items-center gap-x-2 justify-end">
                                <ScButton
                                    
                                    onClick={(e) => { e.preventDefault(); setOpenAddRoleModal(false); }}
                                    btnType='secondary'

                                    disabled={createAssignRoleForm.processing}
                                >
                                    Close
                                </ScButton>

                                <button
                                    disabled={createAssignRoleForm.processing}
                                    type="submit"
                                    className={`px-5 py-2 flex items-center gap-x-2 text-white rounded-lg 
                                ${createAssignRoleForm.processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'} 
                                bg-blue-700 duration-200`}
                                >
                                    {createAssignRoleForm.processing ? "Add Role ..." : "Add Role"}
                                </button>
                            </div>


                        </div>                        </form>

                </div>
            </Modal>

            <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                    <thead className="border-b-2 border-gray-500 dark:border-gray-100">
                        <tr>
                            <th className="px-4 py-3 font-medium text-gray-900 dark:text-gray-50 text-lg">#</th>
                            <th className="px-4 py-3 font-medium text-gray-900 dark:text-gray-50 text-lg">Name</th>
                            <th className="px-4 py-3 font-medium text-gray-900 dark:text-gray-50 text-lg">Assign Role</th>
                            <th className="px-4 py-3 font-medium text-gray-900 dark:text-gray-50 text-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length == 0 ? <div className="text-red-500  font-bold w-full  my-5">No Role Present </div> : users.map((user, index) => (
                            <tr key={user.id || index} className={`${index == users.length - 1 ? "" : 'border-b-2 border-gray-300'}`}>
                                <td className="px-4 py-3 dark:text-gray-100">{index + 1}</td>
                                <td className="px-4 py-3 dark:text-gray-100">{user.name}</td>
                                <td className="px-4 py-3 dark:text-gray-100">{user.roles.length === 0 ? "No role Assigne" : user.roles.map((role) => role.name).join(", ")}
                                </td>

                                <td className="px-4 py-3 dark:text-gray-100">edit delete <button className='' onClick={() => openAddRoleModalfunction(user)}> Assign Roles</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>)
}

export default Index