import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Layout from './Layout.vue'
import ChecklistTable from './ChecklistTable.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ChecklistTable', ChecklistTable)
  },
}
