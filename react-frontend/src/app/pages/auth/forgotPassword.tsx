import { AxiosError } from "axios"
import { useState } from "react"
import { AuthSevice } from "../../../services/auth-service";

export default function ForgotPassword() {
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        email: '',
    });

    const [errors, setErrors] = useState({
        email: '',
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
            await AuthSevice.fortgotPassword(formData);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status == 422) {
                    const dataErrors = error.response.data.errors;
                    setErrors({
                        email: dataErrors.email ? dataErrors.email[0] : '',
                    })
                } else if (error.response?.status == 401) {
                    setMessage(error.response.data.message)
                }
            } else {
                console.log(error);
            }
        }

    }


    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div
                className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"
            >
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <img
                            aria-hidden="true"
                            className="object-cover w-full h-full dark:hidden"
                            src="/img/forgot-password-office.jpeg"
                            alt="Office"
                        />
                        <img
                            aria-hidden="true"
                            className="hidden object-cover w-full h-full dark:block"
                            src="/img/forgot-password-office-dark.jpeg"
                            alt="Office"
                        />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Forgot password</h1>
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Email</span>
                                <input
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="Jane Doe"
                                    name="email"
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <p className="text-red-500">{errors.email}</p>
                                )}
                                {message && (
                                    <p className="text-red-500">{message}</p>
                                )}
                            </label>

                            <a
                                className="cursor-pointer block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                onClick={hanbleSubmit}
                            >
                                Recover password
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}