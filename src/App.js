import logo from './logo.svg';
import React,{ useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import Input from "./components/input"
import Todo from "./components/todo"

function App() {
    const baseUrl = "http://localhost:8081";

    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        getTodos();
    }, []);

    async function getTodos() {
        await axios
            .get(baseUrl + "/todo")
            .then((response) => {
                setTodos(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function register(e) {
        e.preventDefault();

        const insertTodo = async () => {
            await axios
                .post(baseUrl + "/todo", {
                    todoName: input
                })
                .then((response) => {
                    console.log(response);
                    setInput("");
                    getTodos();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        insertTodo();
        console.log("할 일이 추가됨.");
    }

    function modify(id) {
        console.log(id);
        const modifyTodo = async () => {
            await axios
                .put(baseUrl + "/todo/" + id, {})
                .then((response) => {
                    setTodos(
                        todos.map((todo) =>
                            todo.id === id ? { ...todo, completed: !todo.completed } : todo
                        )
                    )
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        modifyTodo();
        console.log("할 일이 수정됨.");
    }

    function remove(id) {
        console.log(id);
        const removeTodo = async () => {
            await axios
                .delete(baseUrl + "/todo/" + id, {})
                .then((response) => {
                    setTodos(
                       todos.filter((todo) => todo.id !== id)
                    )
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        removeTodo();
        console.log("할 일이 추가됨.");
    }

    function changeText(e) {
        e.preventDefault();
        setInput(e.target.value);
    }

    return (
    <div className="App">
        <h1>TODO LIST</h1>
        <Input handleSubmit={register} input={input} handleChange={changeText} />

        {
            todos ? todos.map((todo) => {
                return (
                    <Todo key={todo.id} todo={todo} handleClick={() => modify(todo.id)} handleDelete={() => remove(todo.id)} />
                )
            }) : null
        }

    </div>
    );
}

export default App;
