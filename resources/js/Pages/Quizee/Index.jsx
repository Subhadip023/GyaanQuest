import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import Table from '@/Components/Table/Table';
import TableData from '@/Components/Table/TableData';
import TableRow from '@/Components/Table/TableRow';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import defualtQuizData from '@/utils/defualtQuizeData';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import TextArea from '@/Components/TextArea';
import RadioGroup from '@/Components/RadioGroup';
import EditBtn from '@/Components/EditBtn';
import DeleteBtn from '@/Components/DeleteBtn';
import AlertModal from '@/Components/AlertModal';

function Index({ quizzes }) {
  const [openAddQuizModal, setAddQuizModal] = useState(false);
  const [openEditQuizform, setOpenEditQuizform] = useState(false);
  const [deleteQuizId, setDeleteQuizId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const createQuizForm = useForm(defualtQuizData);
  const editQuizForm = useForm(defualtQuizData);
  const deleteQuizForm = useForm();

  const openEditQuizmodal = (quize) => {
    editQuizForm.setData(quize);
    setOpenEditQuizform(true);
  }
  console.log(quizzes[0])


  const submitAddQuizFrom = (e) => {
    e.preventDefault();

    createQuizForm.post(route('quizzes.store'), {
      onSuccess: () => {
        setAddQuizModal(false);
        createQuizForm.reset();
      },
      onError: (errors) => {
        console.error('Validation errors:', errors);
      },
      onFinish: () => {
        console.log('Quiz submission complete');
      },

    });
  };


  const submitEditQuizForm = (e) => {
    e.preventDefault();

    editQuizForm.put(
      route('quizzes.update', editQuizForm.data.id),
      {
        preserveScroll: true,
        onSuccess: () => {
          setOpenEditQuizform(false);
          editQuizForm.reset();
        },
        onError: (errors) => {
          console.error('Validation errors:', errors);
        },
      }
    );
  };

  const submitDeletRoleForm = (e) => {
    e.preventDefault();

    deleteQuizForm.delete(
      route('quizzes.destroy', deleteQuizId),
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
    <AdminLayout title='Quiz' heading='Quiz'>
      <AlertModal show={openAlert} onClose={() => setOpenAlert(false)} onConfirm={submitDeletRoleForm} title="Delete Quiz?"
        message="Are you sure you want to delete this quiz? This action cannot be undone."
      />
      {/* craete + edit  */}
      <Modal show={openAddQuizModal || openEditQuizform} onClose={() => {
        if (!editQuizForm.processing || !createQuizForm.processing) {
          setAddQuizModal(false);
          setOpenEditQuizform(false);
        }

      }} maxWidth="lg">
        <div className="w-full p-5">
          <form onSubmit={openEditQuizform ? submitEditQuizForm : submitAddQuizFrom}>
            <div className="mb-6 w-full">
              <InputLabel value="Enter Quiz Name" />
              <TextInput
                name="name"
                className="w-full"
                value={openEditQuizform ? editQuizForm.data.name : createQuizForm.data.name}
                onChange={(e) =>
                  openEditQuizform
                    ? editQuizForm.setData('name', e.target.value)
                    : createQuizForm.setData('name', e.target.value)
                }
              />
              {(openEditQuizform ? editQuizForm.errors.name : createQuizForm.errors.name) && (
                <InputError message={openEditQuizform ? editQuizForm.errors.name : createQuizForm.errors.name} />
              )}
            </div>

            <div className="mb-6 w-full">
              <InputLabel
                value={`Enter Quiz Description (${(openEditQuizform ? editQuizForm.data.description : createQuizForm.data.description)
                  ?.trim()
                  .split(/\s+/)
                  .filter(Boolean).length})`}
              />
              <TextArea
                name="description"
                className="w-full h-32"
                value={openEditQuizform ? editQuizForm.data.description : createQuizForm.data.description}
                onChange={(e) =>
                  openEditQuizform
                    ? editQuizForm.setData('description', e.target.value)
                    : createQuizForm.setData('description', e.target.value)
                }
              />
              {(openEditQuizform ? editQuizForm.errors.description : createQuizForm.errors.description) && (
                <InputError message={openEditQuizform ? editQuizForm.errors.description : createQuizForm.errors.description} />
              )}
            </div>

            <div className="mb-6 w-full">
              <InputLabel value="Visibility" />
              <RadioGroup
                name="display"
                value={openEditQuizform ? editQuizForm.data.display : createQuizForm.data.display}
                onChange={(val) =>
                  openEditQuizform
                    ? editQuizForm.setData('display', val)
                    : createQuizForm.setData('display', val)
                }
                options={[
                  { value: 'public', label: 'Public' },
                  { value: 'private', label: 'Private' },
                  { value: 'room', label: 'Room Only' },
                ]}
                className="mt-2"
              />
              {(openEditQuizform ? editQuizForm.errors.display : createQuizForm.errors.display) && (
                <InputError message={openEditQuizform ? editQuizForm.errors.display : createQuizForm.errors.display} />
              )}
            </div>

            <div className="mb-6 w-full">
              <InputLabel value="Is this Quiz Active?" />
              <RadioGroup
                name="active"
                value={String(openEditQuizform ? editQuizForm.data.active : createQuizForm.data.active)}
                onChange={(val) =>
                  openEditQuizform
                    ? editQuizForm.setData('active', val === 'true')
                    : createQuizForm.setData('active', val === 'true')
                }
                options={[
                  { value: 'true', label: 'Yes' },
                  { value: 'false', label: 'No' },
                ]}
                className="mt-2"
              />
              {(openEditQuizform ? editQuizForm.errors.active : createQuizForm.errors.active) && (
                <InputError message={openEditQuizform ? editQuizForm.errors.active : createQuizForm.errors.active} />
              )}
            </div>

            <div className="w-full flex items-center justify-end gap-x-2">
              <Button
                btnType="secondary"
                disabled={openEditQuizform ? editQuizForm.processing : createQuizForm.processing}
                onClick={(e) => {
                  e.preventDefault();
                  setAddQuizModal(false);
                  setOpenEditQuizform(false);
                }}
              >
                Close
              </Button>
              <Button
                btnType="success"
                disabled={openEditQuizform ? editQuizForm.processing : createQuizForm.processing}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Modal>



      <section >
        <div className='w-full flex items-center justify-end gap-x-2'>
          <Button onClick={(e) => { e.preventDefault(); setAddQuizModal(true) }}>add quize</Button>
        </div>

        <Table columns={['#', 'Name', 'Description', 'questions', 'Visible', 'Active', 'Action']}>
          {
            quizzes.length == 0 ? <div className="text-red-500  font-bold w-full  my-5">No Quiz found on  </div> :
              quizzes.map((quize, index) => (<TableRow key={index || quize.id} isLast={index === quizzes.length - 1}>
                <TableData>{index + 1}</TableData>
                <TableData>{quize.name}</TableData>
                <TableData>{quize.description ? quize.description : "No Description available"}</TableData>
                <TableData>{quize.question.length}</TableData>
                <TableData>{quize.display}</TableData>
                <TableData>{quize.active ? 'Active' : "NotActive"}</TableData>
                <TableData>
                  <div className='flex w-full items-center gap-x-2'>
                    <EditBtn onClick={() => openEditQuizmodal(quize)} />
                    <DeleteBtn onClick={() => {
                      setOpenAlert(true);
                      setDeleteQuizId(quize.id)
                    }} />
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