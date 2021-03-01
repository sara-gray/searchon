import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/context'
import Loading from '../components/Loading'

const Home = ({ history }) => {
	const {
		loading,
		publicIds,
		fetchPublicGames,
		fetchGame,
		setUserInfo,
		userInfo,
	} = useGlobalContext()

	const MAX_HERO_IMAGES = 6
	const randomImage =
		Math.floor(Math.random() * Math.floor(MAX_HERO_IMAGES)) + 1

	const [games, setGames] = useState([])

	useEffect(() => {
		fetchPublicGames()
		// Should this be in App.js?
		setUserInfo(
			localStorage.getItem('userInfo')
				? JSON.parse(localStorage.getItem('userInfo'))
				: null
		)
		console.log(userInfo)
	}, [])

	useEffect(() => {
		let newGames = []
		publicIds.map((id) => {
			newGames.push(fetchGame(id))
		})
		if (newGames.length !== 0) setGames(newGames)
	}, [publicIds])

	const selectPublicGame = (e) => {
		let id
		if (e.target.tagName === 'DIV') {
			id = e.target.id
		} else {
			id = e.target.parentNode.id
		}
		history.push(`/play/${id}`)
	}

	if (loading) return <Loading />

	return (
		<section className={`hero hero-image${randomImage}`}>
			<div className='hero-center section'>
				<article className='hero-info '>
					<h2>Play and create Wordsearches online</h2>
					<p>
						<strong>Education</strong>: Create and distribute wordsearches to
						you students
					</p>
					<p>
						<strong>Gaming</strong>: Just enjoy creating and playing your own
						wordsearches. Share them with friends and family!
					</p>
					<button className='btn primary'>
						<Link to='/login'>Login</Link>
					</button>
					<button className='btn'>
						<Link to='/login'>Register</Link>
					</button>
				</article>
				<article className='hero-cards'>
					{games.length !== 0 &&
						games.map((nextGame) => {
							const { id, title, desc, size } = nextGame
							return (
								<div key={id} className='card' onClick={selectPublicGame}>
									<div className='inner-card' id={id}>
										<h4>{title}</h4>
										<p style={{ fontSize: '0.8rem' }}>{desc}</p>
										Grid size: {size.x} x {size.y}
									</div>
								</div>
							)
						})}
				</article>
			</div>
		</section>
	)
}

export default Home
