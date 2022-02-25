# FA Client App

This is FA Client App based on Create React App starter.

## Getting started

* Checkout the project
* Change the URL to point to your FA instance in the following files:
    * keycloak.json
    * .env
* Ask FA Support to
    * Change the fa-api access type to be 'public'
    * Add as a valid redirect URI to be '*'
* Run

  	yarn install
  	yarn start

- _`yarn run storybook`_: starts Storybook
- _`yarn run withSW`_: starts app with service workers (for PWA testing and development)
