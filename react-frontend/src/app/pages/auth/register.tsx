import { AxiosError } from "axios"
import { useState } from "react"
import { AuthSevice } from "../../../services/auth-service";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        }
        )
    }

    const hanbleSubmit = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        try {
            const respon = await AuthSevice.register(formData);
            console.log('user registered successfully' + respon);
            navigate('/user/login')
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status == 422) {
                const dataErrors = error.response.data.errors;
                setErrors({
                    name: dataErrors.name ? dataErrors.name[0] : '',
                    email: dataErrors.email ? dataErrors.email[0] : '',
                    password: dataErrors.password ? dataErrors.password[0] : '',
                    password_confirmation: dataErrors.password_confirmation ? dataErrors.password_confirmation[0] : '',
                })
            } else {
                console.log(error);
            }
        }

    }

    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <img aria-hidden="true" className="object-cover w-full h-full dark:hidden"
                            src="/img/create-account-office.jpeg" alt="Office" />
                        <img aria-hidden="true" className="hidden object-cover w-full h-full dark:block"
                            src="/img/create-account-office-dark.jpeg" alt="Office" />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                Create account
                            </h1>
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Name</span>
                                <input
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="Jane Doe"
                                    name="name"
                                    onChange={handleChange}
                                />
                                {errors.name && (
                                    <p className="text-red-500">{errors.name}</p>
                                )}
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Email</span>
                                <input
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="JaneDoe@gmail.com"
                                    name="email"
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <p className="text-red-500">{errors.email}</p>
                                )}
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Password</span>
                                <input
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="***************" type="password"
                                    name="password"
                                    onChange={handleChange}
                                />
                                                                {errors.password && (
                                    <p className="text-red-500">{errors.password}</p>
                                )}
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Confirm password
                                </span>
                                <input
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="***************" type="password"
                                    name="password_confirmation"
                                    onChange={handleChange}
                                />
                            </label>

                            <a className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple cursor-pointer"
                                onClick={hanbleSubmit}
                            >
                                Create account
                            </a>

                            <hr className="my-8" />

                            <p className="mt-4">
                                <Link to="/user/login" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">Already have an account? Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}