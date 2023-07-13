import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './Header.scss'
import HeaderBurger from './HeaderBurger'
import HeaderNav from './HeaderNav'

const Header = () => {
	const [openedMenu, setOpenedMenu] = useState(false)
	const burgerRef = useRef(null)
	const headerRef = useRef(null)
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

	useEffect(()=> {
		document.documentElement.style.setProperty('--header-height', headerRef.current.offsetHeight + 'px')
	})



	return (
		<>
			<header ref={headerRef} className="header">
				<div className="container">
					<div className="header-wrap">
						<Link className="header-logo" to="/">
							<div className="header-logo__corner header-logo__corner--left-top" />
							<div className="header-logo__corner header-logo__corner--right-top" />
							<div className="header-logo__corner header-logo__corner--right-bottom" />
							<div className="header-logo__corner header-logo__corner--left-bottom" />
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
