import { Button, Form, Input, Row } from 'antd'
import React from 'react'
import { rules } from '../../utils/rules';



function FormCallback({ onCloseModal }) {
	const [form] = Form.useForm()
	console.dir(form)

	const onFinish = async (values) => {

		console.log('Success:', values);

		form.setFields([
			{
				name: 'name',
				errors: [],
			},
		]);




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
			}
			const json = await res.json()
			console.log('onFinish ~ json:', json)

			if (!json.valid) {
				form.setFields(json.fields)
			} else {
				form.resetFields()
				// onCloseModal()
			}

		} catch (error) {
			console.log(error)
		}


	}



	return (
		<Form onFinish={onFinish} layout="vertical" form={form}>
			<Form.Item label="Имя" name="name" rules1={[rules.required()]}>
				<Input />
			</Form.Item>
			<Form.Item label="Фамилия" name="lastname" rules1={[rules.required()]}>
				<Input />
			</Form.Item>
			<Form.Item label="Телефон или почта" name="telEmail" rules1={[rules.required()]}>
				<Input />
			</Form.Item>
			<Form.Item label="Сообщение" name="message" rules1={[rules.required()]}>
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
