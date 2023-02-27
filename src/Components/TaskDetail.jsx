import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Todo = ({ match }) => {
    const { id } = useParams()
    const [todo, setTodo] = useState(null);
    const [lists, setLists] = useState([]);
    const [newListName, setNewListName] = useState('');

    useEffect(() => {
        const fetchTodo = async () => {
            const { data } = await axios.get(`https://josh-talks-backend.vercel.app/todo/${id}`);
            setTodo(data);
        };
        fetchTodo();
    }, [id]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post(`https://josh-talks-backend.vercel.app/lists/${id}`, {
            name: newListName,
        });
        setLists([...lists, response.data]);
        setNewListName('');
    };

    if (!todo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{todo.name}</h2>
            <p>{todo.description}</p>
            <h3>Lists</h3>
            {lists.length>0 ? <ul>
                {lists.map((list) => (
                    <li key={list._id}>{list.name}</li>
                ))}
            </ul>:null}
            <form onSubmit={handleSubmit}>
                <label>
                    New List Name:
                    <input
                        type="text"
                        value={newListName}
                        onChange={(event) => setNewListName(event.target.value)}
                    />
                </label>
                <button type="submit">Add List</button>
            </form>
        </div>

    );
};

export default Todo;
