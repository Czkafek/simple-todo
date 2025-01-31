import React, {  useState } from "react";
import styles from './Home.module.css'

import AddInterface from "../components/AddInterface/AddInterface";

function Home() {

    const [tasks, setTasks] = useState(["Add your tasks"]);

    const addTask = (task) => {
        setTasks(t => [...t, task]);
    }

    return(
        <>
            <h1>To-Do List</h1>

            <div className={styles.tasks}>
                {tasks.map((value, index) => 
                    <div key={index} className={styles.task}>
                        <input type="checkbox" />
                        <span className={styles.radio}/>
                        <p>{value}</p>
                    </div> 
                )}
            </div>


            <AddInterface addTask={addTask}/>
        </>
    )
}

export default Home;