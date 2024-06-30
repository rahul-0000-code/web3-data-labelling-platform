"use client"
import Appbar from '@/components/Appbar'
import { BACKEND_URL } from '@/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';

async function getTaskDetails(taskId: string) {
    const response = await axios.get(`${BACKEND_URL}/v1/user/task?taskId=${taskId}`, {
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    })
    return response.data
}

function page({params: { taskId }}: {params: { taskId: string }}) {
    const [result, setResult] = useState<Record<string, {
        count: number;
        option: {
            imgUrl: string
        }
    }>>({});

    const [taskDetails, setTaskDetails] = useState<{
        title?: string
    }>({});

    useEffect(() => {
        getTaskDetails(taskId)
            .then((data) => {
                setResult(data.result)
                setTaskDetails(data.taskDetails)
            })
    }, [taskId]);

    return <div>
        <Appbar />
        <div className='text-xl pt-10 flex justify-center text-blue-700 font-thin'>
            {taskDetails.title}
        </div>
        <div className='flex justify-center pt-5'>
            {Object.keys(result || {}).map(taskId => <Task imageUrl={result[taskId].option.imgUrl} votes={result[taskId].count} />)}
        </div>
    </div>
}

function Task({imageUrl, votes}: {
    imageUrl: string;
    votes: number;
}) {
    return <div>
        <img className={"p-2 w-96 rounded-md"} src={imageUrl} />
        <div className='flex justify-center'>
            {votes}
        </div>
    </div>
}

export default page