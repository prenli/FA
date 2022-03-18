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

## Customization

### Translations

App language is taken from contact settings in FA Solutions backend. Fallback language is english, i.e. if translations
for specified language are missing, english will be used. Translation files are located in *public/locales* directory.
Every language must have its own directory. Directory name should consist of two parts:

* The language code, taken from the ISO 639-1 standard
* The country/region code, taken from the ISO 3166-1 alpha-2 standard

Seperated by dash. For example fi-FI is the name of directory for Finnish language. Some translations are taken from
backend API - transaction and order types (sell, buy, etc.) and holding types (stock, fund, bond, etc.).

### Icons

To change app icon you need to change at least 4 files in *public* directory:

* favicon.ico - used as favicon in browsers
* logo.svg - used as icon on navbar
* logo192.png (192px x 192px) - used in PWA and apple touch icon
* logo_maskable.png - used in PWA

Keep in mind that for PWA we use maskable icon (more info can be found [here](https://web.dev/maskable-icon/)), if your
do not have maskable icon please adjust *manifest.json* file. You can also add other sizes but changes in *
manifest.json*
file would be necessary. More info can be found [here](https://developer.mozilla.org/en-US/docs/Web/Manifest/icons).
Please be aware that icons can be updated with some delay, more about updates can be
found [here](https://web.dev/manifest-updates/).

### Primary color palette

You can change primary color in *theme.config.js* file. To do that set *primaryColor* variable to preferred color. You
can choose from predefined color palettes. List of available palettes can be
found [here](https://tailwindcss.com/docs/customizing-colors). You can also use custom palette - more information can be
found [here](https://tailwindcss.com/docs/customizing-colors#generating-colors). To apply changes you must build
project (yarn build).