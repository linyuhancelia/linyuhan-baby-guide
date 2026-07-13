---
layout: home

hero:
  name: 小宇宙成长手册
  text: 0-5岁循证育儿指南
  tagline: 拒绝智商税与育儿焦虑，用科学和好品味陪你走过最温柔的五年
  actions:
    - theme: brand
      text: 从孕期开始 →
      link: /stages/prenatal
    - theme: alt
      text: 阅读指南
      link: /guide/
---

<script setup>
import { withBase } from 'vitepress'

const stages = [
  { emoji: '🤰', title: '孕期准备', desc: '叶酸 · 产检 · 待产包 · 给自己的多巴胺清单', link: '/stages/prenatal' },
  { emoji: '👶', title: '0-3M · 感官校准期', desc: '趴着 · 看脸 · 听说话 · 被抱着 — 最简单也最重要的事', link: '/stages/0-3m' },
  { emoji: '🙌', title: '3-6M · 运动萌芽期', desc: '第一次翻身 · 小手抓住世界 · 咿呀对话开始了', link: '/stages/3-6m' },
  { emoji: '🚀', title: '6-12M · 移动革命期', desc: '用爬行征服客厅 · 躲猫猫 · 第一口辅食的惊喜', link: '/stages/6-12m' },
  { emoji: '🗣️', title: '1-3Y · 语言爆发期', desc: '从 mama 到十万个为什么 · 绘本 · 泥巴 · 踩水坑', link: '/stages/1-3y' },
  { emoji: '🧩', title: '3-5Y · 执行功能期', desc: '桌游 · 运动 · 户外两小时 · 和小朋友的江湖', link: '/stages/3-5y' },
]
</script>

<div class="timeline-section">
  <h2 class="timeline-title">🗺️ 成长地图</h2>
  <p class="timeline-subtitle">每个阶段都是一个小宇宙，点击探索装备清单与发展里程碑</p>

  <div class="timeline">
    <div class="timeline-item" v-for="s in stages" :key="s.link">
      <div class="timeline-marker">{{ s.emoji }}</div>
      <a class="timeline-content" :href="withBase(s.link)">
        <h3>{{ s.title }}</h3>
        <p>{{ s.desc }}</p>
        <span class="timeline-link">查看详情 →</span>
      </a>
    </div>
  </div>
</div>

<div class="home-quote">
  <p class="quote-main">为追求生活质感的未来父母，量身调优的育儿手册</p>
  <p class="quote-sub">所有推荐基于 AAP · WHO · CDC · NHS · CPSC 循证指南<br>价格数据来自 2024-2026 年中国市场公开记录</p>
  <div class="share-hint">
    <p>💌 觉得有用？点右上角 <strong>···</strong> 转发给需要的朋友</p>
  </div>
</div>
