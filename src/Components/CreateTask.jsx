import { useState } from 'react';
import axios from 'axios';
import '../Style/create.css'

const CreateTask = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/todo/add', {
                name,
                description,
            });
            console.log(response.data);
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
                />
            </label>
            <br />
            <button className="todo-button" type="submit">Add Todo</button>
        </form>
    );
};
export default CreateTask;

