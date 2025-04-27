import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ChevronDownIcon } from "@heroicons/react/16/solid";

export default function Create({ setTasks }) {
    const form = useForm();
    const { register, control, handleSubmit, formState, watch, reset, setValue, trigger } = form;
    const { errors } = formState;
    const [isPending, setIsPending] = useState(false);
    const [success, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState(null);

    const onSubmit = async (data) => {
        setIsPending(true);
        axios.post("/api/task/create", data)
            .then((response) => {
                setIsSuccess(true);
            }).catch((err) => {
                setServerError(err);
            }).finally(() => {
                setIsPending(false);
            })
    }

    return (
        <>
            <h3>Create Task</h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="standard-container">
                <div className="w-full h-full flex flex-col gap-2.5">
                    <input type="text" placeholder="Title" className="form-input"
                        {...register("title", {
                            required: "Title is required",
                            minLength: 1,
                            maxLength: 40
                        })}
                    />
                    <span className="text-sm font-bold text-red-400">
                        <p>{errors.title?.message}</p>
                    </span>
                    <textarea
                        name="description" id="description" placeholder="Task description (Optional)"
                        className="form-input"
                        {...register("description", {
                            maxLength: {
                                value: 10000,
                                message: "Max length is 10000"
                            }
                        })}
                    ></textarea>
                    <span className="text-sm font-bold text-red-400">
                        <p>{errors.description?.message}</p>
                    </span>
                    <div className="form-input flex flex-col md:flex-row gap-2.5 items-center">
                        <label htmlFor="date">Deadline:</label>
                        <input
                            type="date"
                            {...register ("due", {
                                required: "Deadline is required"
                            })}
                        />
                    <span className="text-sm font-bold text-red-400">
                        <p>{errors.due?.message}</p>
                    </span>
                    </div>
                    { isPending ? (
                        <button className="submit cursor-wait flex justify-center">
                            <div className="spinner h-6 w-6"></div>
                        </button>
                    ) : (
                        <>
                            { success ? (
                                <button className="success"
                                    type="button"
                                    onClick={() => {
                                            reset()
                                            setIsSuccess(false)
                                        }
                                    }
                                >
                                    <b>Success! Submit Another?</b>
                                </button>
                            ) : (
                                <button
                                    className="submit text-center"
                                    type="submit"
                                >
                                    Save and Submit
                                </button>
                            )}
                        </>
                    )}
                </div>
            </form>
        </>
    )
}
