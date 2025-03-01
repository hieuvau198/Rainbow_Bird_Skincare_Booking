import { List, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import getAnsByQuesId from "../../../../../modules/Quizzs/getAnsByQuesId";

const AnswerRender = ({ questionId }) => {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!questionId) return;
        setLoading(true);
        getAnsByQuesId(questionId)
            .then((data) => {
                setAnswers(data);
            })
            .catch((error) => {
                console.error(`Error fetching answers for question ${questionId}:`, error);
                message.error("Error fetching answers!");
            })
            .finally(() => setLoading(false));
    }, [questionId]);

    if (loading) return <Spin size="small" />;

    return (
        <>
            <h1 className="font-bold py-2">Answers:</h1>
            <List
                bordered
                dataSource={answers}
                renderItem={(answer, index) => (
                    <List.Item>
                        <span>
                            {index + 1}. {answer.content} (Points: {answer.points})
                        </span>
                    </List.Item>
                )}
            />
        </>
    );
};

export default AnswerRender;
