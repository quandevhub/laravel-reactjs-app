import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { isAdmin } from "../services/auth-service";

export default function LeftMenu() {
    const location = useLocation();
    
    return (
        <aside className="z-20 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block">
            <div className="py-4 text-gray-500 dark:text-gray-400">
                <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
                    Tasks management
                </a>
                <ul className="mt-6">
                    {isAdmin() && (
                        <li className="relative px-6 py-3">
                            {location.pathname === '/users' && (
                                <span className="absolute inset-y-0 left-5 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"></span>
                            )}
                            <a className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                                href="/users">
                                <span className="ml-4">Users</span>
                            </a>
                        </li>
                    )}
                    <li className="relative px-6 py-3">
                        {location.pathname === '/tasks' && (
                            <span className="absolute inset-y-0 left-5 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                aria-hidden="true"></span>
                        )}
                        <a className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                            href="/tasks">
                            <span className="ml-4">Tasks</span>
                        </a>
                    </li>
                </ul>
                {isAdmin() && (
                    <div className="px-6 my-6">
                        {location.pathname === '/users' && (
                            <Link to="/users/create">
                                <button
                                    className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                    Create User
                                    <span className="ml-2" aria-hidden="true">+</span>
                                </button>
                            </Link>
                        )}
                        {location.pathname === '/tasks' && (
                            <Link to="/tasks/create">
                                <button
                                    className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                    Create task
                                    <span className="ml-2" aria-hidden="true">+</span>
                                </button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </aside>
    )
}