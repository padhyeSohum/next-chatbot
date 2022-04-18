import axios from 'axios';
import React, { useState, useContext }from 'react';
import AppContext from './appcontext';
import { TextField,  Button } from '@mui/material';

const SubmitAnswer = () => {

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
    const [questionAsked, setQuestionAsked] = useState(context.state.chatQuery);


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
        setOverallValidation()

        return tempValidationStatusQuestion;
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
        setOverallValidation(true); // TODO

        return tempValidationStatusAnswer;
    }

    const checkValidation = () => {
        let tempOverallValidation = false;

        if (this.handleChangeQuestion() === true && this.handleChangeAnswer() === true) {
            tempOverallValidation = true;
        }
        setOverallValidation(tempOverallValidation);
    }

    const handleOnSubmit = () => {
        axios.post(window.origin + "/api/submit-answer", 
            {
                question: questionAsked,
                answer: answerToQuestion

            }).then((response) => {
                setSubmissionResponse(response.data);
                setIsSuccess(true);

                // this.props.onSubmitAnswer(true);
                
            }
        ).catch((error) => {
            setIsSuccess(false);
            this.props.onSubmitAnswer(false);
        })

    }

    return (
        <div className = "submit-answer">
            <TextField error = {!validationStatusQuestion} helperText = {helperTextQuestion} required label = "Your Question" defaultValue = {questionAsked} value = {questionAsked} variant = "outlined" onChange = {handleChangeQuestion}/>
            <TextField error = {!validationStatusAnswer} helperText = {helperTextAnswer} required label = "Your Answer" defaultValue="" value = {answerToQuestion} variant = "outlined" onChange = {handleChangeAnswer} />
            {/* <input type = "text" className = "submit-answer-input" value = {this.props.questionAsked} readOnly/>
            <input type = "text" className = "submit-answer-input" value = {this.state.questionAsked} onChange = {this.handleChange} required /> */}

            <Button disabled = {!overallValidation} onClick = {handleOnSubmit} variant = "contained" color = "primary">Submit</Button>
            {/* <button type = "button" onClick = {this.handleOnSubmit}>Submit</button> */}
        </div>
    )
}

export default SubmitAnswer;