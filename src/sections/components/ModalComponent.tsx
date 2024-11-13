import React, { useEffect } from 'react';
import {Button, Form, Modal} from 'antd';
import FormComponent from "./FormComponent";
import { DataType } from "../TableSection";

interface ModalComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    dataSource: DataType[];
    setDataSource: (dataSource: DataType[]) => void;
    editingRecord: DataType | null;
    setEditingRecord: (editingRecord: DataType | null) => void;
    onConfirm: (updatedRecord: DataType) => void;
}

const ModalComponent = (props: ModalComponentProps) => {
    const { isModalOpen, setIsModalOpen, dataSource, setDataSource, editingRecord, setEditingRecord, onConfirm } = props;
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingRecord(null);
        form.resetFields();
    };

    const handleFormSubmit = (record: DataType) => {
        if (editingRecord) {
            onConfirm({ ...record, key: editingRecord.key });
        } else {
            setDataSource([...dataSource, { ...record, key: Date.now() }]);
        }
        handleCancel();
    };

    return (
        <div className="modalComponent__container">
            <Button type="primary" onClick={showModal}>
                Добавить
            </Button>
            <Modal
                className="modalComponent__container_modal"
                title={editingRecord && editingRecord.name ? "Редактирование записи" : "Добавление новой записи"}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <FormComponent
                    initialValues={editingRecord || { name: "", age: 0, key: Date.now() }}
                    form={form}
                    onSubmit={handleFormSubmit}
                    onClose={handleCancel}
                />
            </Modal>
        </div>
    );
};

export default ModalComponent;
