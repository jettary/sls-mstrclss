import { Serverless, Functions } from 'serverless/aws';
import * as fs from 'fs';
// import * as path from 'path';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'rnd-tech-conf',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '>=1.72.0',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    'serverless-offline': {
      useChildProcesses: true,
      useWorkerThreads: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: [
    'serverless-webpack',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },

    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },

  functions: ((): Functions => {
    const functions: Functions = {};

    for (const file of fs.readdirSync('functions')) {
      const collectionFunctions = require(`./functions/${file}`)?.functionsDeclaration;

      if (collectionFunctions) {
        Object.assign(functions, collectionFunctions);
      }
    }

    return functions;
  })()
};

module.exports = serverlessConfiguration;
