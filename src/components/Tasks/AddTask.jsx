import React, { useState } from 'react';
import axios from 'axios';

import addImg from '../../assets/img/add.svg';

import './Tasks.scss';

export default function AddTask({ list, onAddTask }) {
    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    };

    const addNewTask = () => {
        const obj = {
           // id: data.id,
            "listId": list.id,
            "text": inputValue,
            "completed": false
        };
        setIsSending(true);
        axios.post('http://localhost:3001/tasks', obj)
            .then(({ data }) => {
                onAddTask(list.id, data);
                toggleFormVisible();
            })
            .catch(() => {
                alert('Ошибка при добавлении задачи!');
            })
            .finally(() => {
                setIsSending(false);
            });
    };

    return (
        <div className="tasks__form">
            {!visibleForm ? (
                <div onClick={toggleFormVisible} className="tasks__form-add">
                  <img src={addImg} alt="Добавить" />
                  <span>Новая задача</span>
              </div>
            ) : (
                <div className="tasks__form-block">
                    <input 
                        className="field" 
                        type="text" 
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="Название задачи"
                    />
                    <button className="button" onClick={addNewTask} disabled={isSending}>
                        {isSending ? 'Добавление...' : 'Добавить задачу'}
                    </button>
                    <button onClick={toggleFormVisible} className="button button--grey">Отмена</button>
            </div>
            )}
        </div>
    );
}
