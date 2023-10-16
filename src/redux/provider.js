"use client"
import { ToastContainer } from "react-toastify";
import { Store } from "./configureStore";
import { Provider } from 'react-redux'
import "react-toastify/dist/ReactToastify.css";

function ReduxProvider({ children }) {
    return <Provider store={Store}>
        <ToastContainer newestOnTop />
        {children}
    </Provider>
}

export default ReduxProvider