import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form";

import { ArrowLongRightIcon } from "@heroicons/react/16/solid";

const apiUrl = import.meta.env.VITE_API_URL;

const statusMap = {
    1: "Under Review",
    2: "Active",
    3: "Closed",
};

export default function TaskInfo() {
    const { taskId } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const form = useForm();
    const { register, control, handleSubmit, formState, watch, reset, setValue, trigger } = form;
    const { errors } = formState;
    const [isPending, setIsPending] = useState(false);
    const [serverError, setServerError] = useState(null);


    useEffect(() => {
        axios.get(`${apiUrl}/task/get`, {
            params: { taskId }
        }).then((response) => {
            setData(response.data.task[0]);
        }).catch((err) => {
            console.log(err.message);
            setError(err.message);
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    const onSubmit = async () => {
        setIsPending(true);
        axios.put(`${apiUrl}/task/update-status`, {
            taskId,
            status: data.status
        }).then((response) => {

        }).catch((err) => {
            setServerError(err.message);
        }).finally(() => {
            setIsPending(false);
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="standard-container my-2.5">
                { error && (
                    <p className="font-bold text-red-600 my-2.5">{error}</p>
                )}
                { loading && (
                    <div className="flex justify-center items-center my-10">
                        <svg viewBox="25 25 50 50">
                            <circle r="20" cy="50" cx="50"></circle>
                        </svg>
                    </div>
                )}
                { data && (
                    <>
                        <div className="flex flex-col md:flex-row justify-between md:items-end">
                            <h4>{data.title}</h4>
                            <p className="text-slate-500">{data._id}</p>
                        </div>
                        <div className="flex flex-col gap-1.5 items-start">
                            { data.description ? (
                                <p className="my-2.5">{data.description}</p>
                            ) : (
                                <p className="text-slate-600 my-2.5"><i>Description left intentionally blank.</i></p>
                            )}
                            <div className="flex flex-col md:flex-row gap-2.5 justify-between">
                                <p className={data.status === 1 ? "status open" : "status"}>Under Review</p>
                                <ArrowLongRightIcon className="w-4" />
                                <p className={data.status === 2 ? "status open" : "status"}>Active</p>
                                <ArrowLongRightIcon className="w-4" />
                                <p className={(data.status === 3 ? "status closed" : "status")}>Closed</p>
                            </div>
                            <p className="my-1.5">Due: {data.dueFormatted}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                            <button
                                className="submit"
                                type="button"
                                disabled={data.status === 1}
                                onClick={() => setData(prev => ({ ...prev, status: Math.max(prev.status - 1, 1) }))}
                            >
                                Previous Status
                            </button>

                            <button
                                className="submit"
                                type="button"
                                disabled={data.status === 3}
                                onClick={() => setData(prev => ({ ...prev, status: Math.min(prev.status + 1, 3) }))}
                            >
                                Next Status
                            </button>
                        </div>
                    </>
                )}
                { serverError && (
                    <p className="font-bold text-red-600 my-2.5">{serverError}</p>
                )}
            </div>
            { data && (
                <div className="flex flex-col md:flex-row gap-2.5">
                    <button className="success flex justify-center"
                        type="submit"
                    >
                        { isPending ? (
                            <div className="spinner h-6 w-6"></div>
                        ) : (
                            <>Save</>
                        )}
                    </button>
                    <Delete taskId={data._id}/>
                </div>
            )}
        </form>
    )
}

function Delete({ taskId }) {
    const [isPending, setIsPending] = useState(false);
    const [serverError, setServerError] = useState(null);

    const handleDeletion = async () => {
        setIsPending(true);
        axios.post(`${apiUrl}/task/delete`, { 
            taskId 
        }).then((response) => {
            window.location.assign("/");
        }).catch((err) => {
            console.log(err.message);
            setServerError(err.message)
        }).finally(() => {
            setIsPending(false);
        })
    }

    return (
        <>
            <button className="danger flex justify-center"
                type="button"
                onClick={handleDeletion}
            >
                { isPending ? (
                    <div className="spinner h-6 w-6"></div>
                ) : (
                    <>Delete Task</>
                )}
            </button>
            { serverError && (
                <p className="font-bold text-red-600 my-2.5">{serverError}</p>
            )}
        </>
    )
}