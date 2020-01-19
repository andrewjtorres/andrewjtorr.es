import { PANEL_ID } from '@storybook/addon-knobs'
import addons from '@storybook/addons'
import { create } from '@storybook/theming'

addons.setConfig({
  selectedPanel: PANEL_ID,
  theme: create({
    base: 'light',
    brandTitle: 'andrewjtorr.es',
    brandUrl: 'https://andrewjtorr.es',
  }),
})
