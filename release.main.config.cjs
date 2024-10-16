// const baseConfig = require('./release.config.cjs');

module.exports = {
	branches: ['main'],
	dryRun: false,
	plugins: [
		// https://github.com/semantic-release/changelog
		// Must be called before npm and git plugins
		// Uses the result of the release-notes-generator to generate the CHANGELOG.md.
		[
			'@semantic-release/changelog',
			{
				changelogFile: 'CHANGELOG.md',
				changelogTitle:
					'# Changelog\n\nAll notable changes to this project will be documented in this file. See\n[Conventional Commits](https://conventionalcommits.org) for commit guidelines.',
			},
		],
		// https://github.com/semantic-release/git
		[
			'@semantic-release/git',
			{
				message: 'chore(release): v<%= nextRelease.version %> [skip ci]\n\n${nextRelease.notes}',
				assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
			},
		],
		// https://github.com/semantic-release/github
		'@semantic-release/github',
	],
};
