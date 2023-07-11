import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './Header.scss'
import HeaderBurger from './HeaderBurger'
import HeaderNav from './HeaderNav'

const Header = () => {
	const [openedMenu, setOpenedMenu] = useState(false)
	const burgerRef = useRef(null)
	let location = useLocation()
	console.log('Header ~ location:', location)

	const handleOpenedMenu = () => {
		setOpenedMenu(!openedMenu)
		document.body.classList.toggle('lock')
	}

	const onCloseMenu = () => {
		if (openedMenu) {
			setOpenedMenu(false);
		}
		document.body.classList.remove('lock')
	}



	return (
		<>
			<header className="header">
				<div className="container">
					<div className="header-wrap">
						<Link className="header-logo" to="/">
							<div className="header-logo__corner" />
							<div className="header-logo__corner" />
							<div className="header-logo__corner" />
							<div className="header-logo__corner" />
							<img className="header-logo__img" src={logo} alt="Логотип" />
						</Link>
						<HeaderNav openedMenu={openedMenu} onCloseMenu={onCloseMenu} burgerRef={burgerRef} />
						<HeaderBurger burgerRef={burgerRef} openedMenu={openedMenu} handleOpenedMenu={handleOpenedMenu} />
					</div>
				</div>
			</header>
		</>
	)
}

export default Header
