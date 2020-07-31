import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

function page(path) {
  return () => import(`../views/${path}`).then((m) => m.default || m);
}

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: page('static/Home.vue') },
    { path: '/posts/:userId?', name: 'posts', component: page('posts/Posts.vue') },
    { path: '/post/:id', name: 'post', component: page('posts/Post.vue') },
    { path: '/registration', name: 'registration', component: page('auth/Auth.vue') },

    { path: '*', component: page('static/NotFound.vue') },
  ],
});
