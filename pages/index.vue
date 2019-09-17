<template>

  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <app-post
        v-for="post in posts"
        :post="post"
        :key="post.title"
      />
    </el-col>

  </el-row>

</template>

<script>
    import AppPost from '~/components/main/Post';

    export default {
        head: {
            title: `Главная | ${process.env.appName}`,
            meta:[
                {hid:'homepaged',name:'description',content:'Самый лучший js блог'},
                {hid:'homepagek',name:'keywords',content:'блог, js, nuxt'}
            ]
        },
        async fetch({store}) {
            await store.dispatch('post/fetch');
        },
        computed: {
            posts() {
                return this.$store.getters['post/allPosts']
            }
        },
        components: {
            AppPost
        }
    }
</script>

<style scoped>
  .test {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
