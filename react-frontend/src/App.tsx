import { RouterProvider } from "react-router-dom";
import router from "./app/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer position="top-right" autoClose={3000}/>
    </>
  )
}

export default App
