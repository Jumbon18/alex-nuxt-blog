<template>
  <el-table
    :data="posts"
    style="width: 100%">
    <el-table-column
      prop="title"
      label="Название"
    />
    <el-table-column
      label=Дата
      width="180">
      <template slot-scope="{row:{date}}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{date | date('date')}}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="Просмотры"
    >
      <template slot-scope="{row:{views}}">
        <i class="el-icon-view"></i>
        <span style="margin-left: 10px">{{views}}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="Комментарии"
    >
      <template slot-scope="{row:{comments}}">
        <i class="el-icon-message"></i>
        <span style="margin-left: 10px">{{comments.length}}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="Действия">
      <template slot-scope="{row}">
        <el-tooltip effect="dark" content="Открыть пост" placement="top">
          <el-button
            icon="el-icon-edit"
            circle
            type="primary"
            @click="open(row._id)"
          />
        </el-tooltip>

        <el-tooltip effect="dark" placement="top" content="Удалить пост">
          <el-button
            icon="el-icon-delete"
            type="danger"
            circle
            @click="remove(row._id)"/>
        </el-tooltip>

      </template>
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "list",
        layout: 'admin',
        head:{
            title:`Все посты | ${process.env.appName}`
        },
        async fetch({store}) {
            await store.dispatch('post/fetchAdmin');
        },

        computed: {
            posts() {
                return this.$store.getters['post/adminPosts'];
            }
        },
        methods: {
            open(id) {
                this.$router.push(`/admin/post/${id}`);
            },
            async remove(id) {
                try {
                    const confirm = await this.$confirm('Удалить пост ?', 'Внимание!', {
                        confirmButtonText: 'Ok',
                        cancelButtonText: 'Отменить',
                        type: "warning"
                    });
                    await this.$store.dispatch('post/remove', id);

                    this.$message.success('Пост успешно удален');
                } catch (e) {

                }
            }
        }

    }
</script>

<style scoped>

</style>
