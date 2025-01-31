import React, { useState } from "react";
import styles from './AddInterface.module.css'

function AddInterface({ addTask }) {

    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputValue.trim() === "") return;
        addTask(inputValue);
        setInputValue("");
    }
    

    return(
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input id="taskInput" value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Read, make dinner..."/>
                <button type="submit">Add task</button>
            </form>
        </>
    );
}

export default AddInterface;