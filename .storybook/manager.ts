import { PANEL_ID } from '@storybook/addon-knobs'
import addons from '@storybook/addons'
import { create } from '@storybook/theming'

addons.setConfig({
  selectedPanel: PANEL_ID,
  showRoots: true,
  theme: create({
    base: 'light',
    brandTitle: 'andrewjtorr.es',
    brandUrl: 'https://github.com/ajtorres9/andrewjtorr.es',
  }),
})
