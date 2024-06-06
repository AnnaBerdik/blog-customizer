import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	PageStyles,
} from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [pageStyles, setPageStyles] = useState<PageStyles>({
		fontFamilyOption: defaultArticleState.fontFamilyOption.value,
		fontSizeOption: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
	});

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageStyles.fontFamilyOption,
					'--font-size': pageStyles.fontSizeOption,
					'--font-color': pageStyles.fontColor,
					'--container-width': pageStyles.contentWidth,
					'--bg-color': pageStyles.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm isOpen={true} setPageStyles={setPageStyles} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
