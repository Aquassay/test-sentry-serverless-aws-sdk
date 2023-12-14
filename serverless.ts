import type { Serverless } from 'serverless/aws';

module.exports = <Partial<Serverless>>{
    service          : "test-sentry",
    frameworkVersion : '3',
    package          : {
        individually           : true,
        excludeDevDependencies : true,
    },
    provider: {
        name: 'aws',
        region: 'eu-west-1',
        runtime: 'nodejs20.x',
        architecture: 'arm64',
        memorySize: 1024,
        stage: '${opt:stage, "local"}',
        environment: {
            dsn: process.env.DSN,
            environment: process.env.ENVIRONMENT,
            release: process.env.VERSION,
        },
    },
    custom: {
        esbuild: {
            external: [
                'pg',
                'pg-query-stream',
                'better-sqlite3',
                'tedious',
                'mysql',
                'oracledb',
                'sqlite3',
            ],
            bundle: true,
            concurrency: 3,
            zipConcurrency: 3,
            minify: true,
            target: 'node20',
            packager: 'npm',
            sourcemap: true,
            sourcesContent: false,
            treeShaking: true,
            mainFields: ['module', 'main'],
            watch: {
                pattern: [
                    'index.ts',
                ],
                ignore: [
                    '.esbuild',
                    'dist',
                    'node_modules',
                    '.build',
                    './**/*.(js|ts)',
                ],
            },
            exclude: [
                '@aws-sdk',
            ],
        },
    },
    plugins: [
        'serverless-esbuild',
        'serverless-analyze-bundle-plugin',
    ],
    functions: {
        testWithoutSentry : {
            handler              : 'src/handler-without-sentry.handler',
            maximumRetryAttempts : 0,
            events               : [
                {
                    http : {
                        method : 'get',
                        path   : '/test/without',
                    },
                },
            ],
        },
        testWithSentry : {
            handler              : 'src/handler-with-sentry.handler',
            maximumRetryAttempts : 0,
            events               : [
                {
                    http : {
                        method : 'get',
                        path   : '/test/with',
                    },
                },
            ],
        },
    },
};