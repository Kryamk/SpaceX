import React from 'react'

function HeaderBurger({ openedMenu, handleOpenedMenu, burgerRef }) {

	return (
		<button ref={burgerRef} className={`header-toggle-menu ${openedMenu ? 'burger--opened' : 'burger--closed'}`} onClick={handleOpenedMenu}>
			<span className="burger">
				<span className="burger__line" />
				<span className="burger__line burger__line--cross" />
				<span className="burger__line burger__line--cross" />
				<span className="burger__line" />
			</span>
		</button>
	)
}

export default HeaderBurger
