import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { Text } from 'components/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

export type PageStyles = {
	fontFamilyOption: string;
	fontSizeOption: string;
	fontColor: string;
	contentWidth: string;
	backgroundColor: string;
};

export type ArticleParamsFormProps = {
	isOpen: boolean;
	setPageStyles: (newPageStyles: PageStyles) => void;
};

// Форма параметров статьи
export const ArticleParamsForm = ({
	isOpen,
	setPageStyles,
}: ArticleParamsFormProps) => {
	const [formOpen, setFormOpen] = useState(!isOpen);
	const formRef = useRef<HTMLDivElement>(null);

	const handleArrowButtonClick = () => {
		setFormOpen(!formOpen);
	};

	const handleOutsideClick = (event: MouseEvent) => {
		const { target } = event;
		if (target instanceof Node && !formRef.current?.contains(target)) {
			setFormOpen(false);
		}
	};

	useEffect(() => {
		if (!formOpen) {
			window.addEventListener('mousedown', handleOutsideClick);
		}
		return () => {
			window.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	// Функция применения новых выбранных стилей
	const applicationNewStyles = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const newPageStyles: PageStyles = {
			fontFamilyOption: selectedFontFamilyOptions.value,
			fontSizeOption: selectedFontSizeOptions.value,
			fontColor: selectedFontColors.value,
			contentWidth: selectedContentWidthArr.value,
			backgroundColor: selectedBackgroundColors.value,
		};
		setPageStyles(newPageStyles);
		setFormOpen(false);
	};

	// Функция сброса формы, применение начальных стилей
	const resetForm = () => {
		setSelectedFontFamilyOptions(defaultArticleState.fontFamilyOption);
		setSelectedFontSizeOptions(defaultArticleState.fontSizeOption);
		setSelectedFontColors(defaultArticleState.fontColor);
		setSelectedBackgroundColors(defaultArticleState.backgroundColor);
		setSelectedContentWidthArr(defaultArticleState.contentWidth);
		setPageStyles(styles);
	};

	const [selectedFontFamilyOptions, setSelectedFontFamilyOptions] =
		useState<OptionType>(fontFamilyOptions[0]);
	const [selectedFontSizeOptions, setSelectedFontSizeOptions] =
		useState<OptionType>(fontSizeOptions[0]);
	const [selectedFontColors, setSelectedFontColors] = useState<OptionType>(
		fontColors[0]
	);
	const [selectedBackgroundColors, setSelectedBackgroundColors] =
		useState<OptionType>(backgroundColors[0]);
	const [selectedContentWidthArr, setSelectedContentWidthArr] =
		useState<OptionType>(contentWidthArr[0]);
	const menuStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: formOpen,
	});
	return (
		<>
			<ArrowButton onClick={handleArrowButtonClick} isOpen={formOpen} />
			<aside ref={formRef} className={menuStyle}>
				<form className={styles.form} onSubmit={applicationNewStyles}>
					<Text as='h2' size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						selected={selectedFontFamilyOptions}
						onChange={setSelectedFontFamilyOptions}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={selectedFontSizeOptions}
						name='radio'
						onChange={setSelectedFontSizeOptions}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={selectedFontColors}
						onChange={setSelectedFontColors}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectedBackgroundColors}
						onChange={setSelectedBackgroundColors}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={selectedContentWidthArr}
						onChange={setSelectedContentWidthArr}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
