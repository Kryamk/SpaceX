import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import MainPage from './pages/MainPage/MainPage';
import SimplePage from './pages/SimplePage/SimplePage';


const pages = [
	{ url: 'tehnologiya', title: 'Технология' },
	{ url: 'grafik-poletov', title: 'График полетов' },
	{ url: 'garantii', title: 'Гарантии' },
	{ url: 'o-kompanii', title: 'О компании' },
	{ url: 'kontakty', title: 'Контакты' },
]



function App() {
	const location = useLocation();
	const {pathname} = location

	useEffect(()=> {
		if (pathname === '/') {
			document.body.classList.add('home')
		} else {
			document.body.classList.remove('home')
		}
	}, [pathname])


	return (
		<div className="App">
			<Header />

			<main>
				<Routes>
					<Route path='/' element={<MainPage />}> </Route>
					{pages.map(page => (
						<Route key={page.url} path={page.url} element={<SimplePage title={page.title} />} />
					))}
				</Routes>
			</main>

		</div>
	);
}

export default App;
