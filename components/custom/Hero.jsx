"use client"

import Lookup from '@/data/Lookup'
import Colors from '@/data/Colors'
import { ArrowRight } from 'lucide-react'
import { Link } from 'lucide-react'
import React from 'react'
import { MessagesContext } from '@/context/MessagesContext'
import { useState, useContext } from 'react'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'


function Hero() {
  const [userInput,setUserInput]=useState();
  const router=useRouter();
  const CreateWorkspace=useMutation(api.workspace.CreateWorkspace)
  const {messages, setMessages} = useContext(MessagesContext);
  const onGenerate = async(input) => {
  setMessages({
    role: 'user',
    content: input
  })

  const workspaceId=await CreateWorkspace({
    user:userDetail._id,
    messages:[{
      role: 'user',
      content:input
    }]
  });
  router.push('/workspace/'+workspaceId);
}

  return (
    

    <div className='flex flex-col items-center mt-36 xl:mt-42 gap-2'>
      <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
      <p className='text-gray-400 font-medium'>{Lookup.HERO_DESC}</p>
      <div className='p-5 border rounded-xl max-w-2xl w-full mt-3 '
      style={{
        backgroundColor:Colors.BACKGROUND
      }}>

      <div className='flex gap-2'>
        <textarea placeholder={Lookup.INPUT_PLACEHOLDER}
        onChange={(event)=>setUserInput(event.target.value)}
        className='outline-none bg-transparent w-full h-32 max-h-56 resize' />
        {userInput&& <ArrowRight
        onClick={()=>onGenerate(userInput)}
        className='bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer' />}
      </div>
      <div>
        <Link className='w-5 h-5'/>
      </div>
      </div>

      <div className='flex flex-wrap items-center justify-center gap-3 max-w-2xl mt-8'>
        {Lookup?.SUGGSTIONS.map((suggestion,index)=>(
          <h2 className='p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white'>{suggestion}</h2>
        ))}
      </div>
    </div>
  )
}

export default Hero