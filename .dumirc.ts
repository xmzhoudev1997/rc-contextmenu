import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: '',
  themeConfig: {
    name: 'rc-contextmenu',
  },
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/rc-contextmenu/dist/',
  hash: true,
  history: {type: 'hash',},
});
