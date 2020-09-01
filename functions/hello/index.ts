import { Functions } from 'serverless/aws';

export const functionsDeclaration: Functions = {
  hello: {
    handler: './functions/hello/handler.hello',
    events: [
      {
        http: {
          method: 'get',
          path: 'hello',
        }
      }
    ]
  }
};
