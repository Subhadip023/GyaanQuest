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
import defualtAnswerData from '@/utils/defualtAnswerData'
import CreateAnswerForm from '@/Components/From/CreateAnswerForm'
import Checkbox from '@/Components/Checkbox'

function Index({ questions, quizzes }) {
  console.log(questions)
  const [perpageShow, setPerpageShow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddQuestionFrom, setOpenAddQuestionFrom] = useState(false);
  const [openEditQuestionFrom, setOpenEditQuestionFrom] = useState(false);
  const [openDeleteAlertModal, setOpenDeleteAlertModal] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);
  const [openCreateAnswerFrom, setOpenCreateAnswerFrom] = useState(false);


  const totalItems = questions.length;
  const totalPages = Math.ceil(totalItems / perpageShow);
  const startIndex = (currentPage - 1) * perpageShow;
  const endIndex = startIndex + perpageShow;
  const paginatedQuestions = questions.slice(startIndex, endIndex);
  const createQuestionForm = useForm(defualtQuestionData);
  const editQuestionForm = useForm(defualtQuestionData);
  const deleteQuestionForm = useForm();
  const createAnswerForm = useForm(defualtAnswerData);
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
    setOpenEditQuestionFrom(true);
    editQuestionForm.setData({ ...question, isActive: Boolean(question.isActive) });

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
  const creatAnswer = (question) => {
    setOpenCreateAnswerFrom(true);
    createAnswerForm.setData('question_id', question.id);
    createAnswerForm.setData('question_name', question.question);
    createAnswerForm.setData('question_type', question.type);
    // createAnswerForm.setData('question_number', question.type);


  }
  // console.log(createAnswerForm.data.answers)

  const handelCreateAnswer = (e) => {
    e.preventDefault();
    console.log(createAnswerForm.data)
    createAnswerForm.post(route('answers.store'), {
      preserveScroll: true,
      onSuccess: () => {
        createAnswerForm.reset();
        setOpenCreateAnswerFrom(false);
      },
      onError: (errors) => {
        setOpenCreateAnswerFrom(true);
        console.error("Validation Errors:", errors);
      }
    })
  }


  return (
    <AdminLayout title='Questions' heading='Questions'>
      <AlertModal show={openDeleteAlertModal} onClose={() => setOpenDeleteAlertModal(false)} onConfirm={deleteQuestion} />

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
                    name="quiz_id"
                    value={openEditQuestionFrom ? editQuestionForm.data.quiz_id : createQuestionForm.data.quiz_id}
                    onChange={(e) =>
                      openEditQuestionFrom
                        ? editQuestionForm.setData('quiz_id', e.target.value)
                        : createQuestionForm.setData('quiz_id', e.target.value)
                    }
                    className="w-full bg-slate-800 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-0 focus:border-indigo-500"
                  >
                    <option value="">Select a quiz</option>
                    {quizzes.map((quiz) => (
                      <option key={quiz.id} value={quiz.id}>
                        {quiz.name}
                      </option>
                    ))}
                  </select>

                  {(openEditQuestionFrom
                    ? editQuestionForm.errors.quiz_id
                    : createQuestionForm.errors.quiz_id) && (
                      <InputError
                        message={
                          openEditQuestionFrom
                            ? editQuestionForm.errors.quiz_id
                            : createQuestionForm.errors.quiz_id
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

      <Modal show={openCreateAnswerFrom} onClose={() => setOpenCreateAnswerFrom(false)}>
        <div className="p-5">
          <div className="w-3/4 mx-auto">

            <form onSubmit={handelCreateAnswer}>

              {createAnswerForm.data?.question_name && (
                <h2 className="text-lg font-semibold mb-4">
                  {createAnswerForm.data.question_name}
                </h2>
              )}

              {createAnswerForm.data?.question_type === "mcq" && (
                <section className="grid grid-cols-2 gap-4">
                  {createAnswerForm.data.answers.map((item, index) => (
                    <div key={item.id} className='flex flex-col items-center'>
                      <div key={item.id} className="mb-4">
                        <InputLabel value={`Option ${index + 1}`} />
                        <div className="relative w-full">
                          <TextInput
                            type="text"
                            className="w-full pr-10"
                            value={item.answare}
                            onChange={(e) => {
                              const updated = [...createAnswerForm.data.answers];
                              updated[index].answare = e.target.value;
                              createAnswerForm.setData("answers", updated);
                            }}
                          />
                          {createAnswerForm.data.answers.length > 2 && <svg
                            onClick={() => {
                              const updated = [...createAnswerForm.data.answers];
                              updated.splice(index, 1);
                              createAnswerForm.setData("answers", updated);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-105"
                            width="20"
                            height="20"
                            fill="red"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />  </svg>}
                        </div>

                      </div>
                      <div>
                        is it correct option  <Checkbox onClick={() => {
                          const updated = [...createAnswerForm.data.answers];
                          updated[index].is_correct = !updated[index].is_correct;
                          createAnswerForm.setData("answers", updated);
                        }} />

                      </div>
                    </div>
                  ))}
                </section>
              )}

              {createAnswerForm.data?.question_type === "mcq" && createAnswerForm.data.answers.length < 6 && (
                <Button btnType='primary'
                  onClick={(e) => {
                    e.preventDefault();
                    if (createAnswerForm.data.answers.length < 6) {
                      createAnswerForm.setData("answers", [
                        ...createAnswerForm.data.answers,
                        {
                          id: createAnswerForm.data.answers.length + 1,
                          answare: "",
                          is_correct: false,
                          is_long: false,
                        },
                      ]);
                    }

                  }}
                  className='mt-5 p-2 rounded-md'
                >
                  + Add Option
                </Button>
              )}

              {/* SAQ - Short Answer */}
              {createAnswerForm.data?.question_type === "saq" && (
                <div className="mb-4">
                  <InputLabel value="Answer" />
                  <TextInput
                    type="text"
                    className="w-full"
                    value={createAnswerForm.data.answers?.[0]?.answare || ""}
                    onChange={(e) => {
                      createAnswerForm.setData("answers", [
                        {
                          id: 1,
                          answare: e.target.value,
                          is_correct: true,
                          is_long: true,
                        },
                      ]);
                    }}
                  />
                </div>
              )}

              {/* Boolean / True-False */}
              {createAnswerForm.data?.question_type === "true_false" && (
                <div className="mb-4">
                  <InputLabel value="Choose the correct answer" />
                  <div className="flex gap-4 mt-2">
                    {["True", "False"].map((option, index) => (
                      <label key={index} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="booleanAnswer"
                          value={option}
                          checked={
                            createAnswerForm.data.answers?.[0]?.answare === option
                          }
                          onChange={(e) =>
                            createAnswerForm.setData("answers", [
                              {
                                id: 1,
                                answare: e.target.value,
                                is_correct: true,
                                is_long: false,
                              },
                            ])
                          }
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              )}


              <div className='flex justify-end gap-2 mt-4'>
                <Button btnType='secondary' onClick={(e) => { e.preventDefault(); setOpenCreateAnswerFrom(false) }}>Cancel</Button>
                <Button btnType='success'>Submit</Button>
              </div>
            </form>

          </div>
        </div>
      </Modal>



      <section>
        <div className='p-5 w-full flex items-center justify-between'>
          <PaginationSelector selectNumber={perpageShow} handleDisplayChange={handleDisplayChange} total={questions.length} />
          <Button onClick={() => setOpenAddQuestionFrom(true)}><Pluse /> Question</Button>
        </div>

        <div className='mt-5 w-full'>
          <Table columns={['#', 'Question', 'Answer', 'Number', 'Type', 'Active', 'Display', 'Quiz', 'Actions']}>
            {paginatedQuestions.map((question, index) => (
              <TableRow key={index || question.id} isLast={index === paginatedQuestions.length - 1}>
                <TableData>{startIndex + index + 1}</TableData>
                <TableData>{question.question}</TableData>
                <TableData>{question.answers.length == 0 ? <Button onClick={() => creatAnswer(question)}><Pluse /></Button> : question.answer.filter((answer) => answer.is_correct).map((answer) => answer.answare).join(', ')}
                </TableData>
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
