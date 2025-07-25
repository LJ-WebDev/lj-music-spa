import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ReleasesView from '../views/ReleasesView.vue';
import test from '../components/test.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    {
      path: '/',
      name: 'releases',
      component: ReleasesView,
    },
    {
      path: '/test',
      name: 'test',
      component: test,
    },
  ],
});

export default router;
