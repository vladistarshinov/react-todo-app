import React, { useState } from 'react';
import List from '../List';
import Badge from '../Badge';

import closeImg from '../../assets/img/close.svg';

import './AddList.scss';

const AddList = ({ colors, eAddList }) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(colors[0].id);
    const [inputValue, setInputValue] = useState('');
    
    const onClose = () => {
        setInputValue('');
        selectColor(colors[0].id);
        setVisiblePopup(false);
    };

    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка');
            return;
        }

        eAddList({ 
            id: Math.random(), 
            name: inputValue, 
            color: colors.filter(c => c.id === selectedColor)[0].name 
        });
        onClose();
    };

    return (
        <div className="add-list">
            <List 
                click={() => {setVisiblePopup(!visiblePopup)}}
                items={[
                    {
                        className: "list__add-btn",
                        icon: (
                            <svg 
                                width="12" 
                                height="12" 
                                viewBox="0 0 16 16" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    d="M8 1V15" 
                                    stroke="black" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                                <path 
                                    d="M1 8H15" 
                                    stroke="black" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        ),
                        name: 'Добавить список'
                    }
                ]}
            />
            {visiblePopup && (
                <div className="add-list__popup">
                    <img 
                        onClick={onClose}
                        src={closeImg} 
                        alt="Закрыть" 
                        className="add-list__popup-closeBtn"
                    />
                    <input 
                        className="field" 
                        value={inputValue} 
                        onChange={e => setInputValue(e.target.value)}
                        type="text" 
                        placeholder="Название списка"
                    />
                    <div className="add-list__popup-colors">
                       {
                           colors.map(color => (
                                <Badge 
                                    onClick={() => selectColor(color.id)}
                                    key={color.id} 
                                    color={color.name} 
                                    className={selectedColor === color.id && 'active'}
                                />
                           ))
                       }
                    </div>
                    <button onClick={addList} className="button">Добавить</button>
                </div>
            )}
        </div>
    );
};

export default AddList;