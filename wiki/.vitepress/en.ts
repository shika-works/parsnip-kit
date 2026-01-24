import { defineConfig } from 'vitepress'
import { dfs4Md } from './dfs4Md'

const titleMap = {
  starting: 'Quickly Starting',
  intro: 'Introduction',
  changelog: 'Changelog'
}
const sidebar = dfs4Md('en', titleMap)

export default defineConfig({
  title: 'Parsnip-Kit wiki',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/en' },
      { text: 'Doc', link: '/en/guide/intro' }
    ],
    sidebar: sidebar
  }
})
