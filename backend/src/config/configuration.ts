export default () => ({
  port: parseInt(process.env.PORT || '3001', 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'change-me-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
  s3: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION || 'eu-west-1',
    bucket: process.env.S3_BUCKET,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    priceIdBasic: process.env.STRIPE_PRICE_ID_BASIC,
    priceIdFamily: process.env.STRIPE_PRICE_ID_FAMILY,
  },
  llm: {
    provider: process.env.LLM_PROVIDER || 'openai',
    apiKey: process.env.LLM_API_KEY,
    model: process.env.LLM_MODEL || 'gpt-4-turbo-preview',
  },
  ocr: {
    provider: process.env.OCR_PROVIDER || 'google',
    apiKey: process.env.OCR_API_KEY,
  },
  email: {
    provider: process.env.EMAIL_PROVIDER || 'resend',
    apiKey: process.env.EMAIL_API_KEY,
    fromAddress: process.env.EMAIL_FROM || 'noreply@gestoriacopilot.com',
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
});
