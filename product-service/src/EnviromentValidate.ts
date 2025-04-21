import * as joi from 'joi';
import logger from './utils/logger';

export default class EnvironmentValidator {
    private envVarsSchema: joi.ObjectSchema;

    constructor() {
        this.envVarsSchema = this.defineSchema();
    }

    private defineSchema(): joi.ObjectSchema {
        return joi.object({
            NODE_ENV: joi.string().valid('development', 'production', 'test').required(),
            PORT: joi.number()
        }).unknown(true);
    }

    public validateEnvironmentVariables(): void {
        const { error, value } = this.envVarsSchema.validate(process.env);

        if (error) {
            logger.warn('Error validating environment variables:', error.message);
            process.exit(1);
        }


        const currentEnv = value.NODE_ENV;

        if (currentEnv === 'development') {
            logger.info('Environment is set to development.');
        } else if (currentEnv === 'production') {
            logger.info('Environment is set to production.');
        } else if (currentEnv === 'test') {
            logger.info('Environment is set to test.');
        }

        logger.info('Validating environment variables');
    }
};
