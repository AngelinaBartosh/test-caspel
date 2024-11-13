import React, { useEffect } from 'react';
import { Button, Form, FormInstance, Input, InputNumber } from 'antd';
import { DataType } from "../TableSection";
import { MyFormItem, MyFormItemGroup } from './FormItemGroup';

interface FormComponentProps {
    initialValues?: DataType;
    form: FormInstance;
    onSubmit: (record: DataType) => void;
    onClose: () => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ initialValues = { name: "", age: 0, key: Date.now() }, form, onSubmit, onClose }) => {

    useEffect(() => {
        form.setFieldsValue({
            user: {
                name: {
                    firstName: initialValues.name.split(" ")[0] || "",
                    lastName: initialValues.name.split(" ")[1] || "",
                    middleName: initialValues.name.split(" ")[2] || "",
                },
                age: initialValues.age,
            },
        });
    }, [initialValues, form]);

    const handleFinish = (values: any) => {
        const fullName = `${values.user.name.firstName} ${values.user.name.lastName} ${values.user.name.middleName}`;
        const newRecord: DataType = {
            key: initialValues.key,
            name: fullName,
            age: values.user.age,
        };

        onSubmit(newRecord);
        form.resetFields();
        onClose();
    };

    return (
        <div className="formComponent__container">
            <Form
                form={form}
                name="form_item_path"
                layout="vertical"
                onFinish={handleFinish}
            >
                <MyFormItemGroup prefix={['user']}>
                    <MyFormItemGroup prefix={['name']}>
                        <MyFormItem
                            name="firstName"
                            label="Фамилия"
                            rules={[
                                { required: true, message: 'Пожалуйста, введите фамилию' },
                                { pattern: /^[A-Za-zА-Яа-я]+$/, message: 'Допустимы только буквы' },
                            ]}
                        >
                            <Input />
                        </MyFormItem>
                        <MyFormItem
                            name="lastName"
                            label="Имя"
                            rules={[
                                { required: true, message: 'Пожалуйста, введите имя' },
                                { pattern: /^[A-Za-zА-Яа-я]+$/, message: 'Допустимы только буквы' },
                            ]}
                        >
                            <Input />
                        </MyFormItem>
                        <MyFormItem
                            name="middleName"
                            label="Отчество"
                            rules={[
                                { pattern: /^[A-Za-zА-Яа-я]+$/, message: 'Допустимы только буквы' },
                            ]}
                        >
                            <Input />
                        </MyFormItem>
                    </MyFormItemGroup>

                    <MyFormItem
                        name="age"
                        label="Возраст"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите возраст' },
                            () => ({
                                validator(_, value) {
                                    if (value === undefined || (value >= 1 && value <= 99)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Возраст должен быть от 1 до 99'));
                                },
                            }),
                        ]}
                    >
                        <InputNumber />
                    </MyFormItem>
                </MyFormItemGroup>

                <Button type="primary" htmlType="submit">
                    {initialValues ? "Сохранить" : "Добавить"}
                </Button>
            </Form>
        </div>
    );
};

export default FormComponent;
