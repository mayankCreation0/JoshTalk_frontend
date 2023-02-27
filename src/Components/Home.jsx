import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {  useToast } from '@chakra-ui/react';
import Cookies from 'universal-cookie';
import '../Style/Home.css'
import { Link } from 'react-router-dom';
import { context } from '../AuthContext/context';

const Home = () => {
    const {store} = useContext(context)
    const cookies = new Cookies();
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState([]);
    const toast = useToast();

    const fetchData = () => {
        const token = cookies.get('token');
        console.log(token)
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        setLoading(true);
        axios
            .get(
                `https://josh-talks-backend.vercel.app/todo`,
                { headers }
            )
            .then((response) => {
                console.log(response.data)
                setTodos(response.data)
                setLoading(false);
                console.log(store)
                // console.log(object)
            })
            .catch((error) => {
                toast({
                    title: "Something went wrong",
                    description: "We've created your account for you.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
                console.log("err", error);
                setLoading(false);
            });
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <ul>
                {todos.map(todo => (
                    <>
                    <li className="todo-item" key={todo._id}>
                        <h2>{todo.name}</h2>
                        <p>{todo.description}</p>
                        <p className="created-by">Created by: {todo.createdBy.username}</p>
                    </li>
                        {store._id === todo.createdBy._id ? <Link to={`/tododetail/${todo._id}`}><button>show detail</button></Link> : null}
                   </>
                ))}
            </ul>
        </div>
    );
};

export default Home;
