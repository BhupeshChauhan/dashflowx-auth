import { addons } from '@storybook/manager-api';
import {create} from '@storybook/theming'
import myTheme from './theme';

addons.setConfig({
    theme: myTheme
})