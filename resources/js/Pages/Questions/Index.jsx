import Button from '@/Components/Button'
import PaginationSelector from '@/Components/PaginationSelector'
import Pluse from '@/Components/Svgs/Pluse'
import Table from '@/Components/Table/Table'
import TableData from '@/Components/Table/TableData'
import TableRow from '@/Components/Table/TableRow'
import AdminLayout from '@/Layouts/AdminLayout'
import PaginationNav from '@/Components/PaginationNav'
import React, { useState } from 'react'
import { useForm } from '@inertiajs/react'
import defualtQuestionData from '@/utils/defualtQuestionData'
import Modal from '@/Components/Modal'
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import TextArea from '@/Components/TextArea';
import RadioGroup from '@/Components/RadioGroup';
import AlertModal from '@/Components/AlertModal';
import ActionBtns from '@/Components/ActionBtns'
function Index({ questions, quizes }) {
  const [perpageShow, setPerpageShow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddQuestionFrom, setOpenAddQuestionFrom] = useState(false);
  const [openEditQuestionFrom, setOpenEditQuestionFrom] = useState(false);
  const [openDeleteAlertModal, setOpenDeleteAlertModal] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);

  const totalItems = questions.length;
  const totalPages = Math.ceil(totalItems / perpageShow);
  const startIndex = (currentPage - 1) * perpageShow;
  const endIndex = startIndex + perpageShow;
  const paginatedQuestions = questions.slice(startIndex, endIndex);
  const createQuestionForm = useForm(defualtQuestionData);
  const editQuestionForm = useForm(defualtQuestionData);
  const deleteQuestionForm = useForm();
  
  const handleDisplayChange = (e) => {
    const value = Number(e.target.value);
    setPerpageShow(value);
    setCurrentPage(1);
  };

  const submitAddQuestionFrom = (e) => {
    e.preventDefault();
    console.log(createQuestionForm.data)
    createQuestionForm.post(route('questions.store'), {
      preserveScroll: true,
      onSuccess: () => {
        createQuestionForm.reset();
        setOpenAddQuestionFrom(false);
      },
      onError: (errors) => {
        setOpenAddQuestionFrom(true);
        console.error("Validation Errors:", errors);
      }
    })
  }
  const editQuestionfunc = (question) => {
    console.log(question)
    setOpenEditQuestionFrom(true);
    editQuestionForm.setData({ ...question, isActive: Boolean(question.isActive) });

    console.log(editQuestionForm.data)
  }

  const submitEditQuestionForm = (e) => {
    e.preventDefault();
    editQuestionForm.put(route('questions.update', { id: editQuestionForm.data.id }), {
      preserveScroll: true,
      onSuccess: () => {
        editQuestionForm.reset();
        setOpenEditQuestionFrom(false);
      },
      onError: (errors) => {
        setOpenEditQuestionFrom(true);
        console.error("Validation Errors:", errors);
      }
    })
  }



  const openDeleteModal = (id) => {
    setDeleteQuestionId(id);
    setOpenDeleteAlertModal(true)
  }

  const deleteQuestion = () => {
    deleteQuestionForm.delete(route('questions.destroy', { id: deleteQuestionId }), {
      preserveScroll: true,
      onSuccess: () => {
        setOpenDeleteAlertModal(false);
      },
      onError: () => {
        setOpenDeleteAlertModal(false);
      }
    });
  }

  return (
    <AdminLayout title='Questions' heading='Questions'>
      <AlertModal show={openDeleteAlertModal} onClose={() => setOpenDeleteAlertModal(false)} onConfirm={deleteQuestion}/>
      
      <Modal show={openAddQuestionFrom || openEditQuestionFrom} onClose={() => {
        if (!editQuestionForm.processing || !createQuestionForm.processing) {
          setOpenAddQuestionFrom(false);
          setOpenEditQuestionFrom(false);
        }

      }} maxWidth="2xl">
        <div className="w-full p-5">
          <form onSubmit={openEditQuestionFrom ? submitEditQuestionForm : submitAddQuestionFrom}>
            <div className="mb-6 w-full">
              <InputLabel
                value={`Write Question (${(openEditQuestionFrom ? editQuestionForm.data.question : createQuestionForm.data.question)
                  ?.trim()
                  .split(/\s+/)
                  .filter(Boolean).length})`}
              />
              <TextArea
                name="description"
                className="w-full h-32"
                value={openEditQuestionFrom ? editQuestionForm.data.question : createQuestionForm.data.question}
                onChange={(e) =>
                  openEditQuestionFrom
                    ? editQuestionForm.setData('question', e.target.value)
                    : createQuestionForm.setData('question', e.target.value)
                }
              />
              {(openEditQuestionFrom ? editQuestionForm.errors.question : createQuestionForm.errors.question) && (
                <InputError message={openEditQuestionFrom ? editQuestionForm.errors.question : createQuestionForm.errors.question} />
              )}
            </div>
            <div className="mb-6 w-full">
              <InputLabel value="Type" />
              <RadioGroup
                name="type"
                value={openEditQuestionFrom ? editQuestionForm.data.type : createQuestionForm.data.type}
                onChange={(val) =>
                  openEditQuestionFrom
                    ? editQuestionForm.setData('type', val)
                    : createQuestionForm.setData('type', val)
                }
                options={[
                  { value: 'mcq', label: 'MCQ' },
                  { value: 'true_false', label: 'True/False' },
                  { value: 'saq', label: 'SAQ' },
                  { value: 'long', label: 'Long Answer' },
                ]}
                className="mt-2"
              />
              {(openEditQuestionFrom ? editQuestionForm.errors.type : createQuestionForm.errors.type) && (
                <InputError message={openEditQuestionFrom ? editQuestionForm.errors.type : createQuestionForm.errors.type} />
              )}
            </div>

            <div className='w-full mt-5 flex'>


              <div className='w-1/2 px-5 flex flex-col flex-wrap'>

                <div className="mb-6 w-full">
                  <InputLabel value="Select Quiz" />
                  <select
                    name="quizes_id"
                    value={openEditQuestionFrom ? editQuestionForm.data.quizes_id : createQuestionForm.data.quizes_id}
                    onChange={(e) =>
                      openEditQuestionFrom
                        ? editQuestionForm.setData('quizes_id', e.target.value)
                        : createQuestionForm.setData('quizes_id', e.target.value)
                    }
                    className="w-full bg-slate-800 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-0 focus:border-indigo-500"
                  >
                    <option value="">Select a quiz</option>
                    {quizes.map((quiz) => (
                      <option key={quiz.id} value={quiz.id}>
                        {quiz.name}
                      </option>
                    ))}
                  </select>

                  {(openEditQuestionFrom
                    ? editQuestionForm.errors.quizes_id
                    : createQuestionForm.errors.quizes_id) && (
                      <InputError
                        message={
                          openEditQuestionFrom
                            ? editQuestionForm.errors.quizes_id
                            : createQuestionForm.errors.quizes_id
                        }
                      />
                    )}
                </div>

                <div className="mb-6 w-full">
                  <InputLabel value="Enter Question Number" />
                  <TextInput
                    type="number"
                    name="name"
                    className="w-full"
                    value={
                      openEditQuestionFrom && editQuestionForm?.data?.number !== undefined
                        ? Number(editQuestionForm.data.number)
                        : Number(createQuestionForm.data.number ?? 0)
                    }

                    onChange={(e) =>
                      openEditQuestionFrom
                        ? editQuestionForm.setData('number', e.target.value)
                        : createQuestionForm.setData('number', e.target.value)
                    }
                  />
                  {(openEditQuestionFrom ? editQuestionForm.errors.number : createQuestionForm.errors.number) && (
                    <InputError message={openEditQuestionFrom ? editQuestionForm.errors.number : createQuestionForm.errors.number} />
                  )}
                </div>
              </div>
              <div className='w-1/2 px-5 flex flex-col flex-wrap'> <div className="mb-6 w-full">
                <InputLabel value="Visibility" />
                <RadioGroup
                  name="display"
                  value={openEditQuestionFrom ? editQuestionForm.data.display : createQuestionForm.data.display}
                  onChange={(val) =>
                    openEditQuestionFrom
                      ? editQuestionForm.setData('display', val)
                      : createQuestionForm.setData('display', val)
                  }
                  options={[
                    { value: 'public', label: 'Public' },
                    { value: 'private', label: 'Private' },
                    { value: 'room', label: 'Room Only' },
                  ]}
                  className="mt-2"
                />
                {(openEditQuestionFrom ? editQuestionForm.errors.display : createQuestionForm.errors.display) && (
                  <InputError message={openEditQuestionFrom ? editQuestionForm.errors.display : createQuestionForm.errors.display} />
                )}
              </div>

                <div className="mb-6 w-full">
                  <InputLabel value="Is this Question Active?" />
                  <RadioGroup
                    name="active"
                    value={String(openEditQuestionFrom ? editQuestionForm.data.isActive : createQuestionForm.data.isActive)}
                    onChange={(val) =>
                      openEditQuestionFrom
                        ? editQuestionForm.setData('isActive', val === 'true')
                        : createQuestionForm.setData('isActive', val === 'true')
                    }
                    options={[
                      { value: 'true', label: 'Yes' },
                      { value: 'false', label: 'No' },
                    ]}
                    className="mt-2"
                  />
                  {(openEditQuestionFrom ? editQuestionForm.errors.isActive : createQuestionForm.errors.isActive) && (
                    <InputError message={openEditQuestionFrom ? editQuestionForm.errors.isActive : createQuestionForm.errors.isActive} />
                  )}
                </div></div>
            </div>





            <div className="w-full flex items-center justify-end gap-x-2">
              <Button
                btnType="secondary"
                disabled={openEditQuestionFrom ? editQuestionForm.processing : createQuestionForm.processing}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenAddQuestionFrom(false);
                  setOpenEditQuestionFrom(false);
                }}
              >
                Close
              </Button>
              <Button
                btnType="success"
                disabled={openEditQuestionFrom ? editQuestionForm.processing : createQuestionForm.processing}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      <section>
        <div className='p-5 w-full flex items-center justify-between'>
          <PaginationSelector selectNumber={perpageShow} handleDisplayChange={handleDisplayChange} total={questions.length} />
          <Button onClick={() => setOpenAddQuestionFrom(true)}><Pluse /> Question</Button>
        </div>

        <div className='mt-5 w-full'>
          <Table columns={['#', 'Question', 'Number', 'Type', 'Active', 'Display', 'Quize', 'Actions']}>
            {paginatedQuestions.map((question, index) => (
              <TableRow key={index||question.id} isLast={index === paginatedQuestions.length - 1}>
                <TableData>{startIndex + index + 1}</TableData>
                <TableData>{question.question}</TableData>
                <TableData>{question.number}</TableData>
                <TableData>{question.type}</TableData>
                <TableData>{question.isActive ? 'Active' : 'Not active'}</TableData>
                <TableData>{question.display}</TableData>
                <TableData>{question.quiz?.name}</TableData>
                <TableData>            
                    <ActionBtns editFunction={() => editQuestionfunc(question)} deleteFuntion={() => openDeleteModal(question.id)} />
                </TableData>
              </TableRow>
            ))}
          </Table>
        </div>

        <PaginationNav
          currentPage={currentPage}
          totalItems={totalItems}
          perPage={perpageShow}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </section>
    </AdminLayout>
  )
}

export default Index;
