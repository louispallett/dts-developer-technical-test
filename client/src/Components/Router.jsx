import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import AllTasks from "./AllTasks";
import Search from "./Search";
import Create from "./Create";
import TaskInfo from "./TaskInfo";


export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    index: true,
                    element: <AllTasks />,

                },
                {
                    path: "search",
                    element: <Search />
                },
                {
                    path: "create",
                    element: <Create />
                },
                {
                    path: "task/:taskId",
                    element: <TaskInfo />
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}