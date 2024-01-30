const formatedData = question => {
    const result = question.map(item => {
        const questionObject = {
            question: item.question,
        };

        const answer = [ ...item.incorrect_answers];
        const correctAnswerIndex = Math.round(Math.random() * 4);
        answer.splice(correctAnswerIndex, 0, item.correct_answer);

        questionObject.answer = answer;
        questionObject.correctAnswerIndex = correctAnswerIndex;

        return questionObject;
    });

    console.log(result);

    return result;
} 

export default formatedData;