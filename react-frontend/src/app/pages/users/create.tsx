import LeftMenu from "../../../components/leftMenu";
import Header from "../../../components/header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";
import { UserService } from "../../../services/user-service";
import { toast } from 'react-toastify';

export default function UserCreate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 0,
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });

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
            const rep = await UserService.store(formData);
            toast.success(rep.data.message);
            navigate('/users')
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status == 422) {
                const dataErrors = error.response.data.errors;
                setErrors({
                    name: dataErrors.name ? dataErrors.name[0] : '',
                    email: dataErrors.email ? dataErrors.email[0] : '',
                    password: dataErrors.password ? dataErrors.password[0] : '',
                    role: dataErrors.role ? dataErrors.role[0] : '',
                })
            } else {
                toast.success('error');
            }
        }

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
                            Register User
                        </h4>
                        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Name</span>
                                <span className="text-red-600">*</span>
                                <input
                                    onChange={handleChange}
                                    name="name"
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" />
                                {errors.name && (
                                    <p className="text-red-600">{errors.name}</p>
                                )}
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Email</span>
                                <span className="text-red-600">*</span>
                                <input
                                    onChange={handleChange}
                                    name="email"
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" />
                                {errors.email && (
                                    <p className="text-red-600">{errors.email}</p>
                                )}
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Password
                                </span>
                                <input name="password" type="password"
                                    onChange={handleChange}
                                    className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" />
                                {errors.password && (
                                    <p className="text-red-600">{errors.password}</p>
                                )}
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Account Type<span className="text-red-600">*</span>
                                </span>
                                <input type="radio" name="role" value="0" onChange={handleChange} />
                                <label htmlFor="admin">Staff</label>
                                <input type="radio" name="role" value="1" onChange={handleChange} />
                                <label htmlFor="user">Admin</label>
                                {errors.role && (
                                    <p className="text-red-600">{errors.role}</p>
                                )}

                            </label>
                            <button
                                style={{
                                    width: "200px",
                                    margin: "auto",
                                    marginTop: "10px"
                                }}
                                onClick={hanbleSubmit}
                                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                Create User
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}