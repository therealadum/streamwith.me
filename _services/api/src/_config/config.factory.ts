import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';

dotenv.config();

let release = 'local';

try {
  release = readFileSync(`${process.cwd()}/.release`, {
    encoding: 'utf-8',
  });

  release = release.replace('\n', '');
} catch (err) {}

export default function configurationFactory() {return ({
  env: process.env.ENV,
  port: Number(process.env.PORT),
  aws_region: process.env.AWS_REGION,
  aws_kms_endpoint: process.env.AWS_KMS_ENDPOINT || 'https://kms.us-east-1.amazonaws.com',
  redis_publisher_host: process.env.REDIS_PUBLISHER_HOST,
  redis_publisher_port: Number(process.env.REDIS_PUBLISHER_PORT),
  redis_subscriber_host: process.env.REDIS_SUBSCRIBER_HOST,
  redis_subscriber_port: Number(process.env.REDIS_SUBSCRIBER_PORT),
  redis_password: process.env.REDIS_PASSWORD,
  content_service_url: process.env.CONTENT_SERVICE_URL,
  content_service_x_api_key: process.env.CONTENT_SERVICE_X_API_KEY,
  user_token_kms_key_id: process.env.USER_TOKEN_KMS_KEY_ID,
  cleo_backend_url: process.env.CLEO_BACKEND_URL,
  cleo_backend_oauth_client_id: process.env.CLEO_BACKEND_OAUTH_CLIENT_ID,
  assessments_api_url: process.env.ASSESSMENTS_API_URL,
  assessments_api_secret: process.env.ASSESSMENTS_API_SECRET,
  sentry_dsn: process.env.SENTRY_DSN,
  launch_darkly_sdk_key: process.env.LAUNCH_DARKLY_SDK_KEY,
  tagging_api_url: process.env.TAGGING_API_URL,
  tagging_api_secret: process.env.TAGGING_API_SECRET,
  release,
})};
