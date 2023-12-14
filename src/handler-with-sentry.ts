import middy from '@middy/core';
import { AWSLambda } from '@sentry/serverless';
import type { APIGatewayProxyResult } from "aws-lambda";

AWSLambda.init({
    dsn         : process.env.DSN,
    environment : process.env.ENVIRONMENT,
    release     : process.env.VERSION,
});

const lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 200,
        body: 'ok',
    }
};

export const handler = middy(AWSLambda.wrapHandler(lambdaHandler));