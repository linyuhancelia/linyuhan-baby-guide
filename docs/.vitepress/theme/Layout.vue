<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #doc-after>
      <div v-if="frontmatter.layout !== 'home'" class="site-disclaimer">
        <p>本文档基于公开科学指南与市场数据编制，不构成任何医疗建议或消费推荐。每个孩子都是独立个体，请以你的儿科医生建议为准。</p>
        <p class="site-disclaimer-date">最后更新：2026年7月</p>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.site-disclaimer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  line-height: 1.6;
}
.site-disclaimer-date {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.7;
}
</style>
