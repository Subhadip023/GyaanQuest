import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import Table from '@/Components/Table/Table';
import TableData from '@/Components/Table/TableData';
import TableRow from '@/Components/Table/TableRow';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import defualtQuizeData from '@/utils/defualtQuizeData';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import TextArea from '@/Components/TextArea';
import RadioGroup from '@/Components/RadioGroup';
import EditBtn from '@/Components/EditBtn';
import DeleteBtn from '@/Components/DeleteBtn';
import AlertModal from '@/Components/AlertModal';

function Index({ quizes }) {
  const [openAddQuizeModal, setAddQuizeModal] = useState(false);
  const [openEditQuizeform, setOpenEditQuizeform] = useState(false);
  const [deleteQuizeId, setDeleteQuizeId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const createQuizeForm = useForm(defualtQuizeData);
  const editQuizeForm = useForm(defualtQuizeData);
  const deleteQuizeForm = useForm();

  const openEditQuizemodal = (quize) => {
    editQuizeForm.setData(quize);
    setOpenEditQuizeform(true);
  }


  const submitAddQuizeFrom = (e) => {
    e.preventDefault();

    createQuizeForm.post(route('quizes.store'), {
      onSuccess: () => {
        setAddQuizeModal(false);
        createQuizeForm.reset();
      },
      onError: (errors) => {
        console.error('Validation errors:', errors);
      },
      onFinish: () => {
        console.log('Quiz submission complete');
      },

    });
  };


  const submitEditQuizeForm = (e) => {
    e.preventDefault();

    editQuizeForm.put(
      route('quizes.update', editQuizeForm.data.id),
      {
        preserveScroll: true,
        onSuccess: () => {
          setOpenEditQuizeform(false);
          editQuizeForm.reset();
        },
        onError: (errors) => {
          console.error('Validation errors:', errors);
        },
      }
    );
  };

  const submitDeletRoleForm = (e) => {
    e.preventDefault();

    deleteQuizeForm.delete(
      route('quizes.destroy', deleteQuizeId),
      {
        preserveScroll: true,
        onSuccess: () => {
          setOpenAlert(false);
        },
        onError: (errors) => {
          console.error('Validation errors:', errors);
        },
      }
    );
  }


  return (
    <AdminLayout title='Quize' heading='Quize'>
      <AlertModal show={openAlert} onClose={() => setOpenAlert(false)} onConfirm={submitDeletRoleForm} title="Delete Quiz?"
        message="Are you sure you want to delete this quiz? This action cannot be undone."
      />
      {/* craete + edit  */}
      <Modal show={openAddQuizeModal || openEditQuizeform} onClose={() => {
        if (!editQuizeForm.processing || !createQuizeForm.processing) {
          setAddQuizeModal(false);
          setOpenEditQuizeform(false);
        }

      }} maxWidth="lg">
        <div className="w-full p-5">
          <form onSubmit={openEditQuizeform ? submitEditQuizeForm : submitAddQuizeFrom}>
            <div className="mb-6 w-full">
              <InputLabel value="Enter Role Name" />
              <TextInput
                name="name"
                className="w-full"
                value={openEditQuizeform ? editQuizeForm.data.name : createQuizeForm.data.name}
                onChange={(e) =>
                  openEditQuizeform
                    ? editQuizeForm.setData('name', e.target.value)
                    : createQuizeForm.setData('name', e.target.value)
                }
              />
              {(openEditQuizeform ? editQuizeForm.errors.name : createQuizeForm.errors.name) && (
                <InputError message={openEditQuizeform ? editQuizeForm.errors.name : createQuizeForm.errors.name} />
              )}
            </div>

            <div className="mb-6 w-full">
              <InputLabel
                value={`Enter Quiz Description (${(openEditQuizeform ? editQuizeForm.data.description : createQuizeForm.data.description)
                  ?.trim()
                  .split(/\s+/)
                  .filter(Boolean).length})`}
              />
              <TextArea
                name="description"
                className="w-full h-32"
                value={openEditQuizeform ? editQuizeForm.data.description : createQuizeForm.data.description}
                onChange={(e) =>
                  openEditQuizeform
                    ? editQuizeForm.setData('description', e.target.value)
                    : createQuizeForm.setData('description', e.target.value)
                }
              />
              {(openEditQuizeform ? editQuizeForm.errors.description : createQuizeForm.errors.description) && (
                <InputError message={openEditQuizeform ? editQuizeForm.errors.description : createQuizeForm.errors.description} />
              )}
            </div>

            <div className="mb-6 w-full">
              <InputLabel value="Visibility" />
              <RadioGroup
                name="display"
                value={openEditQuizeform ? editQuizeForm.data.display : createQuizeForm.data.display}
                onChange={(val) =>
                  openEditQuizeform
                    ? editQuizeForm.setData('display', val)
                    : createQuizeForm.setData('display', val)
                }
                options={[
                  { value: 'public', label: 'Public' },
                  { value: 'private', label: 'Private' },
                  { value: 'room', label: 'Room Only' },
                ]}
                className="mt-2"
              />
              {(openEditQuizeform ? editQuizeForm.errors.display : createQuizeForm.errors.display) && (
                <InputError message={openEditQuizeform ? editQuizeForm.errors.display : createQuizeForm.errors.display} />
              )}
            </div>

            <div className="mb-6 w-full">
              <InputLabel value="Is this Quiz Active?" />
              <RadioGroup
                name="active"
                value={String(openEditQuizeform ? editQuizeForm.data.active : createQuizeForm.data.active)}
                onChange={(val) =>
                  openEditQuizeform
                    ? editQuizeForm.setData('active', val === 'true')
                    : createQuizeForm.setData('active', val === 'true')
                }
                options={[
                  { value: 'true', label: 'Yes' },
                  { value: 'false', label: 'No' },
                ]}
                className="mt-2"
              />
              {(openEditQuizeform ? editQuizeForm.errors.active : createQuizeForm.errors.active) && (
                <InputError message={openEditQuizeform ? editQuizeForm.errors.active : createQuizeForm.errors.active} />
              )}
            </div>

            <div className="w-full flex items-center justify-end gap-x-2">
              <Button
                btnType="secondary"
                disabled={openEditQuizeform ? editQuizeForm.processing : createQuizeForm.processing}
                onClick={(e) => {
                  e.preventDefault();
                  setAddQuizeModal(false);
                  setOpenEditQuizeform(false);
                }}
              >
                Close
              </Button>
              <Button
                btnType="success"
                disabled={openEditQuizeform ? editQuizeForm.processing : createQuizeForm.processing}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Modal>



      <section >
        <div className='w-full flex items-center justify-end gap-x-2'>
          <Button onClick={(e) => { e.preventDefault(); setAddQuizeModal(true) }}>add quize</Button>
        </div>

        <Table columns={['#', 'Name', 'Description', 'Visible', 'Active', 'Action']}>
          {
            quizes.length == 0 ? <div className="text-red-500  font-bold w-full  my-5">No Quize found on  </div> :
              quizes.map((quize, index) => (<TableRow key={index || quize.id} isLast={index === quizes.length - 1}>
                <TableData>{index + 1}</TableData>
                <TableData>{quize.name}</TableData>
                <TableData>{quize.description ? quize.description : "No Description available"}</TableData>
                <TableData>{quize.display}</TableData>
                <TableData>{quize.active ? 'Active' : "NotActive"}</TableData>
                <TableData>
                  <div className='flex w-full items-center gap-x-2'>
                  <EditBtn onClick={() => openEditQuizemodal(quize)} />
                  <DeleteBtn onClick={() => {
                    setOpenAlert(true);
                    setDeleteQuizeId(quize.id)}} />
                    </div>
                </TableData>
              </TableRow>))

          }

        </Table>
      </section>
    </AdminLayout >

  )
}

export default Index