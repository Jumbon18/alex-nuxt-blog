<template>
  <div class="page-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/admin/list">Посты</el-breadcrumb-item>
      <el-breadcrumb-item>{{post.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <!--
          <h2>Войти в панель администратора</h2>
      -->

      <el-form-item label="Текст в формате .md или .html" prop="text">
        <el-input
          type="textarea"
          resize="none"
          :rows="10"
          v-model="controls.text"/>
      </el-form-item>

      <div class="mb">
        <small class="mr">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">   {{post.date | date}}</span>
        </small>
        <small>
          <i class="el-icon-view"></i>
          <span>{{post.views}}</span>
        </small>
      </div>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          :loading="loading"
        >Обновить
        </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
    export default {
        name: "_id",
        head(){
            return {
                title:`${this.post.title} | ${process.env.appName}`
            }
        },
        validate({params}) {
            return !!params.id
        },
        layout: 'admin',
        async asyncData({store, params}) {

            if(store.getters['post/adminPosts'].length <= 0){
                await  store.dispatch('post/fetchAdmin');
            }
            const post = await store.dispatch('post/fetchAdminById', params.id);
            return {post}
        },
        data: () => ({
            controls: {
                text: ''
            },
            loading: false,
            rules: {
                text: [
                    {required: true, message: 'Текст не должен быть пустым', trigger: 'blur'}
                ]
            }
        }),
        mounted(){
          this.controls.text = this.post.text;
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        this.loading = true;
                        const formData = {
                            text: this.controls.text,
                            id: this.post._id
                        };
                        try {
                            await this.$store.dispatch('post/update', formData);
                            this.$message.success('Пост обновлен');
                      this.loading = false;
                        } catch (e) {
                      this.loading = false;
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>
  .page-wrap {
    width: 600px;
  }

  .mr {
    margin-right: 2rem;
  }
</style>
