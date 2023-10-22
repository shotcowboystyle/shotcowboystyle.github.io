export type PageMetaData = {
	title?: string;
	description?: string;
};

export type Testimonials = {
	companyName: string;
	designation: string;
	id: number;
	image: ImageMetadata;
	name: string;
	testimonial: string;
};

export type Projects = {
	bgImage: ImageMetadata;
	description: string;
	linkText: string;
	screenshot: ImageMetadata;
	tags: string[];
	title: string;
	url: string;
};
