import { configure, addDecorator, addParameters } from '@storybook/react';
import { withCssResources } from '@storybook/addon-cssresources';

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
addDecorator(withCssResources)
addParameters({
  cssresources: [{
    id: `sfds`,
    code: `<link rel="stylesheet" type="text/css" href="` + REACT_APP_API_BASE_URL + `/assets/styles/salesforce-lightning-design-system.min.css"></link>`,
    picked: true,
  }, {
    id: `bootstrap`,
    code: `<link rel="stylesheet" type="text/css" href="/assets/styles/bootstrap.css"></link>`,
    picked: true,
  }, {
    id: `style`,
    code: `<style>html{background: #fff;}</style>`,
    picked: true,
  }],
});

// automatically import all files ending in *.stories.js
configure(require.context('../src/stories', true, /\.stories\.js$/), module);
