import React from 'react';
import { Modal } from 'antd';

interface ModalConfirmProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    title: string;
    content: string;
    okText: string;
    cancelText: string;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
   visible,
   onOk,
   onCancel,
   title,
   content,
   okText,
   cancelText,
}) => {
    return (
        <Modal
            visible={visible}
            title={title}
            onOk={onOk}
            onCancel={onCancel}
            okText={okText}
            cancelText={cancelText}
            okType="danger"
            closable={false}
        >
            <p>{content}</p>
        </Modal>
    );
};

export default ModalConfirm;
