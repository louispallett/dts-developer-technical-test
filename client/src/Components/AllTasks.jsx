import axios from "axios";
import { useState, useEffect } from "react";

import TaskCard from "./TaskCard";

const apiUrl = import.meta.env.VITE_API_URL;

export default function AllTasks() {
    const [loading, setLoading] = useState(true);
    const [allTasks, setAllTasks] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);

    useEffect(() => {
        const getAllTasks = () => {
            axios.get(`${apiUrl}/task/get-all`)
                .then((response) => {
                    setAllTasks(response.data.allTasks);
                    setTasks(response.data.allTasks);
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    setLoading(false);
                })
        }
        getAllTasks();
    }, [])

    const changeFilter = (value) => {
        setActiveFilter(value); // <-- track selected button
        if (value === null) {
            setTasks(allTasks);
        } else {
            const filteredData = allTasks.filter(item => item.status === value);
            setTasks(filteredData);
        }
    }    

    return (
        <>
            <h3>All Tasks</h3>
            { loading ? (
                <div className="flex justify-center items-center my-10">
                    <svg viewBox="25 25 50 50">
                        <circle r="20" cy="50" cx="50"></circle>
                    </svg>
                </div>
            ) : (
                <>
                    <Filter changeFilter={changeFilter} activeFilter={activeFilter} />
                    { tasks.length < 1 ? (
                        <div className="standard-container text-xl my-2.5 flex gap-2.5 justify-between">
                            <p>No tasks</p>
                        </div>
                    ) : (
                        <>
                            { tasks.map(item => (
                                <TaskCard data={item} key={item._id} />
                            ))}
                        </>
                    )}
                </>
            )}
        </>
    )
}

function Filter({ changeFilter, activeFilter }) {
    return (
        <div className="standard-container md:text-xl !p-0 flex flex-col md:flex-row gap-2.5 md:justify-between">
            <p className="pl-1.5 md:pl-3.5 text-center font-bold">Filter</p>
            <div className="flex flex-col md:flex-row">
                <button
                    onClick={() => changeFilter(null)}
                    className={activeFilter === null ? "bg-indigo-200 px-1.5" : "px-1.5"}
                >
                    None
                </button>
                <button
                    onClick={() => changeFilter(1)}
                    className={activeFilter === 1 ? "bg-indigo-200 px-1.5" : "px-1.5"}
                >
                    Under Review
                </button>
                <button
                    onClick={() => changeFilter(2)}
                    className={activeFilter === 2 ? "bg-indigo-200 px-1.5" : "px-1.5"}
                >
                    Active
                </button>
                <button
                    onClick={() => changeFilter(3)}
                    className={activeFilter === 3 ? "bg-indigo-200 px-1.5" : "px-1.5"}
                >
                    Closed
                </button>
            </div>
        </div>
    )
}

function SortBy() {
    return (
        <div className="standard-container !p-0 self-start">
            <nav className="menu-wrapper">

            </nav>
        </div>
    )
}