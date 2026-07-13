---
title: 附录：Notion Database Schema
---

# Notion Database Schema

如需在Notion中构建可筛选的数据库视图，请使用以下属性结构：

| 属性名 | 类型 | 选项值 |
|--------|------|--------|
| `item_name` | Title | — |
| `stage` | Select | Pre-Natal / 0-6M / 6-12M / 1-3Y / 3-5Y |
| `user` | Select | Mother / Child / Both |
| `attribute` | Select | Safety-Core / Convenience-Boost / Emotional-Dopamine / Development-Algorithm / Dopamine-Reserve |
| `verdict` | Select | Essential / Conditional / Cognitive-Tax |
| `brand_tier1` | Text | 全球TOP推荐品牌 |
| `brand_domestic` | Text | 国产对冲方案 |
| `buy_at_price` | Number | 稳健买入价(CNY) |
| `best_timing` | Select | 双11 / 618 / 随时 / 清仓期 / 百亿补贴 |
| `evidence_source` | Multi-Select | AAP / WHO / CDC / NHS / CPSC / AAPD |
| `causal_chain` | Text | 因果链简述 |
| `residual_value` | Text | 二手残值率 |

::: tip 使用建议
1. 在Notion中创建Database，按上表建立属性
2. 将本看板各表格数据录入
3. 利用Filter视图按 `stage` 或 `verdict` 筛选，快速定位当前阶段的必买清单
4. 利用Sort按 `buy_at_price` 排序，规划预算
:::
