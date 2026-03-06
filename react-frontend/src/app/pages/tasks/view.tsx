import LeftMenu from "../../../components/leftMenu";
import Header from "../../../components/header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TaskSevice } from "../../../services/task-service";

export default function TaskDetail() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    const { id } = useParams();

    useEffect(() => {
        const fetchTaskDetail = async () => {
            const taskId = id ? Number(id) : 0;
            const rep = await TaskSevice.show(taskId);
            const taskData = rep.data.task;

            setFormData({
                title: taskData.title,
                description: taskData.description,
            });
        }

        fetchTaskDetail();
    }, [id])

    const hanbleBack = () => {
        navigate('/tasks')
    }

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
                                <input
                                    disabled
                                    value={formData.title}
                                    name="title"
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" />
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Description</span>
                                <input
                                    disabled
                                    value={formData.description}
                                    name="description"
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" />
                            </label>
                            <button
                                style={{
                                    width: "200px",
                                    margin: "auto",
                                    marginTop: "10px"
                                }}
                                onClick={hanbleBack}
                                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                Back Tasks
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}