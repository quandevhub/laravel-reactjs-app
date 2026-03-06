import { AxiosError } from "axios"
import { useState } from "react"
import { AuthSevice } from "../../../services/auth-service";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({
        password: '',
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
            const respon = await AuthSevice.resetPassword(formData);
            setMessage(respon.data.message);
            navigate('/user/login')
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status == 422) {
                    const dataErrors = error.response.data.errors;
                    setErrors({
                        password: dataErrors.password ? dataErrors.password[0] : '',
                    })
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
                            {message && (
                                <p className="text-red-500">{message}</p>
                            )}
                            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Reset password</h1>
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">New password</span>
                                <input
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                />
                                {errors.password && (
                                    <p className="text-red-500">{errors.password}</p>
                                )}
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Confirm password</span>
                                <input
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="Jane Doe"
                                    name="password_confirmation"
                                    type="password"
                                    onChange={handleChange}
                                />
                            </label>

                            <a
                                className="cursor-pointer block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                onClick={hanbleSubmit}
                            >
                                Reset password
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}