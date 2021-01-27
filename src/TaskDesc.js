import React from 'react'
import PropTypes from 'prop-types'

const TaskDesc = (props) =>{
    return(
        <div className="game-window__task">
            <div className="game-window__task-title">Поле {props.numberField} </div>
            <div className="game-window__task-desc">Отметьте {props.taskDesc} чисел</div>
        </div>
    )
}

TaskDesc.propTypes ={
    numberField: PropTypes.string.isRequired,
    taskDesc:PropTypes.string.isRequired
}
export  default TaskDesc






