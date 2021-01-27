import React, {useState} from 'react'
import FieldGame from "./FieldGame";
import TaskDesc from "./TaskDesc";
import icon from  './img/magic-wand.png'

function App() {

    const [arrayNumbersFirstTask, setFirstTask] =useState([])
    const [arrayNumbersSecondTask, setSecondTask] =useState([])

    //Подумать над названием set
    const [answersTask1 , setAnswersTask1] = useState([])
    const [answersTask2 , setAnswersTask2] = useState([])
    const [result , setResult] = useState("Ничего не выбрано.Пройдите все задания")

    const itemsFirstField = 19
    const itemsSecondField = 2


    const randomFunc = (arr,sizeArr) => {
        for(let i = 1 ; i <= sizeArr; i++ ){
            arr.push(i)
        }
        for(let k = arr.length - 1  ; k > 0 ; k--){
            let randomNum = Math.floor(Math.random() * (k + 1) )
            let randomItem = arr[randomNum]
            arr[randomNum] = arr[k]
            arr[k] = randomItem
        }
        if(arr.length == 19){
            arr.splice(0,11)
        }else{
            arr.splice(0,1)
        }


    }

    const getNumbersWinArray=()=> {
        const winArrFirstTask = []
        const winArrSecondTask = []

        randomFunc(winArrFirstTask,itemsFirstField)
        randomFunc(winArrSecondTask,itemsSecondField)

        setFirstTask([...arrayNumbersFirstTask,...winArrFirstTask])
        setSecondTask([...arrayNumbersSecondTask, ...winArrSecondTask])
    }

    const removeNumber = (answersArr , currentNum) =>{
        let resultArr

        if(answersArr === answersTask1){
            resultArr = answersArr.filter(item => item !== currentNum)
            setAnswersTask1([
                ...resultArr
            ])
        }else{
            resultArr = answersArr.filter(item => item !== currentNum)
            setAnswersTask2([
                ...resultArr
            ])
        }


    }

    const addNumber = (e) =>{

        const currentItem = parseInt(e.target.innerHTML)

        if(answersTask1.indexOf(currentItem) === -1 && e.target.closest('.game-field').id == 1 ){
            if( answersTask1.length < 8){
                setAnswersTask1([
                    ...answersTask1,
                    currentItem
                ])
            }
            else {alert('Достигнут лимит ответов в этом задании')}
        }
        else if (answersTask2.indexOf(currentItem) === -1 && e.target.closest('.game-field').id == 2) {
            if( answersTask2.length < 1){
                setAnswersTask2([
                    ...answersTask2,
                    currentItem
                ])
            }else {
                alert('Достигнут лимит ответов в этом задании')
            }
        }

        else if (answersTask1.indexOf(currentItem) !== -1){
            removeNumber(answersTask1,currentItem)
        }
        else if (answersTask2.indexOf(currentItem) !== -1){
            removeNumber(answersTask2,currentItem)
        }

    }
    const filterFunc = (arr1,arr2) => {
        //Исправить название переменной
        const filterResults =  arr1.filter(item => {
             for(let i = 0 ; i < arr2.length; i++){
                 if(item===arr2[i]) return arr2[i]
            }
        })

        return filterResults
    }

    const showResults = async (arrWinNumbersFirstTask,yourAnswers1,arrWinNumbersSecondTask,yourAnswers2) =>{
        getNumbersWinArray()

        const firstFieldResult = filterFunc(arrWinNumbersFirstTask,yourAnswers1)

        const secondFieldResult = filterFunc(arrWinNumbersSecondTask,yourAnswers2)

        if(firstFieldResult.length >= 3 && secondFieldResult.length > 0 ){

            await setResult( "Ого вы выиграли .Поздравляем!")

        }else if(answersTask1.length !== 0 && answersTask1.length !== 0){
            await setResult("К сожалению , вы проиграли")
        }
    }

    return (
    <div className="App">
        <div className="base-window game-window">
            <div className="game-window__desc-card">
                <div className="game-window__title">Билет 1</div>
                <div className="game-window__icon">
                    <a href="#" className="game-window__link">
                        <img src={icon} alt="Иконка" className="game-window__img"/>
                    </a>
                </div>
            </div>
            <TaskDesc  numberField={'1'} taskDesc={'8'}/>
            <FieldGame id={1} addNumber={addNumber} items={itemsFirstField} answersTask={answersTask1}/>
            <TaskDesc  numberField={'2'} taskDesc={'1'}/>
            <FieldGame id={2} addNumber={addNumber} items={itemsSecondField} answersTask={answersTask2}/>
            <button onClick={()=> showResults(arrayNumbersFirstTask,answersTask1,answersTask2,arrayNumbersSecondTask)} className="game-window__button">Показать результаты</button>

        </div>
        <div className="base-window result-window">
            <div className="result-window__text">{result}</div>
        </div>
    </div>
  );
}

export default App;
