const formatedData = question => {
    const result = question.map(item => {
        const questionObject = {
            question: item.question,
        };

        const answer = [ ...item.incorrect_answers];
        const correctAnswerIndex = Math.floor(Math.random() * 4);
        answer.splice(correctAnswerIndex, 0, item.correct_answer);
        questionObject.answer = answer;
        questionObject.correctAnswerIndex = correctAnswerIndex;

        return questionObject;
    });


    return result;
} 

export default formatedData;