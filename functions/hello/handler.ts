import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const hello: APIGatewayProxyHandler = async (_event, _context) => {
  const { STAGE, DATABASE, SB_USERNAME, DB_PASSWORD } = process.env;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      environment: { STAGE, DATABASE, SB_USERNAME, DB_PASSWORD },
    }, null, 2),
  };
};
