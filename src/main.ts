import { bootstrapApplication } from '@angular/platform-browser';
import { Amplify } from 'aws-amplify';

import { appConfig } from './app/app.config';
import { awsConfig } from './app/config/aws-config';
import { App } from './app/app';

Amplify.configure(awsConfig);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
