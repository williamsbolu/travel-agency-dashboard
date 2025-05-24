import * as Sentry from "@sentry/react-router";

Sentry.init({
  dsn: "https://55861ad0718e82e714787edde6273f41@o4509298970329088.ingest.de.sentry.io/4509298986582096",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
