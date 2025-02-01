import React, {  useState, useEffect, useRef } from "react";
import styles from './Home.module.css'

import AddInterface from "../components/AddInterface/AddInterface";

function Home() {

    const [tasks, setTasks] = useState([{text: "Add your tasks", checked: false}]);
    const isFirstRender = useRef(true);

    const addTask = (task) => {
        setTasks(t => [...t, { text: task, checked: false }]);
    }

    const handleCheck = (index) => {
        setTasks((prevTasks) =>
            prevTasks.map((task, i) =>
              i === index ? { ...task, checked: !task.checked } : task
            )
          );
    };

    useEffect(() => {
        const data = localStorage.getItem("tasks");
        console.log(data);
        if(data) {
            setTasks(JSON.parse(data));
        }
        console.log(data);
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return(
        <>
            <h1>To-Do List</h1>

            <div className={styles.tasks}>
                {tasks.map((task, index) => 
                    <div key={index} className={styles.task}>
                        <input type="checkbox" onChange={() => handleCheck(index)} />
                        <span className={styles.radio}/>
                        <p className={task.checked ? styles.strikethrough : ''}>{task.text}</p>
                    </div> 
                )}
            </div>


            <AddInterface addTask={addTask}/>
        </>
    )
}

export default Home;