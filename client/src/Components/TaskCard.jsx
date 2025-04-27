import { Link } from "react-router-dom";

import { statusMap } from "../utils/statusMap"; 

export default function TaskCard({ data }) {
    return (
        <Link to={"/task/" + data._id}>
            <div className="standard-container link my-2.5 max-w-minArticle">
                    <div className="flex flex-col md:flex-row justify-between md:items-end">
                        <h4>{data.title}</h4>
                        <p className="text-slate-500">{data._id}</p>
                    </div>
                <div className="flex flex-col gap-1.5 items-start">
                    { data.description ? (
                        <p>{data.description}</p>
                    ) : (
                        <p className="text-slate-600"><i>Description left intentionally blank.</i></p>
                    )}
                    <p className={data.status === 3 ? "status closed" : "status open"}>Status: {statusMap[data.status]}</p>
                    <p>Due: {data.dueFormatted}</p>
                </div>
            </div>
        </Link>
    )
}