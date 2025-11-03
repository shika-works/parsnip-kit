import { defineConfig } from 'vitepress'
import { dfs4Md } from './dfs4Md'

const titleMap = {
  starting: 'クイックスタート',
  guide: '入門',
  intro: 'はじめに',
  changelog: '変更履歴'
}
const additionMap = {
  string: '文字列',
  typed: '型チェック',
  array: '配列',
  number: '数値',
  common: '共通',
  statistic: '統計',
  object: 'オブジェクト',
  random: 'ランダム',
  function: '関数',
  async: '非同期',
  validator: 'バリデーター'
}

const sidebar = dfs4Md('ja', titleMap, additionMap)

export default defineConfig({
  title: 'Parsnip-Kit wiki',
  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/ja' },
      { text: 'ドキュメント', link: '/ja/guide/intro' }
    ],
    sidebar: sidebar,
    search: {
      provider: 'local',
      options: {
        locales: {
          ja: {
            translations: {
              button: {
                buttonText: '検索',
                buttonAriaLabel: '検索'
              },
              modal: {
                noResultsText: '関連結果が見つかりません',
                resetButtonTitle: '検索条件をクリア',
                footer: {
                  selectText: '選択',
                  navigateText: '切り替え',
                  closeText: '検索を閉じる'
                }
              }
            }
          }
        }
      }
    }
  }
})
