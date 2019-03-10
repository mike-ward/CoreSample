module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    '__BUILD__': 'test',
    'ts-jest': {
      tsConfig: {
        "target": 'es6',
        "module": 'es6',
        "esModuleInterop": true,
        "sourceMap": true,
        "outDir": '../tsout'
      }
    }
  }
};