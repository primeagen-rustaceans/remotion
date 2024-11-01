import React from 'react';
import styles from './CommunityStats.module.css';

// StatItemContent component
const StatItemContent: React.FC<{
	content: React.ReactNode;
	width: string;
	minWidth?: string;
	maxWidth?: string;
	height?: string;
	fontSize?: string;
	fontWeight?: React.CSSProperties['fontWeight'];
}> = ({
	content,
	width,
	minWidth,
	maxWidth,
	height = 'auto',
	fontSize,
	fontWeight,
}) => (
	<div
		style={{
			width,
			minWidth,
			maxWidth,
			height,
			fontSize,
			fontWeight,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
		}}
	>
		{content}
	</div>
);

export const InstallsPerMonth: React.FC = () => {
	return (
		<div
			className={styles.statItem}
			style={{width: '30%', flexDirection: 'column'}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<StatItemContent
					content="100k"
					width="100px"
					fontSize="2.5rem"
					fontWeight="bold"
				/>
				<StatItemContent
					content={
						<svg
							width="40"
							height="40"
							viewBox="0 0 25 25"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12.6367 2.47534C12.5488 2.44116 12.4512 2.44116 12.3584 2.47534L3.10547 5.98608L12.5 9.67749L21.8945 5.98608L12.6367 2.47534ZM2.34375 18.4519C2.34375 18.613 2.44629 18.7595 2.59766 18.8181L11.3281 22.1287V11.738L2.34375 8.20776V18.4519ZM13.6719 22.1287L22.4023 18.8181C22.5537 18.7595 22.6562 18.613 22.6562 18.4519V8.20776L13.6719 11.738V22.1287ZM11.5283 0.287842C12.1533 0.048584 12.8418 0.048584 13.4668 0.287842L23.2324 3.9939C24.2969 4.39429 25 5.40991 25 6.54761V18.4519C25 19.5896 24.2969 20.6052 23.2373 21.0105L13.4717 24.7166C12.8467 24.9558 12.1582 24.9558 11.5332 24.7166L1.76758 21.0105C0.703125 20.6052 0 19.5896 0 18.4519V6.54761C0 5.40991 0.703125 4.39429 1.7627 3.98901L11.5283 0.282959V0.287842Z"
								fill="var(--text-color)"
							/>
						</svg>
					}
					width="50px"
				/>
			</div>
			<StatItemContent
				content="installs per month"
				width="75%"
				fontSize="1.0rem"
				fontWeight="bold"
			/>
		</div>
	);
};

export const PagesOfDocs: React.FC = () => {
	return (
		<div
			className={styles.statItem}
			style={{width: '30%', flexDirection: 'column'}}
		>
			<div style={{display: 'flex', alignItems: 'center'}}>
				<StatItemContent
					content={
						<svg
							width="28"
							height="40"
							viewBox="0 0 18 21"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M0 3.60938C0 1.61602 1.58304 0 3.53571 0H17.0357H18V0.984375V15.4219V16.4062H17.0357H16.7143V19.0312H17.0357H18V21H17.0357H3.21429C1.43839 21 0 19.5316 0 17.7188C0 17.608 0.00401786 17.4973 0.0160714 17.3906H0V3.60938ZM3.21429 16.4062C2.50312 16.4062 1.92857 16.9928 1.92857 17.7188C1.92857 18.4447 2.50312 19.0312 3.21429 19.0312H14.7857V16.4062H3.21429ZM1.92857 14.7123C2.32232 14.5359 2.75625 14.4375 3.21429 14.4375H16.0714V1.96875H3.53571C2.64777 1.96875 1.92857 2.70293 1.92857 3.60938V14.7123ZM6.10714 4.59375H13.1786H14.1429V6.5625H13.1786H6.10714H5.14286V4.59375H6.10714ZM6.10714 7.875H13.1786H14.1429V9.84375H13.1786H6.10714H5.14286V7.875H6.10714Z"
								fill="var(--text-color)"
							/>
						</svg>
					}
					width="40px"
				/>
				<StatItemContent
					content="500"
					width="85px"
					maxWidth="100px"
					fontSize="2.5rem"
					fontWeight="bold"
				/>
			</div>
			<StatItemContent
				content="pages of docs"
				width="125px"
				fontSize="1.0rem"
				fontWeight="bold"
			/>
		</div>
	);
};

export const TemplatesAndExamples: React.FC = () => (
	<div
		className={styles.statItem}
		style={{
			width: '30%',
			display: 'flex',
			alignItems: 'center',
		}}
	>
		<StatItemContent
			content="35"
			width="60px"
			fontSize="2.7rem"
			fontWeight="bold"
		/>
		<StatItemContent
			content="templates & examples"
			width="135px"
			fontSize="1.35rem"
			fontWeight="bold"
		/>
	</div>
);

export const GitHubStars: React.FC = () => {
	return (
		<div
			className={styles.statItem}
			style={{width: '30%', flexDirection: 'column'}}
		>
			<div style={{display: 'flex', alignItems: 'center'}}>
				<StatItemContent
					content={
						<svg
							width="40"
							height="40"
							viewBox="0 0 26 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12.9951 0C13.4424 0 13.8507 0.24375 14.0451 0.632812L17.3799 7.25625L24.8271 8.31562C25.2646 8.37656 25.6292 8.67188 25.7653 9.07969C25.9014 9.4875 25.7896 9.92812 25.4785 10.2281L20.0778 15.3937L21.3514 22.6875C21.4243 23.1094 21.2444 23.5359 20.8799 23.7891C20.5153 24.0422 20.0389 24.0703 19.65 23.8688L12.9903 20.4375L6.34027 23.8641C5.94652 24.0656 5.47014 24.0375 5.11041 23.7844C4.75069 23.5312 4.56597 23.1047 4.63889 22.6828L5.9125 15.3891L0.511803 10.2281C0.195831 9.92812 0.0888863 9.48281 0.224997 9.07969C0.361108 8.67656 0.725692 8.38125 1.16319 8.31562L8.61041 7.25625L11.9451 0.632812C12.1444 0.24375 12.5479 0 12.9951 0ZM12.9951 3.70312L10.4431 8.775C10.2729 9.10781 9.94722 9.34219 9.56319 9.39844L3.8125 10.2141L7.98819 14.2031C8.25555 14.4609 8.38194 14.8266 8.31875 15.1875L7.33194 20.7984L12.4458 18.1641C12.791 17.9859 13.2042 17.9859 13.5444 18.1641L18.6583 20.7984L17.6764 15.1922C17.6132 14.8313 17.7347 14.4656 18.0069 14.2078L22.1826 10.2188L16.4319 9.39844C16.0528 9.34219 15.7222 9.1125 15.5521 8.775L12.9951 3.70312Z"
								fill="var(--text-color)"
							/>
						</svg>
					}
					width="45px"
				/>
				<StatItemContent
					content="20k"
					width="80px"
					fontSize="2.5rem"
					fontWeight="bold"
				/>
			</div>
			<StatItemContent
				content="GitHub stars"
				width="125px"
				fontSize="1.0rem"
				fontWeight="bold"
			/>
		</div>
	);
};

export const DiscordMembers: React.FC = () => {
	return (
		<div className={styles.statItem} style={{width: '30%'}}>
			<div
				style={{
					width: '80%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<StatItemContent
						content="4000"
						width="142px"
						fontSize="2.5rem"
						fontWeight="bold"
					/>
					<StatItemContent
						content="Discord members"
						width="142px"
						fontSize="1rem"
						fontWeight="bold"
					/>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<StatItemContent
						content={
							<svg
								width="61"
								height="47"
								viewBox="0 0 46 35"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M38.9978 2.95533C38.9843 2.93009 38.962 2.91064 38.9352 2.90065C35.955 1.53492 32.8101 0.560692 29.5791 0.00230404C29.55 -0.00300893 29.5201 0.00092017 29.4934 0.0135365C29.4667 0.0261528 29.4447 0.0468187 29.4304 0.0726144C29.0019 0.84938 28.6129 1.64724 28.2648 2.46316C24.7802 1.93495 21.2356 1.93495 17.7509 2.46316C17.4015 1.64523 17.0072 0.847165 16.5697 0.0726144C16.5546 0.0475873 16.5324 0.0275657 16.506 0.0150584C16.4795 0.00255114 16.45 -0.00188563 16.421 0.00230404C13.1844 0.558177 10.034 1.53248 7.04927 2.90065C7.0231 2.91173 7.00116 2.93089 6.98669 2.95533C1.02568 11.8535 -0.609293 20.5251 0.188637 29.0951C0.190896 29.1167 0.197628 29.1376 0.208402 29.1564C0.219177 29.1752 0.233759 29.1916 0.25122 29.2045C3.7235 31.7693 7.60667 33.7268 11.7352 34.9934C11.7648 35.0025 11.7966 35.0022 11.8261 34.9924C11.8556 34.9826 11.8812 34.9638 11.8994 34.9387C12.7852 33.7344 13.5702 32.4593 14.2463 31.1263C14.2553 31.108 14.2604 31.088 14.2613 31.0676C14.2622 31.0471 14.2589 31.0268 14.2516 31.0077C14.2442 30.9886 14.233 30.9713 14.2186 30.9567C14.2043 30.9422 14.1871 30.9308 14.1681 30.9232C12.9278 30.4486 11.7271 29.8765 10.5774 29.2123C10.5571 29.1999 10.54 29.1828 10.5277 29.1624C10.5154 29.142 10.5082 29.119 10.5067 29.0953C10.5051 29.0715 10.5093 29.0478 10.5189 29.026C10.5285 29.0042 10.5432 28.985 10.5617 28.9701C10.8042 28.7904 11.0468 28.6029 11.2736 28.4155C11.2936 28.3979 11.3182 28.3864 11.3445 28.3822C11.3708 28.3781 11.3978 28.3815 11.4222 28.392C18.9478 31.8216 27.0992 31.8216 34.5388 28.392C34.5625 28.3804 34.589 28.3757 34.6153 28.3785C34.6416 28.3813 34.6666 28.3914 34.6874 28.4076C34.9143 28.5951 35.1568 28.7904 35.3993 28.9701C35.4178 28.985 35.4325 29.0042 35.4421 29.026C35.4517 29.0478 35.4559 29.0715 35.4543 29.0953C35.4528 29.119 35.4456 29.142 35.4333 29.1624C35.421 29.1828 35.4039 29.1999 35.3836 29.2123C34.2369 29.8799 33.0357 30.4496 31.7929 30.9154C31.7739 30.923 31.7567 30.9344 31.7424 30.9489C31.728 30.9635 31.7168 30.9808 31.7095 30.9999C31.7021 31.019 31.6988 31.0393 31.6997 31.0597C31.7006 31.0801 31.7057 31.1001 31.7147 31.1185C32.4026 32.4449 33.187 33.7191 34.0616 34.9309C34.0798 34.956 34.1054 34.9748 34.1349 34.9846C34.1644 34.9944 34.1962 34.9947 34.2258 34.9856C38.3663 33.7246 42.2606 31.7669 45.7411 29.1967C45.7589 29.1841 45.7737 29.1679 45.7846 29.149C45.7954 29.1301 45.8019 29.109 45.8037 29.0873C46.758 19.1892 44.1922 10.5879 38.9978 2.95533ZM15.3728 23.8765C13.1042 23.8765 11.2423 21.7985 11.2423 19.2517C11.2423 16.7049 13.0729 14.619 15.3728 14.619C17.6962 14.619 19.5424 16.7127 19.5032 19.2439C19.5032 21.7985 17.6727 23.8765 15.3728 23.8765ZM30.6586 23.8765C28.39 23.8765 26.5282 21.7985 26.5282 19.2517C26.5282 16.7049 28.3509 14.619 30.6586 14.619C32.982 14.619 34.8282 16.7127 34.7891 19.2439C34.7891 21.7985 32.9742 23.8765 30.6586 23.8765Z"
									fill="var(--text-color)"
								/>
							</svg>
						}
						width="45px"
					/>
				</div>
			</div>
		</div>
	);
};

export const Contributors: React.FC = () => {
	return (
		<div
			className={styles.statItem}
			style={{
				width: '30%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<StatItemContent
						content={
							<svg
								width="60"
								height="50"
								viewBox="0 0 63 40"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6.975 5.375C6.975 3.94946 7.54656 2.58231 8.56395 1.5743C9.58133 0.566293 10.9612 0 12.4 0C13.8388 0 15.2187 0.566293 16.2361 1.5743C17.2534 2.58231 17.825 3.94946 17.825 5.375C17.825 6.80054 17.2534 8.16769 16.2361 9.1757C15.2187 10.1837 13.8388 10.75 12.4 10.75C10.9612 10.75 9.58133 10.1837 8.56395 9.1757C7.54656 8.16769 6.975 6.80054 6.975 5.375ZM6.2 20.5114C5.23125 21.5864 4.65 23.0165 4.65 24.5714C4.65 26.1263 5.23125 27.5565 6.2 28.6315V20.5114ZM20.1887 15.7795C17.3116 18.3038 15.5 21.9991 15.5 26.1071C15.5 29.3993 16.6625 32.4228 18.6 34.7935V36.8571C18.6 38.556 17.2147 39.9286 15.5 39.9286H9.3C7.58531 39.9286 6.2 38.556 6.2 36.8571V34.2848C2.53813 32.5571 0 28.8618 0 24.5714C0 18.6301 4.85344 13.8214 10.85 13.8214H13.95C16.275 13.8214 18.4256 14.5413 20.1887 15.7699V15.7795ZM43.4 36.8571V34.7935C45.3375 32.4228 46.5 29.3993 46.5 26.1071C46.5 21.9991 44.6884 18.3038 41.8112 15.7699C43.5744 14.5413 45.725 13.8214 48.05 13.8214H51.15C57.1466 13.8214 62 18.6301 62 24.5714C62 28.8618 59.4619 32.5571 55.8 34.2848V36.8571C55.8 38.556 54.4147 39.9286 52.7 39.9286H46.5C44.7853 39.9286 43.4 38.556 43.4 36.8571ZM44.175 5.375C44.175 3.94946 44.7466 2.58231 45.7639 1.5743C46.7813 0.566293 48.1612 0 49.6 0C51.0388 0 52.4187 0.566293 53.4361 1.5743C54.4534 2.58231 55.025 3.94946 55.025 5.375C55.025 6.80054 54.4534 8.16769 53.4361 9.1757C52.4187 10.1837 51.0388 10.75 49.6 10.75C48.1612 10.75 46.7813 10.1837 45.7639 9.1757C44.7466 8.16769 44.175 6.80054 44.175 5.375ZM55.8 20.5114V28.6411C56.7687 27.5565 57.35 26.1359 57.35 24.581C57.35 23.0261 56.7687 21.596 55.8 20.521V20.5114ZM31 0C32.6443 0 34.2213 0.647192 35.3841 1.7992C36.5468 2.95121 37.2 4.51367 37.2 6.14286C37.2 7.77204 36.5468 9.3345 35.3841 10.4865C34.2213 11.6385 32.6443 12.2857 31 12.2857C29.3557 12.2857 27.7787 11.6385 26.6159 10.4865C25.4532 9.3345 24.8 7.77204 24.8 6.14286C24.8 4.51367 25.4532 2.95121 26.6159 1.7992C27.7787 0.647192 29.3557 0 31 0ZM23.25 26.1071C23.25 27.6621 23.8312 29.0826 24.8 30.1672V22.0471C23.8312 23.1317 23.25 24.5522 23.25 26.1071ZM37.2 22.0471V30.1768C38.1687 29.0922 38.75 27.6717 38.75 26.1167C38.75 24.5618 38.1687 23.1317 37.2 22.0567V22.0471ZM43.4 26.1071C43.4 30.3975 40.8619 34.0929 37.2 35.8205V39.9286C37.2 41.6275 35.8147 43 34.1 43H27.9C26.1853 43 24.8 41.6275 24.8 39.9286V35.8205C21.1381 34.0929 18.6 30.3975 18.6 26.1071C18.6 20.1658 23.4534 15.3571 29.45 15.3571H32.55C38.5466 15.3571 43.4 20.1658 43.4 26.1071Z"
									fill="var(--text-color)"
								/>
							</svg>
						}
						width="65px"
					/>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<StatItemContent
						content="200"
						width="100px"
						fontSize="2.5rem"
						fontWeight="bold"
					/>
					<StatItemContent
						content="contributors"
						width="100px"
						fontSize="1.0rem"
						fontWeight="bold"
					/>
				</div>
			</div>
		</div>
	);
};
