import {
    FormControl,
    FormLabel,
    Input,
    Box,
    InputRightAddon,
    InputGroup,
    Heading,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/login.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const SignupPage = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
    });
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(
                "https://josh-talks-backend.vercel.app/signup",
                input
            );
            console.log(res.status);
            if (res.status === 201) {
                toast({
                    title: 'signup Sucessfully.',
                    description: "Welcome!!",
                    status: 'success',
                    duration: 2500,
                    isClosable: true,
                    onCloseComplete: () => {
                        navigate('/');
                    }
                })
            }
            else if (res.status === 400) {
                toast({
                    title: "User Already Registered",
                    description: "",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            }
        } catch (e) {
            toast({
                title: "Something went wrong",
                description: "",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            console.log(e);
        }
    };
    return (
        <div>  <>
            <Box
                w="100vw"
                h="100vh"
                backgroundImage="linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)"
                backgroundSize="cover"
                backgroundPosition="center"
                alignItems="center"
                justifyContent="center"
                display="flex"
            >
                <form
                    onSubmit={handleSubmit}
                    style={{
                        backgroundColor: "#FFF",
                        padding: "20px",
                        width: "50%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                >
                    <Heading
                        as="h1"
                        size={["md", "xl"]}
                        color="teal"
                        fontSize="4xl"
                        fontWeight="medium"
                    >
                        WELCOME
                    </Heading>
                    <FormControl>
                        <FormLabel htmlFor="String">Username</FormLabel>
                        <Input
                            type="String"
                            id="email"
                            name="username"
                            border="1px solid black"
                            bg="white"
                            ref={inputRef}
                            onChange={handleChange}
                            placeholder="Enter your user name"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="String">Email</FormLabel>
                        <Input
                            type="String"
                            id="email"
                            name="email"
                            border="1px solid black"
                            bg="white"
                            ref={inputRef}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                bg="white"
                                // ref={inputRef}
                                border="1px solid black"
                                placeholder="Enter your password"
                                onChange={handleChange}
                            />
                            <InputRightAddon
                                onClick={() => setShowPassword(!showPassword)}
                                cursor="pointer"
                            >
                                <FontAwesomeIcon
                                    icon={showPassword ? faEye : faEyeSlash}
                                    cursor="pointer"
                                    border="1px solid black"
                                    onClick={() => setShowPassword(!showPassword)}
                                    size="lg"
                                />
                            </InputRightAddon>
                        </InputGroup>
                    </FormControl>

                    <button className="stylish-button" type="submit">
                        signup
                    </button>
                    <Link to='/'><button class="already-button">
                        Already have a account
                    </button></Link>
                </form>
            </Box>
        </>
        </div>
    );
};

export default SignupPage;
