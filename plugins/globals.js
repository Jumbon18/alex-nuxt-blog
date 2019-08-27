import Vue from 'vue'
import Element from 'element-ui/lib/element-ui.common'
import VueMarkdown from 'vue-markdown'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import DateFilter from '~/common/date.filter'

  Vue.use(Element, { locale });
Vue.component('vue-markdown',VueMarkdown);
Vue.filter('date',DateFilter);
