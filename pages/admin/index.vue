<template>
  <div>
    <h1>Аналитика по постам</h1>
    <app-analytics-chart
      title="Количество просмотров"
      :labels="views.labels"
      :data="views.data"
    />
    <app-analytics-chart
      title="Количество комментариев"
      :labels="comments.labels"
      :data="comments.data"
    />
  </div>
</template>

<script>
    import AppAnalyticsChart from '~/components/admin/AnalyticChart'

    export default {
        name: "index",
        layout: 'admin',
        head:{
            title:`Аналитика | ${process.env.appName}`
        },

        components: {
            AppAnalyticsChart
        },
        async asyncData({store}) {
            const {views, comments} = await store.dispatch('post/getAnalytic');
            return {views, comments};
        }
    }
</script>

<style scoped lang="scss">

</style>
