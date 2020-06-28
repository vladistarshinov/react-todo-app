import React from 'react';
import axios from 'axios';
import classNames from 'classnames';

import Badge from '../Badge'

import removeImg from '../../assets/img/remove.svg';

import './List.scss';

const List = ({ items, isRemovable, click, onRemove, clickItem, activeList }) => {

    const removeList = item => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete('http://localhost:3001/lists/' + item.id)
                .then(() => {
                    onRemove(item.id);
                });
        }
    }

    return (
        <ul onClick={click} className="list">
            {
                items.map((item, index) => (
                    <li 
                        key={index} 
                        onClick={clickItem ? () => clickItem(item) : null}
                        className={classNames(item.className, { 
                            active: activeList && activeList.id === item.id 
                        })}
                    >
                        <i>{ item.icon ? item.icon : <Badge color={item.color.name} /> }</i>
                        <span>
                            {item.name} 
                            {item.tasks && ` (${item.tasks.length})`} 
                        </span>
                        {isRemovable && (
                            <img 
                                className="list__remove-icon" 
                                onClick={() => removeList(item)}
                                src={removeImg} 
                                alt="Закрыть" 
                            />
                        )}
                    </li>
                ))
            }
        </ul>
    );
};

export default List;