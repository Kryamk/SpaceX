import React from 'react'
import './MainPage.scss'

const MainPage = () => {
	return (
		<>
			<section className="hero">
				<div className="container-hero">
					<div className="hero-wrap">
						<div className="hero-item hero-item-title">
							<h1 className="hero-title">
								<span>Путешествие</span>
								<span>на красную планету</span>
							</h1>
						</div>
						<div className="hero-item hero-item-advantages">
							<div className="hero-advantages">
								<div className="hero-advantages-item hero-advantages-item--left-top">
									<span className="hero-advantages-item__text">Мы</span>
									<span className="hero-advantages-item__num">1</span>
									<span className="hero-advantages-item__text">на рынке</span>
								</div>
								<div className="hero-advantages-item hero-advantages-item--right-top">
									<span className="hero-advantages-item__text">Гарантируем</span>
									<span className="hero-advantages-item__num">50%</span>
									<span className="hero-advantages-item__text">безопасность</span>
								</div>
								<div className="hero-advantages-item hero-advantages-item--right-bottom">
									<span className="hero-advantages-item__text">Календарик за</span>
									<span className="hero-advantages-item__num">2001<span>г.</span></span>
									<span className="hero-advantages-item__text">в подарок</span>
								</div>
								<div className="hero-advantages-item hero-advantages-item--left-bottom">
									<span className="hero-advantages-item__text">Путешествие</span>
									<span className="hero-advantages-item__num">597</span>
									<span className="hero-advantages-item__text">дней</span>
								</div>
							</div>
						</div>
						<div className="hero-item hero-item-btn">
							<div className="hero-btn-wrap">
								<button className="hero-btn" >
									<div className="hero-btn__corner1" />
									<div className="hero-btn__text">Начать путешествие</div>
									<div className="hero-btn__corner2" />
								</button>
								<div className="hero-line" />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default MainPage
