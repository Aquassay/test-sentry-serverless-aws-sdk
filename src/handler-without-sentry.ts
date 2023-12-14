import middy from '@middy/core';
import type { APIGatewayProxyResult } from "aws-lambda";

const lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 200,
        body: 'ok',
    }
};

export const handler = middy(lambdaHandler);