import axios from 'axios';
import React, { useState, useContext }from 'react';
import AppContext from './appcontext';
import { TextField,  Button } from '@mui/material';
import styles from './submit-answer.module.css';

const SubmitAnswer = (props) => {

    const context = useContext(AppContext);

    if (context === null) {
        return;
    }

    const getHelperTextQuestion = (currentQuestion) => {
        
        let tempHelperTextQuestion = '';

        if (currentQuestion === '') {
            tempHelperTextQuestion = 'Please fill out this field!';
        }

        else if (currentQuestion.length < 7) {
            tempHelperTextQuestion = 'Please make question longer';
        }
    
        else if (currentQuestion.length > 20) {
            tempHelperTextQuestion = 'Please make question shorter';
        }

        return tempHelperTextQuestion;

    }

    const handleChangeQuestion = (currentQuestion) => {
        setQuestion(currentQuestion);

        setHelperTextQuestion(getHelperTextQuestion(currentQuestion));
        setIsValidQuestion(getIsValidQuestion(currentQuestion));
    }

    const getIsValidQuestion = (currentQuestion) => {
        return getHelperTextQuestion(currentQuestion).length === 0
    }

    const getHelperTextAnswer = (currentAnswer) => {
        
        let tempHelperTextAnswer = '';

        if (currentAnswer === '') {
            tempHelperTextAnswer = 'Please fill out this field!';
        }

        else if (currentAnswer.length < 7) {
            tempHelperTextAnswer = 'Please make answer longer';
        }
    
        else if (currentAnswer.length > 20) {
            tempHelperTextAnswer = 'Please make answer shorter';
        }

        return tempHelperTextAnswer;

    }

    const handleChangeAnswer = (currentAnswer) => {
        setAnswer(currentAnswer);

        setHelperTextAnswer(getHelperTextAnswer(currentAnswer));
        setIsValidAnswer(getIsValidAnswer(currentAnswer));
    }

    const getIsValidAnswer = (currentAnswer) => {
        return getHelperTextAnswer(currentAnswer).length === 0
    }

    const [question, setQuestion] = useState(props.ongoingQuery);
    const [helperTextQuestion, setHelperTextQuestion] = useState(getHelperTextQuestion(props.ongoingQuery));
    const [isValidQuestion, setIsValidQuestion] = useState(getIsValidQuestion(props.ongoingQuery));

    const [answer, setAnswer] = useState('');
    const [helperTextAnswer, setHelperTextAnswer] = useState(getHelperTextAnswer(''));
    const [isValidAnswer, setIsValidAnswer] = useState(getIsValidAnswer(''))

    const handleOnSubmit = () => {
        axios.post(window.origin + "/api/submit-answer", 
            {
                question: question,
                answer: answer

            }
        ).then((response) => {
                context.setUserMessage('Answer successfully submitted!');
                // this.props.onSubmitAnswer(true);
                
            }
        ).catch((error) => {
                context.setUserMessage('There was a problem in submitting your answer.')
            }
            ).finally(() => {
                context.setUserUpdate(false);
            }) 

    }

    const handleOnCancel = () => {
        context.setUserUpdate(false);
    }

    return (
        <div className = {styles.submitAnswer}>
            <TextField error = {!isValidQuestion} helperText = {helperTextQuestion} sx={{}} required label = "Your Question" value = {question} variant = "outlined" onChange = {(e) => handleChangeQuestion(e.target.value)}/>
            <TextField error = {!isValidAnswer} helperText = {helperTextAnswer} sx={{margin: "10px 0"}} required label = "Your Answer" value = {answer} variant = "outlined" onChange = {(e) => handleChangeAnswer(e.target.value)} />
            {/* <input type = "text" className = "submit-answer-input" value = {this.props.questionAsked} readOnly/>
            <input type = "text" className = "submit-answer-input" value = {this.state.questionAsked} onChange = {this.handleChange} required /> */}

            <div className={styles.submitAnswerButtonsContainer}>
                <Button disabled = {!isValidQuestion || !isValidAnswer} onClick = {handleOnSubmit} variant = "contained" color = "primary">Submit</Button>
                <Button onClick = {handleOnCancel} variant = "contained" color = "secondary">Cancel</Button>
            </div>
            {/* <button type = "button" onClick = {this.handleOnSubmit}>Submit</button> */}
        </div>
    )
}

export default SubmitAnswer;