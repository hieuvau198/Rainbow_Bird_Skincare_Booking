import React, { useEffect, useState } from "react";
import { Button, Modal, message, Form } from "antd";
import Loading from "../../../../components/Loading"; // Assume Loading is a shared component
import QuizRenderDetails from "./QuizDetailsPartials/QuizRenderDetails";
import QuizRenderEditForm from "./QuizDetailsPartials/QuizRenderEditForm";

const QuizDetail = ({ visible, onClose, quiz, onQuizUpdate }) => {
  const [localQuiz, setLocalQuiz] = useState(quiz);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setLocalQuiz(quiz);
  }, [quiz]);

  useEffect(() => {
    if (localQuiz && visible && isEdit) {
      form.resetFields();
      form.setFieldsValue({
        quizName: localQuiz.quizName,
        duration: localQuiz.duration,
        status: localQuiz.status,
      });
    }
  }, [localQuiz, visible, isEdit, form]);

  const handleSaveEdit = async () => {
    try {
      const updatedValues = await form.validateFields();
      const updatedQuiz = { ...localQuiz, ...updatedValues };
      onQuizUpdate(updatedQuiz);
      setIsEdit(false);
      message.success("Quiz updated successfully!");
    } catch (error) {
      message.error("Failed to update quiz. Please check the form.");
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={() => {
        setIsEdit(false);
        onClose();
      }}
      footer={
        isEdit
          ? [
              <Button key="cancel" danger onClick={() => setIsEdit(false)}>
                Cancel
              </Button>,
              <Button key="save" type="primary" onClick={handleSaveEdit}>
                Save
              </Button>,
            ]
          : null
      }
      width={800}
      title={
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">Quiz Details</span>
          {!isEdit && (
            <Button type="link" onClick={() => setIsEdit(true)}>
              Edit
            </Button>
          )}
        </div>
      }
    >
      {localQuiz ? (
        isEdit ? (
          <QuizRenderEditForm form={form} initialValues={localQuiz} />
        ) : (
          <QuizRenderDetails quiz={localQuiz} />
        )
      ) : (
        <Loading />
      )}
    </Modal>
  );
};

export default QuizDetail;
