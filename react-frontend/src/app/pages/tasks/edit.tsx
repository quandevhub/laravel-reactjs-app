import LeftMenu from "../../../components/leftMenu";
import Header from "../../../components/header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TaskSevice } from "../../../services/task-service";
import { AxiosError } from "axios";
import { CurrentUserLogin } from "../../../services/auth-service";
import { UserService } from "../../../services/user-service";
import type { IUser } from "../../../entities/user";
import { toast } from 'react-toastify';
import { isAdmin } from "../../../services/auth-service";

export default function TaskEdit() {
    const user = CurrentUserLogin();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'new',
        due_date: '',
        priority: 'low',
        assigned_to: 0,
        created_by: user ? user.id : 0,
    });
    const { id } = useParams();

    const [users, setUsers] = useState<IUser[]>([]);

    const [errors, setErrors] = useState({
        title: '',
        description: '',
    });


    useEffect(() => {
        const fetchTaskDetail = async () => {
            const taskId = id ? Number(id) : 0;
            const rep = await TaskSevice.show(taskId);
            const taskData = rep.data.task;

            setFormData({
                title: taskData.title,
                description: taskData.description,
                status: taskData.status,
                due_date: taskData.due_date,
                priority: taskData.priority,
                assigned_to: taskData.assigned_to,
                created_by: taskData.created_by,
            });
        }

        fetchTaskDetail();
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        }
        )
    }

    const hanbleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const taskId = id ? Number(id) : 0;
            const rep = await TaskSevice.update(taskId, formData);
            toast.success(rep.data.message);
            navigate('/tasks')
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status == 422) {
                const dataErrors = error.response.data.errors;
                setErrors({
                    title: dataErrors.title ? dataErrors.title[0] : '',
                    description: dataErrors.description ? dataErrors.description[0] : '',
                })
            } else {
                toast.success('error');
            }
        }

    }

    const fetchUsers = async () => {
        try {
            const rep = await UserService.list();
            setUsers(rep.data.users);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* <!-- Desktop sidebar --> */}
            <LeftMenu />

            <div className="flex flex-col flex-1 w-full">
                <Header />
                <main className="h-full pb-16 overflow-y-auto">
                    <div className="container grid px-6 mx-auto">
                        <h4 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                            Register Task
                        </h4>
                        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Title</span>
                                <span className="text-red-600">*</span>
                                <input
                                    value={formData.title}
                                    onChange={handleChange}
                                    name="title"
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" />
                                {errors.title && (
                                    <p className="text-red-600">{errors.title}</p>
                                )}
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Description</span>
                                <span className="text-red-600">*</span>
                                <input
                                    value={formData.description}
                                    onChange={handleChange}
                                    name="description"
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" />
                                {errors.title && (
                                    <p className="text-red-600">{errors.title}</p>
                                )}
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Status
                                </span>
                                <select
                                    value={formData.status || ""}
                                    onChange={handleChange}
                                    className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                    name="status">
                                    <option value='new'>new</option>
                                    <option value='in_progress'>in_progress</option>
                                    <option value='pending'>pending</option>
                                    <option value='completed'>completed</option>
                                    <option value='Expired'>expired</option>
                                </select>
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Due_date
                                </span>
                                <input name="due_date" type="date"
                                    value={formData.due_date}
                                    onChange={handleChange}
                                    className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" />
                            </label>
                            {isAdmin() && (
                                <>  
                                <label className="block mt-4 text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">
                                        Priority
                                    </span>
                                    <select
                                        value={formData.priority || ""}
                                        onChange={handleChange}
                                        className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                        name="priority">
                                        <option value='low'>low</option>
                                        <option value='medium'>medium</option>
                                        <option value='high'>high</option>
                                    </select>
                                </label>
                                <label className="block mt-4 text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">
                                        Assigned_to
                                    </span>
                                    <select
                                        value={formData.assigned_to || ""}
                                        onChange={handleChange}
                                        className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                        name="assigned_to">
                                        {Array.isArray(users) && users.map((item, index) => (
                                            <option value={item.id} key={index}>{item.name}</option>

                                        ))}
                                    </select>
                                </label>
                                </>
                            )}
                            <button
                                style={{
                                    width: "200px",
                                    margin: "auto",
                                    marginTop: "10px"
                                }}
                                onClick={hanbleSubmit}
                                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                Update Task
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}