import { Button, Form, Input, Row } from 'antd'
import React from 'react'
import { rules } from '../../utils/rules';



function FormCallback({ onCloseModal }) {
	const [form] = Form.useForm()

	const onFinish = async (values) => {

		try {
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
			console.log('json:', json)
			form.setFields(json.fields)
			if (json.valid) {
				console.log('success!!!!');
				alert('Форма успешно отправлена')
				form.resetFields()
				onCloseModal()
			}
		} catch (error) {
			console.log(error)
		}
	}


	return (
		<Form onFinish={onFinish} layout="vertical" form={form}>
			<Form.Item label="Имя" name="name" rules={[rules.required()]}>
				<Input />
			</Form.Item>
			<Form.Item label="Фамилия" name="lastname" rules={[rules.required()]}>
				<Input />
			</Form.Item>
			<Form.Item label="Телефон или почта" name="telEmail" rules={[rules.required()]}>
				<Input />
			</Form.Item>
			<Form.Item label="Сообщение" name="message" rules={[rules.required()]}>
				<Input.TextArea />
			</Form.Item>
			<Row justify="center">
				<Form.Item>
					<Button type="primary" htmlType="submit"> Submit </Button>
				</Form.Item>
			</Row>
		</Form>
	)
}

export default FormCallback;
