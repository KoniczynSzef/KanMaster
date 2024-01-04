import { z } from 'zod';

const envVars = z.object({
    DATABASE_URL: z.string(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string(),

    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),

    RESEND_API_KEY: z.string(),
});

export type EnvVars = z.infer<typeof envVars>;

envVars.parse(process.env);

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv extends EnvVars {}
    }
}
