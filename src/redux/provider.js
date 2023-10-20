"use client"
import { ToastContainer } from "react-toastify";
import { Store } from "./configureStore";
import { Provider, useSelector } from 'react-redux'
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/Component/Loader";

function ReduxProvider({ children }) {
    return <Provider store={Store}>
        <ToastContainer newestOnTop />
        <Loader />
        {children}
    </Provider>
}

export default ReduxProvider