<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  stage: String,
  categories: Array
})

const checked = ref(new Set())
const storageKey = computed(() => `baby-guide-${props.stage}`)

onMounted(() => {
  try {
    const saved = localStorage.getItem(storageKey.value)
    if (saved) checked.value = new Set(JSON.parse(saved))
  } catch {}
})

function toggle(id) {
  const s = new Set(checked.value)
  if (s.has(id)) s.delete(id)
  else s.add(id)
  checked.value = s
  try {
    localStorage.setItem(storageKey.value, JSON.stringify([...s]))
  } catch {}
}

function resetAll() {
  if (confirm('确定清空所有勾选吗？')) {
    checked.value = new Set()
    try { localStorage.removeItem(storageKey.value) } catch {}
  }
}

const allIds = computed(() => new Set(props.categories.flatMap(c => c.items.map(i => i.id))))
const totalItems = computed(() => allIds.value.size)
const checkedCount = computed(() => [...checked.value].filter(id => allIds.value.has(id)).length)
const progress = computed(() => totalItems.value ? Math.round(checkedCount.value / totalItems.value * 100) : 0)

function catChecked(cat) {
  return cat.items.filter(i => checked.value.has(i.id)).length
}

const pClass = { essential: 'p-essential', conditional: 'p-conditional', optional: 'p-optional' }
const pLabel = { essential: '必备', conditional: '按需', optional: '可选' }
</script>

<template>
  <div class="cl-wrap">
    <div class="cl-header">
      <div class="cl-top">
        <span class="cl-title">📋 采购清单</span>
        <span class="cl-count">{{ checkedCount }} / {{ totalItems }}</span>
        <button v-if="checkedCount > 0" class="cl-reset" @click="resetAll">重置</button>
      </div>
      <div class="cl-bar"><div class="cl-fill" :style="{ width: progress + '%' }"></div></div>
      <p class="cl-hint">💡 勾选数据保存在本设备浏览器中，无需登录，每人独立</p>
    </div>
    <div v-for="cat in categories" :key="cat.name" class="cl-cat">
      <div class="cl-cat-head">
        <span>{{ cat.emoji }} {{ cat.name }}</span>
        <span class="cl-cat-count">{{ catChecked(cat) }}/{{ cat.items.length }}</span>
      </div>
      <table class="cl-table">
        <thead>
          <tr>
            <th class="col-ck"></th>
            <th class="col-name">物品</th>
            <th class="col-spec">数量</th>
            <th class="col-brand">推荐品牌</th>
            <th class="col-price">参考价</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cat.items" :key="item.id"
              :class="{ 'row-done': checked.has(item.id) }"
              @click="toggle(item.id)">
            <td class="col-ck">
              <div class="ck-box" :class="{ active: checked.has(item.id) }">
                <svg v-if="checked.has(item.id)" viewBox="0 0 16 16" class="ck-icon"><path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
            </td>
            <td class="col-name">
              <span class="item-name">{{ item.name }}</span>
              <span class="p-badge" :class="pClass[item.priority]">{{ pLabel[item.priority] }}</span>
              <span v-if="item.note" class="item-note">{{ item.note }}</span>
            </td>
            <td class="col-spec">{{ item.spec }}</td>
            <td class="col-brand">{{ item.brands }}</td>
            <td class="col-price">{{ item.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.cl-wrap {
  margin: 1.5rem 0;
}

.cl-header {
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
  margin-bottom: 1.5rem;
}

.cl-top {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.6rem;
}

.cl-title {
  font-family: 'LXGW WenKai Screen', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.cl-count {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.cl-reset {
  margin-left: auto;
  padding: 0.25rem 0.7rem;
  font-size: 0.78rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: all 0.15s;
}
.cl-reset:hover {
  border-color: var(--vp-c-danger-1);
  color: var(--vp-c-danger-1);
}

.cl-bar {
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  overflow: hidden;
}
.cl-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-sage), #a8c09e);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.cl-hint {
  margin: 0.6rem 0 0;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.cl-cat {
  margin-bottom: 1.5rem;
}

.cl-cat-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0;
  font-family: 'LXGW WenKai Screen', serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border-bottom: 2px solid var(--vp-c-brand-soft);
  margin-bottom: 0;
}

.cl-cat-count {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  font-family: 'Inter', sans-serif;
}

.cl-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
  table-layout: fixed;
  box-shadow: none !important;
  border-radius: 0 !important;
}

.cl-table thead th {
  background: var(--vp-c-bg-soft) !important;
  color: var(--vp-c-text-2) !important;
  font-weight: 500;
  font-size: 0.78rem;
  padding: 0.5rem 0.6rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
  letter-spacing: 0.02em;
}

.cl-table tbody tr {
  cursor: pointer;
  transition: background 0.15s;
  -webkit-tap-highlight-color: transparent;
}
.cl-table tbody tr:hover {
  background: var(--vp-c-brand-soft) !important;
}
.cl-table tbody tr:active {
  background: rgba(196, 149, 106, 0.18) !important;
}

.cl-table td {
  padding: 0.6rem;
  border-bottom: 1px solid var(--vp-c-divider);
  vertical-align: top;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.row-done td {
  opacity: 0.5;
}
.row-done .item-name {
  text-decoration: line-through;
}

.col-ck { width: 36px; text-align: center; }
.col-name { width: 35%; }
.col-spec { width: 12%; }
.col-brand { width: 30%; }
.col-price { width: 15%; }

.ck-box {
  width: 20px;
  height: 20px;
  border: 2px solid var(--vp-c-text-3);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  margin: 0 auto;
}
.ck-box.active {
  background: var(--color-sage);
  border-color: var(--color-sage);
}
.ck-icon {
  width: 14px;
  height: 14px;
  color: #fff;
}

.item-name {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.p-badge {
  display: inline-block;
  padding: 0.1rem 0.4rem;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 600;
  margin-left: 0.4rem;
  vertical-align: middle;
  letter-spacing: 0.02em;
}
.p-essential { background: var(--color-sage); color: #fff; }
.p-conditional { background: var(--color-amber); color: #fff; }
.p-optional { background: var(--vp-c-text-3); color: #fff; }

.item-note {
  display: block;
  font-size: 0.76rem;
  color: var(--vp-c-text-3);
  margin-top: 0.2rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .cl-header {
    padding: 1rem;
  }

  .cl-table {
    font-size: 0.82rem;
  }

  .col-spec { display: none; }
  .cl-table thead th.col-spec { display: none; }

  .col-ck { width: 32px; }
  .col-name { width: auto; }
  .col-brand { width: 30%; }
  .col-price { width: 18%; }

  .cl-table td {
    padding: 0.5rem 0.4rem;
  }

  .ck-box {
    width: 22px;
    height: 22px;
  }

  .p-badge {
    font-size: 0.6rem;
    padding: 0.08rem 0.35rem;
  }
}

@media (max-width: 480px) {
  .col-brand { display: none; }
  .cl-table thead th.col-brand { display: none; }
  .col-name { width: auto; }
  .col-price { width: 22%; }
}
</style>
