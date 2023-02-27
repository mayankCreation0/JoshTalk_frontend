import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateTask from "../Components/CreateTask";
import Home from "../Components/Home";
import LoginPage from "../Components/LoginPage";
import Navbar from "../Components/Navbar";
import SignupPage from "../Components/Signup";
import TodoDetails from "../Components/TaskDetail";
import PrivateRoute from "./PrivateRoutes";

function AllRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Navbar />
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/createpage"
                    element={
                        <PrivateRoute>
                        <Navbar/>
                            <CreateTask />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/tododetail/:id"
                    element={
                        <PrivateRoute>
                            <Navbar />
                            <TodoDetails />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    );
}
export default AllRoutes;
