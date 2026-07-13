<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, withBase, useRoute } from 'vitepress'
import { computed } from 'vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
const route = useRoute()

const stages = [
  { emoji: '🤰', label: '孕期', link: '/stages/prenatal' },
  { emoji: '👶', label: '0-3M', link: '/stages/0-3m' },
  { emoji: '🙌', label: '3-6M', link: '/stages/3-6m' },
  { emoji: '🚀', label: '6-12M', link: '/stages/6-12m' },
  { emoji: '🗣️', label: '1-3Y', link: '/stages/1-3y' },
  { emoji: '🧩', label: '3-5Y', link: '/stages/3-5y' },
]

const isStage = computed(() => route.path.includes('/stages/'))
const currentStage = computed(() => stages.findIndex(s => route.path.includes(s.link)))
</script>

<template>
  <Layout>
    <template #doc-after>
      <div v-if="frontmatter.layout !== 'home'" class="site-disclaimer">
        <p>本文档基于公开科学指南与市场数据编制，不构成任何医疗建议或消费推荐。每个孩子都是独立个体，请以你的儿科医生建议为准。</p>
        <p class="site-disclaimer-date">最后更新：2026年7月</p>
      </div>
    </template>
    <template #layout-bottom>
      <nav class="mobile-bottom-nav">
        <a
          v-for="(s, i) in stages"
          :key="s.link"
          :href="withBase(s.link)"
          class="bottom-nav-item"
          :class="{ active: currentStage === i }"
        >
          <span class="bottom-nav-emoji">{{ s.emoji }}</span>
          <span class="bottom-nav-label">{{ s.label }}</span>
        </a>
      </nav>
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

.mobile-bottom-nav {
  display: none;
}

@media (max-width: 768px) {
  .mobile-bottom-nav {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: var(--vp-c-bg);
    border-top: 1px solid var(--vp-c-divider);
    padding: 6px 0;
    padding-bottom: calc(6px + env(safe-area-inset-bottom, 0px));
    justify-content: space-around;
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.06);
  }

  .bottom-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none !important;
    border: none !important;
    padding: 4px 6px;
    border-radius: 8px;
    min-width: 48px;
    -webkit-tap-highlight-color: transparent;
    transition: background 0.15s;
  }

  .bottom-nav-item:active {
    background: var(--vp-c-brand-soft);
  }

  .bottom-nav-emoji {
    font-size: 1.2rem;
    line-height: 1.4;
  }

  .bottom-nav-label {
    font-size: 0.6rem;
    color: var(--vp-c-text-3);
    line-height: 1.2;
    margin-top: 1px;
  }

  .bottom-nav-item.active .bottom-nav-label {
    color: var(--vp-c-brand-1);
    font-weight: 600;
  }

  .bottom-nav-item.active {
    background: var(--vp-c-brand-soft);
  }
}
</style>
