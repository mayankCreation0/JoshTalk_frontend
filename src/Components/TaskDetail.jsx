import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { Button, Input } from "@chakra-ui/react";
import Cookies from "universal-cookie";
import { Button, FormControl, FormLabel, Input, ModalHeader, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, useDisclosure, useToast, Select } from '@chakra-ui/react';
import '../Style/taskdetail.css'
const Todo = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { id } = useParams()
    const [todo, setTodo] = useState(null);
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [name, setName] = useState('');
    const [status, setDescription] = useState('');
    const cookies = new Cookies();
    const [lists, setLists] = useState([]);
    const [newListName, setNewListName] = useState('');
    const [operationId,setOperationId]=useState("");
    const token = cookies.get('token');
    const deleteLists = (listId) => {
        const array = lists.filter(el => el._id !== listId);
        setLists([...array]);
    }
    const doEmpty = () => {
        setName("");
    }
    const updateLists = (_id) => {
        const arr = lists.map((el, i) => {
            if (el._id === _id) {
                lists[i].name = name || lists[i].name;
                lists[i].status = status || lists[i].status;
            }
        })
        setLists([...lists])
        doEmpty();
    }
    const handleUpdate = async () => {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };

        const data = {
            name,
            status
        };
        console.log()
        try {
            const response = await axios.put(`https://josh-talks-backend.vercel.app/todo/lists/${id}/${operationId}`, data, { headers });
            console.log(response.data);
            updateLists(operationId);
        } catch (error) {
            console.log(error)
        }
    }
    const handleRemove = async (listId) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };
        try {
            const response = await axios.delete(`https://josh-talks-backend.vercel.app/todo/lists/${id}/${listId}`, { headers });
            deleteLists(listId);
        } catch (error) {
            console.log(error)
        }
    }
    const todoSet = (arr) => {
        setLists([...arr.lists]);
    }
    useEffect(() => {
        const fetchTodo = async () => {
            const { data } = await axios.get(`https://josh-talks-backend.vercel.app/todo/${id}`);
            setTodo(data);
            todoSet(data);

        };
        fetchTodo();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };
        try {
            const response = await axios.post(`https://josh-talks-backend.vercel.app/todo/lists/${id}`, {
                name: newListName,
            }, { headers });
            console.log(response.data.lists);
            setLists([...response.data.lists]);
            setNewListName('');
        } catch (e) {
            console.log(e);
        }
    };

    if (!todo) {
        return <div>Loading...</div>;
    }


    return (
        <div className="taskcontainer">
            <h2>Todo Title : {todo.name}</h2>
            <p>Todo Description : {todo.description}</p>
            <p style={{fontWeight:"600", fontSize:'25px', color:"red",textDecoration:'underline'}}> Your Todo Lists</p>
            {lists.length > 0 ? <ul>
                {lists.map((list) => (<>
                    <div id="taskblock">
                    <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>UPDATE TODO</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    <FormLabel> Todo Name</FormLabel>
                                    <Input ref={initialRef} placeholder='Task Name' name='name' onChange={(event) => setName(event.target.value)} />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Status</FormLabel>
                                    <Select placeholder='Select Status' onChange={(event) =>{event.preventDefault(); setDescription(event.target.value)}}>
                                        <option value='complete'>Complete</option>
                                        <option value='incomplete'>Incomplete</option>

                                    </Select>

                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button onClick={() => {
                                    handleUpdate()
                                    onClose()
                                }} colorScheme='blue' mr={3}>
                                    Save
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                        <li key={list._id} style={{ fontSize: '20px', textTransform:"capitalize"}}>{list.name}</li>
                        <label style={{ fontSize: '18px', textTransform: "capitalize" }} >
                        <input type="checkbox" checked={list.status === 'complete'} value="complete" />
                        {list.status}
                        </label><br></br>
                        <Button colorScheme="whatsapp" onClick={() => { setOperationId(list._id); onOpen()}}>UPDATE</Button>
                    <Button colorScheme="red" onClick={() => handleRemove(list._id)}>Remove</Button>
                    </div>
                </>
                ))}
            </ul> : null}
            <form onSubmit={handleSubmit}>
                <label>
                    Add New List
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
