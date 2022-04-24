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

    const [answerToQuestion, setAnswerToQuestion] = useState('');
    const [submissionResponse, setSubmissionResponse] = useState(null);
    const [helperTextQuestion, setHelperTextQuestion] = useState('');
    const [validationStatusQuestion, setValidationStatusQuestion] = useState(false);
    const [helperTextAnswer, setHelperTextAnswer] = useState('');
    const [validationStatusAnswer, setValidationStatusAnswer] = useState(false);
    const [overallValidation, setOverallValidation] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [questionAsked, setQuestionAsked] = useState(props.ongoingQuery);


    const handleChangeQuestion = (event) => {
        let tempQuestion = event.target.value;
        let tempHelperTextQuestion = '';
        let tempValidationStatusQuestion = false;

        if (tempQuestion === '') {
            tempHelperTextQuestion = 'Please fill out this field!';
        }

        else if (tempQuestion.length < 7) {
            tempHelperTextQuestion = 'Please make question longer';
        }
    
        else if (tempQuestion.length > 20) {
            tempHelperTextQuestion = 'Please make question shorter';
        }
        else {
            tempValidationStatusQuestion = true;
        }

        setQuestionAsked(tempQuestion);
        setHelperTextQuestion(tempHelperTextQuestion);
        setValidationStatusQuestion(tempValidationStatusQuestion);
        setOverallValidation(tempValidationStatusQuestion && validationStatusAnswer)

    }

    const handleChangeAnswer = (event) => {
        let tempAnswer = event.target.value;
        let tempHelperTextAnswer = '';
        let tempValidationStatusAnswer = false;

        if (tempAnswer === '') {
            tempHelperTextAnswer = 'Please fill out this field!';
        }
    
        else if (tempAnswer.length < 7) {
            tempHelperTextAnswer = 'Please make answer longer';
        }
    
        else if (tempAnswer.length > 20) {
            tempHelperTextAnswer = 'Please make answer shorter';
        }
        else {
            tempValidationStatusAnswer = true;
        }
    
        setAnswerToQuestion(tempAnswer);
        setHelperTextAnswer(tempHelperTextAnswer);
        setValidationStatusAnswer(tempValidationStatusAnswer);
        setOverallValidation(tempValidationStatusAnswer && validationStatusQuestion);

    }

    const handleOnSubmit = () => {
        axios.post(window.origin + "/api/submit-answer", 
            {
                question: questionAsked,
                answer: answerToQuestion

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
            <TextField error = {!validationStatusQuestion} helperText = {helperTextQuestion} sx={{}} required label = "Your Question" defaultValue = {questionAsked} value = {questionAsked} variant = "outlined" onChange = {handleChangeQuestion}/>
            <TextField error = {!validationStatusAnswer} helperText = {helperTextAnswer} sx={{margin: "10px 0"}} required label = "Your Answer" defaultValue="" value = {answerToQuestion} variant = "outlined" onChange = {handleChangeAnswer} />
            {/* <input type = "text" className = "submit-answer-input" value = {this.props.questionAsked} readOnly/>
            <input type = "text" className = "submit-answer-input" value = {this.state.questionAsked} onChange = {this.handleChange} required /> */}

            <div className={styles.submitAnswerButtonsContainer}>
                <Button disabled = {!overallValidation} onClick = {handleOnSubmit} variant = "contained" color = "primary">Submit</Button>
                <Button onClick = {handleOnCancel} variant = "contained" color = "secondary">Cancel</Button>
            </div>
            {/* <button type = "button" onClick = {this.handleOnSubmit}>Submit</button> */}
        </div>
    )
}

export default SubmitAnswer;