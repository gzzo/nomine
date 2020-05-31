module.exports = {
  moduleDirectories: ['src', 'node_modules'],
  moduleFileExtensions: ['js', 'tsx'],
  moduleNameMapper: {
    '\\.s?css$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/enzyme.js'],
  setupFiles: ['<rootDir>/jsdom.setup.js'],
  globals: {
    DEBUG: false,
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
