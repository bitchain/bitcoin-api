import { Express } from 'express';

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

export function sentryConfig(application: Express): void {
  const integrationsHttp = new Sentry.Integrations.Http({ tracing: true });
  const integrationsExpress = new Tracing.Integrations.Express({
    app: application,
  });

  Sentry.init({
    environment: process.env.SENTRY_ENVIRONMENT,
    dsn: process.env.SENTRY_DSN,
    integrations: [integrationsHttp, integrationsExpress],
    tracesSampleRate: 1.0,
  });

  application.use(Sentry.Handlers.requestHandler());
  application.use(Sentry.Handlers.tracingHandler());
}
