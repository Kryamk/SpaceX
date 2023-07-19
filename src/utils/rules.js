export const rules = {
	required: (message = 'Обязательное поле') => ({ required: true, message }),
	telOrEmail: (message = 'Некорректый телефон или почта') => ({
		validator(_, value) {
			if (value === '' || value === undefined) {
				return Promise.resolve();
			}
			// const telPattern = /[\d+()-\s]{3,15}/;
			const telPattern = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
			const emailPattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/


			if (telPattern.test(value)) {
				return Promise.resolve();
			}
			else if (emailPattern.test(value)) {
				return Promise.resolve();
			}
			else {
				return Promise.reject(new Error(message));
			}
		},
	})
}
