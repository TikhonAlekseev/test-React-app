import React  from 'react'
import PropTypes from 'prop-types'

const FieldGame = (props) =>{

    const render = (count) => {
        const arrayOfNumbers = []

        for(let i = 1 ; i <= count; i++){
            if(props.answersTask.indexOf(i) !== -1 ){
                arrayOfNumbers.push(<div key={i} onClick={props.addNumber} className="game-field__item active">{i}</div>)
            }
            else{
                arrayOfNumbers.push(<div key={i} onClick={props.addNumber} className="game-field__item">{i}</div>)
            }
        }
        return arrayOfNumbers.map(item=> item)
    }

    return(
        <div id={props.id} className='game-field'>
            {render(props.items)}
        </div>
    )

}

FieldGame.propTypes = {
    addNumber:PropTypes.func,
    items:PropTypes.number.isRequired,
    id:PropTypes.number.isRequired,
    answersTask:PropTypes.array

}
export default FieldGame