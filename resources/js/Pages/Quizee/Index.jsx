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

function Index({ quizes }) {
  const [openAddQuizeModal, setAddQuizeModal] = useState(false);
  const createQuizeForm = useForm(defualtQuizeData);
  console.log(quizes)

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
      }
    });
  };
  

  return (
    <AdminLayout title='Quize' heading='Quize'>
      <Modal show={openAddQuizeModal} onClose={() => setAddQuizeModal(false)} maxWidth='lg'>
        <div className='w-full p-5'>
          <form onSubmit={submitAddQuizeFrom}>
            <div className="mb-6 w-full">
              <InputLabel value="Enter Role Name" />
              <TextInput
                name="name"
                className="w-full"
                value={createQuizeForm.data.name}
                onChange={(e) => createQuizeForm.setData('name', e.target.value)}
              />
              {createQuizeForm.errors.name && <InputError message={createQuizeForm.errors.name} />}
            </div>
            <div className="mb-6 w-full">
              <InputLabel value={`Enter Quiz Description (${createQuizeForm.data.description.trim().split(/\s+/).filter(Boolean).length})`} />


              <TextArea
                name="description"
                className="w-full h-32"
                value={createQuizeForm.data.description}
                onChange={(e) => createQuizeForm.setData('description', e.target.value)}
              />
              {createQuizeForm.errors.description && (
                <InputError message={createQuizeForm.errors.description} />
              )}
            </div>


            <div className="mb-6 w-full ">
              <InputLabel value="Visibility" />
              <RadioGroup
                name="display"
                value={createQuizeForm.data.display}
                onChange={(val) => createQuizeForm.setData('display', val)}
                options={[
                  { value: 'public', label: 'Public' },
                  { value: 'private', label: 'Private' },
                  { value: 'room', label: 'Room Only' },
                ]}
                className="mt-2 "
              />
              {createQuizeForm.errors.display && (
                <InputError message={createQuizeForm.errors.display} />
              )}
            </div>


            <div className='w-full flex items-center justify-end gap-x-2'>
              <Button btnType='secondary' disabled={createQuizeForm.processing} onClick={() => setAddQuizeModal(false)}> Close </Button>
              <Button btnType='success' disabled={createQuizeForm.processing}> Submit </Button>
            </div>

          </form>


        </div>
      </Modal>



      <section >
        <div className='w-full flex items-center justify-end gap-x-2'>
          <Button onClick={(e) => { e.preventDefault(); setAddQuizeModal(true) }}>add quize</Button>
        </div>

        <Table columns={['#', 'Name','Description','Visible', 'Action']}>
          {
            quizes.length==0?<div className="text-red-500  font-bold w-full  my-5">No Quize found on  </div>:
            quizes.map((quize,index)=>( <TableRow key={index||quize.id} isLast={index===quizes.length-1}>
              <TableData>{index+1}</TableData>
              <TableData>{quize.name}</TableData>
              <TableData>{quize.description}</TableData>
              <TableData>{quize.display}</TableData>
              <TableData>Edit Delete </TableData>
            </TableRow>))
           
          }
          
        </Table>
      </section>
    </AdminLayout >

  )
}

export default Index