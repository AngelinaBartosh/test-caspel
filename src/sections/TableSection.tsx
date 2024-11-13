import React, { useEffect, useState } from 'react';
import './tableSection.scss';
import { Table, Button, Space } from 'antd';
import { ColumnsType } from "antd/es/table";
import ModalComponent from "./components/ModalComponent";
import { dataTest } from "../utils/MockData";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ModalConfirm from "./components/ModalConfirm";

export interface DataType {
    key: number;
    name: string;
    age: number;
}

const TableSection = () => {
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [deleteKey, setDeleteKey] = useState<number | null>(null);

    useEffect(() => {
        setDataSource(dataTest);
    }, []);

    const uniqueNames = Array.from(new Set(dataSource.map((item) => item.name))).map((name) => ({
        text: name,
        value: name,
    }));

    const ageRanges = [
        { text: 'Младше 18', value: 'under18' },
        { text: '18-25', value: '18-25' },
        { text: '26-35', value: '26-35' },
        { text: '36-45', value: '36-45' },
        { text: 'Старше 45', value: 'above45' },
    ];

    const uniqueLastNames = Array.from(new Set(dataSource.map((item) => item.name.split(" ")[0]))).map((lastName) => ({
        text: lastName,
        value: lastName,
    }));

    const columns: ColumnsType<DataType> = [
        {
            title: 'ФИО',
            dataIndex: 'name',
            key: 'name',
            width: '50%',
            sorter: (a, b) => a.name.localeCompare(b.name),
            filters: uniqueLastNames,
            onFilter: (value, record) => record.name.split(" ")[0] === value,
        },
        {
            title: 'Возраст',
            dataIndex: 'age',
            key: 'age',
            width: '30%',
            sorter: (a, b) => a.age - b.age,
            filters: ageRanges,
            onFilter: (value, record) => {
                switch (value) {
                    case 'under18':
                        return record.age < 18;
                    case '18-25':
                        return record.age >= 18 && record.age <= 25;
                    case '26-35':
                        return record.age >= 26 && record.age <= 35;
                    case '36-45':
                        return record.age >= 36 && record.age <= 45;
                    case 'above45':
                        return record.age > 45;
                    default:
                        return true;
                }
            },
        },
        {
            title: 'Действия',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(record)}>
                        <EditOutlined />
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => handleDelete(record.key)}
                    >
                        <DeleteOutlined />
                    </Button>
                </Space>
            ),
            width: '20%',
        },
    ];

    const handleEdit = (record: DataType) => {
        setEditingRecord(record);
        setIsModalOpen(true);
    };

    const handleDelete = (key: number) => {
        setDeleteKey(key);
        setIsConfirmVisible(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteKey !== null) {
            setDataSource(dataSource.filter((item) => item.key !== deleteKey));
        }
        setIsConfirmVisible(false);
    };

    const handleDeleteCancel = () => {
        setIsConfirmVisible(false);
    };

    const handleConfirmEdit = (updatedRecord: DataType) => {
        setDataSource(dataSource.map(item => item.key === updatedRecord.key ? updatedRecord : item));
        setEditingRecord(null);
        setIsModalOpen(false);
    };

    return (
        <div className="table__section">
            <header>
                <h1>Test Caspel</h1>
            </header>
            <div className="table__section_container">
                <ModalComponent
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    dataSource={dataSource}
                    setDataSource={setDataSource}
                    editingRecord={editingRecord}
                    setEditingRecord={setEditingRecord}
                    onConfirm={handleConfirmEdit}
                />
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    rowKey="key"
                    locale={{
                        filterTitle: 'Фильтр',
                        filterConfirm: 'ОК',
                        filterReset: 'Сброс',
                        emptyText: 'Нет данных',
                        selectAll: 'Выбрать все',
                        selectNone: 'Снять выбор',
                        selectInvert: 'Инвертировать выбор',
                        sortTitle: 'Сортировка',
                        expand: 'Развернуть',
                        collapse: 'Свернуть',
                        triggerDesc: 'По убыванию',
                        triggerAsc: 'По возрастанию',
                        cancelSort: 'Отменить сортировку',
                    }}
                />
                <ModalConfirm
                    visible={isConfirmVisible}
                    onOk={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                    title="Вы уверены, что хотите удалить эту запись?"
                    content="Это действие нельзя будет отменить."
                    okText="Удалить"
                    cancelText="Отмена"
                />
            </div>
            <footer>
                <p>Test Caspel 2024</p>
            </footer>
        </div>
    );
};

export default TableSection;
