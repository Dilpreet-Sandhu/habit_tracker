import { setEditDialogClose } from '@/redux/slices/slice';
import React from 'react'
import { useDispatch } from 'react-redux'
import { Label } from '../ui/label';

export default function EditDialog() {

    const dispatch = useDispatch();

  return (
    <div  className='absolute top-0 bottom-0 right-0 flex items-center justify-center left-0 backdrop-blur-sm'>
        <div className='w-[50vw] h-[60vh] flex  bg-white border-black border-[2px] absolute  rounded-md '>
            <div className='w-[10vw] h-full border-black border-r-[2px]'>
                <h1 className='pl-2 pt-2 font-bold text-2xl'>Your profile</h1>
            </div>
            <div className='flex-1'>
                <div className='space-y-2 px-2'>

                    <Label>Username</Label>
                    

                </div>
            </div>
        </div>
    </div>
  )
}
