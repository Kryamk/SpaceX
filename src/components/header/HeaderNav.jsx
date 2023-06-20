import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useOutsideClickMenu } from '../../hooks/useOutsideClickMenu'

function HeaderNav({ openedMenu, onCloseMenu, burgerRef }) {
	const navRef = useRef(null)
	useOutsideClickMenu(navRef, burgerRef, onCloseMenu, openedMenu )
	const pathname = useLocation()

	useEffect(()=> {
		onCloseMenu()
	}, [pathname])

	return (
		<nav ref={navRef} className={`header-menu ${openedMenu ? 'open' : 'false'} `}>
			<ul>
				<li><Link to='/'>Главная</Link></li>
				<li><Link to="/tehnologiya">Технология</Link></li>
				<li><Link to="/grafik-poletov">График полетов</Link></li>
				<li><Link to="/garantii">Гарантии</Link></li>
				<li><Link to="/o-kompanii">О компании</Link></li>
				<li><Link to="/kontakty">Контакты</Link></li>
			</ul>
		</nav>
	)
}

export default HeaderNav
