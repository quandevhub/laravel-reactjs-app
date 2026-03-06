import LeftMenu from "../../../components/leftMenu";
import Header from "../../../components/header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserService } from "../../../services/user-service";

export default function UserDetail() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
    });
    const { id } = useParams();

    useEffect(() => {
        const fetchUserDetail = async () => {
            const userId = id ? Number(id) : 0;
            const rep = await UserService.show(userId);
            const userData = rep.data.user;

            setFormData({
                name: userData.name,
                email: userData.email,
                role: userData.role,
            });
        }

        fetchUserDetail();
    }, [id])

    const hanbleBack = () => {
        navigate('/users')
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
                            Show Detail
                        </h4>
                        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Name</span>
                                <input
                                    disabled
                                    value={formData.name}
                                    name="name"
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" />
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Email</span>
                                <input
                                    disabled
                                    value={formData.email}
                                    name="email"
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" />
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Role</span>
                                <input
                                    disabled
                                    value={formData.role == '1' ? 'Admin' : 'User'}
                                    name="role"
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
                                Back User List
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}