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
- _`yarn run withSW`_: starts app with service workers (for local testing and development of PWA)

## Primary color palette change

You can change primary color in *theme.config.js* file. To do that set *primaryColor* variable to preferred color. You
can choose from predefined color palettes. List of available palettes can be
found [here](https://tailwindcss.com/docs/customizing-colors). You can also use custom palette - more information can be
found [here](https://tailwindcss.com/docs/customizing-colors#generating-colors).