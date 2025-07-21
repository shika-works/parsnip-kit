<script setup lang="ts">
  import DefaultTheme from 'vitepress/theme'
  import { inBrowser } from 'vitepress'
  const base = 'parsnip-kit'
  if (inBrowser) {
    const lang = navigator.language
    document.cookie = `nf_lang=${lang}; path=/`
    const path = location.pathname.split('/').filter(Boolean)
    const flag = !base
      ? path.length === 0 || path[0] === 'index'
      : path[0] === base && (!path[1] || path[1] === 'index')
    if (flag) {
      const langTag = lang === 'zh-CN' ? 'zh' : lang === 'ja' ? 'ja' : 'en'
      const aTag = document.createElement('a')
        aTag.href = langTag
        document.body.appendChild(aTag)
        aTag.click()
    }
  }
</script>

<template>
  <DefaultTheme.Layout />
</template>