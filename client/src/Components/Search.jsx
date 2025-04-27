import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

import TaskCard from "./TaskCard";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Search() {
    const form = useForm();
    const { register, control, handleSubmit, formState, watch, reset, setValue, trigger } = form;
    const { errors } = formState;
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [serverError, setServerError] = useState(null);

    const onSubmit = async (data) => {
        setLoading(true);
        axios.get(`${apiUrl}/task/get`, {
            headers: { taskId: data.taskId }
        })
            .then((response) => {
                console.log(response.data)
                setTasks(response.data.task);
            }).catch((err) => {
                setTasks([]);
                setServerError(err);
            }).finally(() => {
                setLoading(false);
            })
    }


    return (
        <>
            <h3>Search</h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex gap-2.5 items-center">
                <input type="text" placeholder="Search via id" className="form-input"
                    {...register("taskId", {
                        required: "Input is required"
                    })}
                />
                <button type="submit">
                    <MagnifyingGlassIcon className="w-6" />
                </button>
            </form>
            <span className="text-sm font-bold text-red-400">
                <p>{errors.taskId?.message}</p>
            </span>
                { loading ? (
                    <div className="standard-container my-2.5">
                        <div className="flex justify-center items-center my-10">
                            <svg viewBox="25 25 50 50">
                                <circle r="20" cy="50" cx="50"></circle>
                            </svg>
                        </div>
                    </div>
                ) : (
                    <>
                        { tasks && (
                            <>
                                { tasks.length > 0 ? (
                                    <TaskCard data={tasks[0]} />
                                ) : (
                                    <div className="standard-container my-2.5">
                                        <p className="text-center my-5">No tasks found</p>
                                    </div>
                                )}
                            </>
                        )}                    
                    </>
                )}
        </>
    )
}