import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, FormControl, FormLabel, Input, ModalHeader, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, useDisclosure, useToast, Heading } from '@chakra-ui/react';
import Cookies from 'universal-cookie';
import '../Style/Home.css'
import { Link } from 'react-router-dom';
import { context } from '../AuthContext/context';

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState('');
    const [operationId, setOpearationId] = useState("");
    const [description, setDescription] = useState('');
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const { store, setTodos, todos } = useContext(context)
    const cookies = new Cookies();
    const [loading, setLoading] = useState(true);

    const toast = useToast();
    const doEmpty = () => {
        setName("");
        setDescription("");
    }
    const updateLists = (_id) => {
        const arr = todos.map((el, i) => {
            if (el._id === _id) {
                todos[i] = { ...todos[i], description, name }
            }
        })
        setTodos([...todos])
        doEmpty();
    }
    const handleUpdate = async () => {
        const token = cookies.get('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };

        const data = {
            name,
            description
        };
        try {
            const response = await axios.put(`https://josh-talks-backend.vercel.app/todo/${operationId}`, data, { headers });
            updateLists(operationId);
        } catch (error) {
            console.log(error)
        }
    };
    const deleteLists = (listId) => {
        const array = todos.filter(el => el._id !== listId);
        setTodos([...array]);
    }
    const handleRemove = async (id) => {
        const token = cookies.get('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };
        try {
            const response = await axios.delete(`https://josh-talks-backend.vercel.app/todo/${id}`, { headers });
            console.log(response.data);
            deleteLists(id);
        } catch (error) {
            console.log(error)
        }
    }
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
                setTodos([...response.data])
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
            <Heading>Todo List</Heading><p>(user can only access own task)</p>
            <div >
                {todos && todos.length > 0 ? todos.map(todo => (
                    <>

                        <div className="todo-item" key={todo._id} style={{ backgroundColor: "hsl(212, 56%, 95%)" }}>
                            <h2>Todo Title : {todo.name}</h2>
                            <p>Todo Description : {todo.description}</p>
                            <p className="created-by">Created by: {todo.createdBy.username}</p>
                            {store._id === todo.createdBy._id ?
                                <div className='hover-button-home' >
                                    <div style={{ display: "flex", margin: "auto", justifyContent: "center", gap: "5px" }}>
                                        <Link to={`/tododetail/${todo._id}`}><Button colorScheme='messenger' >show detail</Button></Link>
                                        <Button colorScheme='whatsapp' onClick={() => {
                                            setOpearationId(todo._id);
                                            onOpen();
                                        }
                                        }>UPDATE</Button>
                                        <Button colorScheme="red" onClick={() => handleRemove(todo._id)}>REMOVE</Button>
                                    </div>
                                </div>
                                : null}
                        </div>
                    </>
                )) : <p>Loading..</p>}
            </div>
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
                            <Input ref={initialRef} placeholder='Todo Name' name='name' onChange={(event) => setName(event.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Input placeholder='Description' name='description' onChange={(event) => setDescription(event.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => {
                            handleUpdate();
                            onClose();
                        }
                        } colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Home;
