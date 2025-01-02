
import { useEffect } from 'react'
import Masonry from 'react-masonry-css'
import setting from '../../assets/tab-settings.svg'
import { useNewsStore } from '../../zustand/store'
import NewsSkeleton from '../newsSkeleton/NewsSkeleton'

import './style.css'
const News = () => {

	const articlesLoading = useNewsStore(store => store.articlesLoading)
	const articlesNews = useNewsStore(store => store.articlesNews)
	const setArticlesNews = useNewsStore(store => store.setArticlesNews)

	const summaryLoading = useNewsStore(store => store.summaryLoading)
	const summaryNews = useNewsStore(store => store.summaryNews)
	const setSummaryPortfolioNews = useNewsStore(store => store.setSummaryPortfolioNews)

	useEffect(() => {
		setSummaryPortfolioNews()
		setArticlesNews('aapl')
	}, [])

	const breakpointColumns = {
    default: 2,
    1000: 1, 
  };

	return (
		<div className="news" style={{ width: '100%' }}>
			<div className="content__tabs ">
				<div className="content__tab summary__tab" >
					<div className="tab__buttons">
						<div className="buttons__wrapper">
							<button className="tab__button tab__button_active">Portfolio News Summary</button>
						</div>
						<div className="tab__settings">
							<img src={setting} alt="tab setting" />
						</div>
					</div>
					<div className="tabs__contents ">
						<div className="tab__contents">
							<div className="tab__content tab__content_active" id='portfolio-summary' style={{ whiteSpace: "pre-line" }}>

								{summaryLoading ? <NewsSkeleton /> : summaryNews ? summaryNews.summary : null}
							</div>
						</div>
					</div>
				</div>
				<div className="content__tab articles__tab">
					<div className="tab__buttons">
						<div className="buttons__wrapper">
							<button className="tab__button tab__button_active">Portfolio News Articles</button>
						</div>
						<div className="tab__settings">
							<img src={setting} alt="tab setting" />
						</div>
					</div>
					<div className="tabs__contents">
						<div className="tab__contents">
							<div className="tab__content tab__content_active">
							<Masonry
									breakpointCols={breakpointColumns}
									className="my-masonry-grid"
									columnClassName="my-masonry-grid_column"
								>
									{articlesLoading ? <NewsSkeleton /> :
										articlesNews != undefined ? articlesNews.stories.map(((item, i) => {
											return <div className="articles__tab-item" key={i}>
												<h4 className='articles__tab-title'>{item.title}</h4>
												<p className='articles__tab-description'>{item.description}</p>
											</div>
										})) : null
									}
								</Masonry>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default News