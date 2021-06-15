import './App.css';
import React from "react";
import * as Sentry from "@sentry/react";
import * as SentryTrack from "@sentry/browser";
import { Integrations as TracingIntegrations } from "@sentry/tracing";
SentryTrack.init({
  dsn: "https://ed8c3d2fe0a048598af028e6e9b828ed@o849647.ingest.sentry.io/5818513",
  // This enables automatic instrumentation (highly recommended), but is not
  // necessary for purely manual usage
  integrations: [new TracingIntegrations.BrowserTracing({
    beforeNavigate: context => {
      return {
        ...context,
        // You could use your UI's routing library to find the matching
        // route template here. We don't have one right now, so do some basic
        // parameter replacements.
        //name: location.pathname
          //.replace(/\/[a-f0-9]{32}/g, "/<hash>")
          //.replace(/\/\d+/g, "/<digits>"),
      };
    },
  })],

  // To set a uniform sample rate
  tracesSampleRate: 1.0
});

function FallbackComponent() {
  return <div>An error has occurred</div>;
}



function badFunc() {
  throw('the world is broken')
}

function App() {
  const myFallback = <FallbackComponent />;
  return (
    <body>
    <Sentry.ErrorBoundary fallback={myFallback} showDialog>
        <button className="button" onClick={badFunc}>Break the world</button>
    </Sentry.ErrorBoundary>
    </body>
  );
}

export default App;
