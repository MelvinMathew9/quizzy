import React from "react";

import { Check } from "neetoicons";
import { Modal, Typography, Button } from "neetoui";

import quizApi from "apis/quiz";

const DeleteModal = ({ setShowModal, quiz, refetch }) => {
  const handleDelete = async () => {
    try {
      await quizApi.destroy(quiz.slug);
      await refetch();
    } catch (error) {
      logger.error(error);
    } finally {
      setShowModal(false);
    }
  };
  return (
    <div className="w-full">
      <Modal isOpen={true} onClose={() => setShowModal(false)}>
        <Modal.Header>
          <Typography style="h2">Delete Quiz</Typography>
        </Modal.Header>
        <Modal.Body>
          <Typography style="body2" lineHeight="normal">
            Are you sure you want to delete the Quiz!
          </Typography>
        </Modal.Body>
        <Modal.Footer className="space-x-2">
          <Button
            icon={Check}
            label="Continue"
            onClick={handleDelete}
            size="large"
          />
          <Button
            style="text"
            label="Cancel"
            onClick={() => setShowModal(false)}
            size="large"
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteModal;
