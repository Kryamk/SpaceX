import { Button, Form, Input, Row, message } from 'antd';
import React, { useState } from 'react';
import { rules } from '../../utils/rules';



function FormCallback({ onCloseModal }) {
	const [form] = Form.useForm()
	const [messageApi, contextHolder] = message.useMessage();
	const [loading, setLoading] = useState(false)

	const success = () => {
		messageApi.open({
			type: 'success',
			content: 'Ваше сообщение успешно отправлено',
		});
	};

	const onFinish = async (values) => {


		try {
			setLoading(true)
			const formData = new FormData();
			formData.append('action', 'callback');
			for (const key in values) {

				if (values[key]) {
					formData.append(key, values[key]);
				}
			}

			// const res = await fetch('http://space-x.nya', { method: 'POST', body: formData })
			const res = await fetch('/feedback/send.php', { method: 'POST', body: formData })

			if (!res.ok) {
				console.log(res.status)
				throw new Error('Статус' + res.status);
			}
			const json = await res.json()
			// console.log('json:', json)
			form.setFields(json.fields)
			if (json.valid) {
				// console.log('success!!!!');

				setTimeout(() => {
					success();
					form.resetFields()
					setLoading(false)
				}, 1000);
				setTimeout(() => {
					onCloseModal()
				}, 1500);
			}
		} catch (error) {
			console.log(error)
			setLoading(false)
		}

	}


	return (
		<>
			{contextHolder}
			<Form onFinish={onFinish} layout="vertical" form={form}>
				<Form.Item label="Имя" name="name" rules={[rules.required(), rules.text()]}>
					<Input />
				</Form.Item>
				<Form.Item label="Фамилия" name="lastname" rules={[rules.required(), rules.text()]}>
					<Input />
				</Form.Item>
				<Form.Item label="Телефон или почта" name="telEmail" rules={[rules.required(), rules.telOrEmail()]}>
					<Input />
				</Form.Item>
				<Form.Item label="Сообщение" name="message" rules={[rules.required()]}>
					<Input.TextArea />
				</Form.Item>
				<Row justify="center">
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={loading}> Submit </Button>
					</Form.Item>
				</Row>
			</Form>
		</>
	)
}

export default FormCallback;
