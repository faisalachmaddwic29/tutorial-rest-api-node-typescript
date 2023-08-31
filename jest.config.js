/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/**/*.test.ts'],
    verbose: true,
    forceExit: true
}
