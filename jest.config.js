module.exports = {
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'\\.(css|scss|sass)$': 'identity-obj-proxy',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
