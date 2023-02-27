import { useContext, useState } from 'react';
import axios from 'axios';
import '../Style/create.css'
import Cookies from 'universal-cookie';
import { context } from '../AuthContext/context';
import {  useNavigate } from 'react-router-dom';

const CreateTask = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const {setTodos,todos} = useContext(context)
    const cookies= new Cookies()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = cookies.get('token');
        console.log(token)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          };
          
          const data = {
            name,
            description
          };
        try {
            const response = await axios.post('https://josh-talks-backend.vercel.app/todo/add', data, { headers });
            console.log(response.data);
            setTodos(...todos,response.data)
            navigate('/home')
        } catch (error) {
            console.log(error)
        } 
    };
    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    className="todo-input"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Description:
                <input
                    className="todo-input"
                    type="text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                />
            </label>
            <br />
            <button className="todo-button" type="submit">Add Todo</button>
        </form>
    );
};
export default CreateTask;

