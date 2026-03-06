import LeftMenu from "../../../components/leftMenu";
import Header from "../../../components/header";
import { TaskSevice } from "../../../services/task-service";
import { useEffect, useState } from "react";
import type { RegisterData } from "../../../entities/task";
import type { IListUser } from "../../../entities/user";
import moment from 'moment';
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAdmin } from "../../../services/auth-service";
import { CurrentUserLogin } from "../../../services/auth-service";

export default function TaskIndex() {
    const [tasks, setTasks] = useState<RegisterData[]>([]);
    const [users, setUsers] = useState<IListUser>([]);
    const navigate = useNavigate();
    const currentUser = CurrentUserLogin();

    const [pagination, setPagination] = useState({
        total: 0,
        per_page: 2,
        current_page: 1,
        last_page: 1,
    })

    const editTask = (id: number) => {
        navigate("/tasks/" + id + "/edit");
    }

    const detailTask = (id: number) => {
        navigate("/tasks/" + id);
    }

    const fetchTasks = useCallback(async (page = 1, keyword = "") => {
        try {
            const rep = await TaskSevice.list(page, keyword, currentUser?.id);
            const result = rep.data.tasks;
            setTasks(result.data);
            setUsers(rep.data.users);

            setPagination({
                total: result.total,
                per_page: result.per_page,
                current_page: result.current_page,
                last_page: result.last_page,
            })
        } catch (error) {
            console.log(error);
        }
    }, [])

    const showUserName = (userId: number | null) => {
        return users?.[+userId!] || '';
    }

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks])

    const deleteTask = async (id: number) => {
        if (window.confirm("Are you sure to delete this task?")) {
            try {
                const rep = await TaskSevice.delete(id);
                toast.success(rep.data.message || "Task deleted successfully");
                fetchTasks();
            } catch (error) {
                toast.error("Failed to delete task" + error);
            }
        }
    }

        const handlePageClick = (page: number) => {
            if (page != pagination.current_page && page > 0 && page <= pagination.last_page) {
                fetchTasks(page);
            }
        }

        const showRangeText = () => {
            const { current_page, per_page, total } = pagination;
            const from = (current_page - 1) * per_page + 1;
            const to = Math.min(current_page * per_page, total);

            return `Showing ${from}-${to} of ${total}`;
        }

        const renderPagePagination = () => {
            const pages = [];
            const { current_page, last_page } = pagination;

            const start = Math.max(current_page - 2, 1);
            const end = Math.min(current_page + 2, last_page);

            if (start > 1) {
                pages.push(<li key="start">...</li>)
            }

            for (let i = start; i <= end; i++) {
                pages.push(
                    <li key={i}>
                        <button
                            onClick={() => handlePageClick(i)}
                            className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple 
                            ${i === current_page ? "bg-purple-600 border border-r-0 border-purple-600 text-white" : ""}
                        `}>
                            {i}
                        </button>
                    </li>
                )
            }

            if (end < last_page) {
                pages.push(<li key="end">...</li>)
            }

            return pages;
        }
        return (
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                {/* <!-- Desktop sidebar --> */}
                <LeftMenu />

                <div className="flex flex-col flex-1 w-full">
                    <Header onSearch={fetchTasks} />
                    <main className="h-full pb-16 overflow-y-auto">
                        <div className="container grid px-6 mx-auto">
                            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                Tasks
                            </h2>

                            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                                <div className="w-full overflow-x-auto">
                                    <table className="w-full whitespace-no-wrap">
                                        <thead>
                                            <tr
                                                className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                                <th className="px-4 py-3">ID</th>
                                                <th className="px-4 py-3">Title</th>
                                                <th className="px-4 py-3">Description</th>
                                                <th className="px-4 py-3">Status</th>
                                                <th className="px-4 py-3">Due_date</th>
                                                <th className="px-4 py-3">Priority</th>
                                                <th className="px-4 py-3">Assigned_to</th>
                                                <th className="px-4 py-3">Created_by</th>
                                                <th className="px-4 py-3">Created_at</th>
                                                <th className="px-4 py-3">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                            {tasks && tasks.map((item, index) => (
                                                <tr className="text-gray-700 dark:text-gray-400" key={index}>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center text-sm">
                                                            {/* <!-- Avatar with inset shadow --> */}
                                                            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">{item.id}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">{item.title}</td>
                                                    <td className="px-4 py-3 text-sm">{item.description}</td>
                                                    <td className="px-4 py-3 text-xs">
                                                        <span
                                                            className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                                            Done
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">{item.due_date}</td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <span
                                                            className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
                                                            high
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">{showUserName(item.assigned_to)}</td>
                                                    <td className="px-4 py-3 text-xs">{showUserName(item.created_by)}</td>
                                                    <td className="px-4 py-3 text-sm">
                                                        {moment(item.created_at).format('DD-MM-YYYY')}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center space-x-4 text-sm">
                                                            <button
                                                                onClick={() => item.id && detailTask(item.id)}
                                                                className="flex items-center justify-between px-2 py-2 font-medium leading-5 text-green-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                                aria-label="View">
                                                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor"
                                                                    viewBox="0 0 20 20">
                                                                    <path
                                                                        d="M10 3.5C5 3.5 1.73 7.11 1 10c.73 2.89 4 6.5 9 6.5s8.27-3.61 9-6.5c-.73-2.89-4-6.5-9-6.5zm0 11a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() => item.id && editTask(item.id)}
                                                                className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                                aria-label="Edit">
                                                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor"
                                                                    viewBox="0 0 20 20">
                                                                    <path
                                                                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                                                                    </path>
                                                                </svg>
                                                            </button>
                                                            {isAdmin() && (
                                                                <button
                                                                    onClick={() => item.id && deleteTask(item.id)}
                                                                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                                    aria-label="Delete">
                                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor"
                                                                        viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd"
                                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                            clipRule="evenodd"></path>
                                                                    </svg>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div
                                    className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                                    <span className="flex items-center col-span-3">
                                        {showRangeText()}
                                    </span>
                                    <span className="col-span-2"></span>
                                    {/* <!-- Pagination --> */}
                                    <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                                        <nav aria-label="Table navigation">
                                            <ul className="inline-flex items-center">
                                                <li>
                                                    <button
                                                        onClick={() => handlePageClick(pagination.current_page - 1)}
                                                        disabled={pagination.current_page === 1}
                                                        className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                                                        aria-label="Previous">
                                                        <svg className="w-4 h-4 fill-current" aria-hidden="true"
                                                            viewBox="0 0 20 20">
                                                            <path
                                                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                                clipRule="evenodd" fillRule="evenodd"></path>
                                                        </svg>
                                                    </button>
                                                </li>
                                                {renderPagePagination()}
                                                <li>
                                                    <button
                                                        onClick={() => handlePageClick(pagination.current_page + 1)}
                                                        disabled={pagination.current_page === pagination.last_page}
                                                        className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                                                        aria-label="Next">
                                                        <svg className="w-4 h-4 fill-current" aria-hidden="true"
                                                            viewBox="0 0 20 20">
                                                            <path
                                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                clipRule="evenodd" fillRule="evenodd"></path>
                                                        </svg>
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }