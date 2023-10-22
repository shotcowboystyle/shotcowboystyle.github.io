import donaldTrumpImg from '@/assets/donald-trump.jpeg';
import frigateBoostScreenshot from '@/assets/frigate-boost-screenshot.png';
import frigateBoostBgDesktop from '@/assets/frigate-section-bg.svg';
import githubIcon from '@/assets/images/sprite/github.svg';
import linkedinIcon from '@/assets/images/sprite/linkedin.svg';
import twitterIcon from '@/assets/images/sprite/twitter.svg';
import jarJarBinksImg from '@/assets/jar-jar-binks.jpeg';
import kalmiaWoodsScreenshot from '@/assets/kalmia-woods-screenshot.png';
import kalmiaWoodsBgDesktop from '@/assets/kalmia-woods-section-bg.webp';
import nedFlandersImg from '@/assets/ned-flanders.jpeg';
import type { Projects, Testimonials } from '@/types';

export const PROJECTS: Projects[] = [
	{
		description:
			"Frigate Boost is a web extension allowing for requested features that haven't been developed yet like batch deleting of events, etc.",
		screenshot: frigateBoostScreenshot,
		bgImage: frigateBoostBgDesktop,
		tags: ['Typescript', 'Vue', 'Browser Extension'],
		title: 'Frigate Boost',
		url: 'https://github.com/shotcowboystyle/frigate-boost-ext',
		linkText: 'View Source',
	},
	{
		description:
			'Kalmia Woods is a mountain house rental with a full blow guest Welcome Book that will soon be open sourced for use.',
		screenshot: kalmiaWoodsScreenshot,
		bgImage: kalmiaWoodsBgDesktop,
		tags: ['Typescript', 'Vue', 'Astro'],
		title: 'Kalmia Woods',
		url: 'https://www.kalmiawoods.com',
		linkText: 'View Site',
	},
];

export const SOCIALS: Array<{ href: string; icon: ImageMetadata; title: string }> = [
	{
		href: 'https://github.com/shotcowboystyle',
		icon: githubIcon,
		title: 'GitHub',
	},
	{
		href: 'https://www.linkedin.com/in/curtis-blanton/',
		icon: linkedinIcon,
		title: 'LinkedIn',
	},
	{
		href: 'https://twitter.com/shotcowboystyle',
		icon: twitterIcon,
		title: 'Twitter',
	},
];

export const TESTIMONIALS: Testimonials[] = [
	{
		id: 1,
		testimonial:
			'Mesa have had a bombad time work with Curtis. Mesa have learned a lot while work with him. Curtis blended in our team as if hesa had worked with us for years, hesa got acquainted with our stack in nosa time and delivered dry and excellent work. Mesa would spake Curtis definitely lives up as a senior dev, even though hesa gadnek with a bright mind. Tanken Curtis for be with us.',
		name: 'Jar Jar Binks',
		designation: 'CFO',
		companyName: 'Gungan Co',
		image: jarJarBinksImg,
	},
	{
		id: 2,
		testimonial:
			'We have had great chats and shared a lot of knowledge. He noodly-neveroo hesitated having a call with the team to ask questions anddeliveroo what was expected. It would be my honour to work with Curtis in the future again. An amazing person to have as a colleague who I consideroo a friend for sure.',
		name: 'Ned Flanders',
		designation: 'Founder',
		companyName: 'Leftorium',
		image: nedFlandersImg,
	},
	{
		id: 3,
		testimonial:
			'The Art of the Deal, which Obama and Kerry obviously did not read, but Curtis, he read it. And he understood it. Perfectly. Let me tell you, he is a top-notch UI/UX developer! I saw his work, and honestly, it was both very beautiful and very sad. Brought tears to my eyes.',
		name: 'Donal Trump',
		designation: 'Head Honcho',
		companyName: 'MAGA',
		image: donaldTrumpImg,
	},
];
