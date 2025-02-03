import React, {  useState, useEffect, useRef } from "react";
import { motion } from 'framer-motion'
import styles from './Home.module.css'

import AddInterface from "../components/AddInterface/AddInterface";

import binIcon from '../assets/bin.svg';

function Home() {

    const [tasks, setTasks] = useState([{text: "Add your tasks", checked: false}]);
    const isFirstRender = useRef(true);
    const MAX_DRAG = 64
    const [swiped, setSwiped] = useState(tasks.map(() => 0));;

    const addTask = (task) => {
        setTasks(t => [...t, { text: task, checked: false }]);
    }

    const handleCheck = (targetIndex) => {
        setTasks((prevTasks) =>
            prevTasks.map((task, index) =>
              index === targetIndex ? { ...task, checked: !task.checked } : task
            )
          );
    };

    const handleDelete = (targetIndex) => {
        const newTasks = tasks.filter((task, index) => index !== targetIndex);
        const newSwiped = swiped.map((e, index) => (index === targetIndex ? 0 : e));
        setTasks(newTasks);
        setSwiped(newSwiped);
    };

    useEffect(() => {
        const data = localStorage.getItem("tasks");
        if(data) {
            setTasks(JSON.parse(data));
        }
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
                    <div key={index} className="styles.taskWrapper">
                        <div onClick={() => handleDelete(index)} className={styles.bin}>
                            <img src={binIcon} alt="bin" />
                        </div>
                        <motion.div 
                            className={styles.task}
                            drag="x"
                            dragConstraints={{left: 0, right: MAX_DRAG}}
                            dragElastic={0.2}
                            onDragEnd={(event, info) => {
                                const offset = info.offset.x;
                                setSwiped((prev) => {
                                    const newSwiped = [...prev];
                                    newSwiped[index] = offset >= MAX_DRAG / 2 ? MAX_DRAG : 0;
                                    return newSwiped;
                                })
                            }}
                            animate={{x: swiped[index]}}
                            transition={{type: "spring", stiffness: 300, damping: 30}}>
                            <input type="checkbox" checked={task.checked} onChange={() => handleCheck(index)} />
                            <span className={styles.radio}/>
                            <p className={task.checked ? styles.strikethrough : ''}>{task.text}</p>
                        </motion.div> 
                    </div>
                )}
            </div>


            <AddInterface addTask={addTask}/>
        </>
    )
}

export default Home;