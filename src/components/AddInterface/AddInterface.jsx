import React, { useEffect, useState } from "react";
import styles from './AddInterface.module.css'

function AddInterface({ addTask }) {

    const [inputValue, setInputValue] = useState("");
    const [change, setChange] = useState(window.innerHeight > 900 ? true : false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;
        addTask(inputValue);
        setInputValue("");
    }

    const handleInputChange = (e) => setInputValue(e.target.value);

    useEffect(() => {
        const updateWindowDimensions = () => {
            setChange(window.innerHeight > 900);
        };

        window.addEventListener("resize", updateWindowDimensions);

        return () => window.removeEventListener("resize", updateWindowDimensions);

    }, []);


    return(
        <>
            <form onSubmit={handleSubmit} className={change ? styles.limitHeight : ''}>
                <input id="taskInput" value={inputValue} onChange={handleInputChange} type="text" placeholder="Read, make dinner..."/>
                <button type="submit">Add task</button>
            </form>
        </>
    );
}

export default AddInterface;