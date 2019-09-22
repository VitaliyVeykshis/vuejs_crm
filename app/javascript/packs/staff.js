import Vue from 'vue';

import 'bootstrap/dist/css/bootstrap.min.css';

import iconSet from 'quasar/icon-set/fontawesome-v5';
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css';

import '../shared/assets/styles/quasar.styl';
import 'quasar/dist/quasar.ie.polyfills';

import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
} from 'quasar';

import '../shared/utils/filters';
import api from '../staff/backend/api';
import Staff from '../staff/staff.vue';

require('../staff/channels');

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
  },
  directives: {
  },
  iconSet: iconSet,
  plugins: {
  },
});

Vue.prototype.$api = api;

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    render: (h) => h(Staff),
  }).$mount();
  document.body.appendChild(app.$el);
});
