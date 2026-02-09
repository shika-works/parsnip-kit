import { defineConfig } from 'vitepress'
import { dfs4Md } from './dfs4Md'

const titleMap = {
  starting: '快速开始',
  guide: '开始',
  intro: '简介',
  changelog: '变更日志'
}
const additionMap = {
  string: '字符串',
  typed: '类型检查',
  array: '数组',
  number: '数字',
  common: '通用',
  statistic: '统计',
  object: '对象',
  random: '随机',
  function: '函数',
  async: '异步',
  validator: '校验'
}

const sidebar = dfs4Md('zh', titleMap, additionMap)

export default defineConfig({
  title: 'Parsnip-Kit 文档',
  themeConfig: {
    nav: [
      { text: '首页', link: '/zh' },
      { text: '文档', link: '/zh/guide/intro' }
    ],
    aside: true,
    outline: {
      level: [2, 4]
    },
    sidebar: sidebar,
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭搜索'
                }
              }
            }
          }
        }
      }
    }
  }
})
