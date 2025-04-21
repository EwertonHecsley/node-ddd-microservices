import app from "."
import EnvironmentValidator from "./EnviromentValidate";
import logger from "./utils/logger"

export class App {
    private readonly port = process.env.PORT

    async bootstrap(): Promise<void> {
        this.validateEnv();
        this.startServer();
        this.handleGracefulShutdown();
    }

    private validateEnv(): void {
        const envValidator = new EnvironmentValidator();
        envValidator.validateEnvironmentVariables();
    }

    private startServer(): void {
        app.listen(this.port, () => { logger.info(`🟢 Server is running on port ${this.port}`) });
    }

    private handleGracefulShutdown(): void {
        process.on('SIGINT', async () => {
            logger.info('🔌 Gracefully shutting down...');
            process.exit(0);
        });
    }
}