const lightTheme = require('daisyui/src/theming/themes')['[data-theme=autumn]'];
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,css}'],
	darkMode: 'class',
	theme: {
		extend: {
			animation: {
				'resume-button-bottom-bubbles': 'resumeButtonBottomBubbles 0.6s linear',
				'resume-button-top-bubbles': 'resumeButtonTopBubbles 0.6s linear',
				'pulse-scale': 'pulseScale 1.5s linear infinite',
				'spin-circle': 'spinCircle 8s linear infinite',
				blink: 'blink 1.5s infinite',
				floating: 'floating 4s linear infinite',
			},
			keyframes: {
				resumeButtonBottomBubbles: {
					'0%': {
						backgroundPosition: '10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%',
					},
					'50%': {
						backgroundPosition: '0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%',
					},

					'100%': {
						backgroundPosition: '0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%',
						backgroundSize: '0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%',
					},
				},
				resumeButtonTopBubbles: {
					'0%': {
						backgroundPosition:
							'5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%',
					},
					'50%': {
						backgroundPosition:
							'0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%',
					},
					'100%': {
						backgroundPosition:
							'0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%',
						backgroundSize: '0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%',
					},
				},
				pulseScale: {
					from: {
						transform: 'scale(0)',
						opacity: 1,
					},
					to: {
						transform: 'scale(1)',
						opacity: 0,
					},
				},
				spinCircle: {
					from: {
						transform: 'rotateZ(0deg)',
					},
					to: {
						transform: 'rotateZ(360deg)',
					},
				},
				blink: {
					from: {
						opacity: '100%',
						transform: 'scale(1)',
					},
					'50%': {
						opacity: '50%',
						transform: 'scale(0.4)',
					},
					to: {
						opacity: '100%',
						transform: 'scale(1)',
					},
				},
				floating: {
					from: {
						transform: 'translate(2px, 3px) rotate(1deg)',
					},
					'20%': {
						transform: 'translate(3px, -2px) rotate(-2deg)',
					},
					'40%': {
						transform: 'translate(-1px, -3px) rotate(1deg)',
					},
					'60%': {
						transform: 'translate(-2px, 0) rotate(1deg)',
					},
					'80%': {
						transform: 'translate(-1px, 3px) rotate(2deg)',
					},
					to: {
						transform: 'translate(2px, 3px) rotate(1deg)',
					},
				},
			},
		},
		fontFamily: {
			sans: ['"General Sans"', 'Arial', ...defaultTheme.fontFamily.sans],
			'sans-serif': ['"Thunder"', 'system-ui', ...defaultTheme.fontFamily.serif],
		},
	},
	corePlugins: {
		fontSize: false,
	},
	daisyui: {
		themes: [
			{
				light: {
					...lightTheme,
					primary: '#20D489',
					secondary: '#377cfb',
					accent: '#abaddd',
					neutral: '#333c4d',
					'base-100': '#e2e2e2',
					'base-content': '#000000',
					info: '#2a27e2',
					success: '#36d399',
					warning: '#FFC700',
					error: '#F1416C',
					'.bg-light': {
						'background-color': '#ffffff',
					},
				},
			},
		],
		darkTheme: 'dark',
	},
	plugins: [require('tailwindcss-fluid-type'), require('daisyui')],
};
