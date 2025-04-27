import { Link, Outlet, useLocation } from "react-router-dom";
import { InboxStackIcon } from "@heroicons/react/16/solid";

export default function App() {
    return (
            <>
                <div className="flex items-center flex-col">
                    <h2 className="text-center">HMCTS</h2>
                    <div className="flex items-center">
                        <h4 className="text-center">Task Manager</h4>
                        <InboxStackIcon className="h-8" />
                    </div>
                </div>
                        <div className="main-container justify-center">
                <div className="standard-container !p-0 self-center md:self-start">
                    <MenuBar />
                </div>
                <div className="sm:min-w-minArticle sm:max-w-maxArticle">
                    <div className="p-2.5">
                        <Outlet />
                    </div>
                </div>
                        </div>
            </>
    )
}

function MenuBar() {
    const location = useLocation();

    return (
        <nav>
            <Link to="/" className={location.pathname === "/" ? "bg-indigo-300" : ""}>
                <button>
                    All
                </button>
            </Link>
            <Link to="/search" className={location.pathname === "/search" ? "bg-indigo-300" : ""}>
                <button>
                    Search
                </button>
            </Link>
            <Link to="/create" className={location.pathname === "/create" ? "bg-indigo-300" : ""}>
                <button>
                    Create
                </button>
            </Link>
        </nav>
    );
}