import { BASE64_EMAIL } from '@/constants';

export const CONTACT_EMAIL = Buffer.from(BASE64_EMAIL, 'base64').toString('utf-8');

export const CONTACT_MAILTO_HREF = `mailto:${CONTACT_EMAIL}`;
