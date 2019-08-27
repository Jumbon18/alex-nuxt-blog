<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <h1 class="mb">Создать новый пост</h1>

    <el-form-item label="Введите название поста" prop="title">
      <el-input
        type="text"
        v-model="controls.title"
      />
    </el-form-item>
    <el-form-item label="Текст в формате .md или .html" prop="text">
      <el-input
        type="textarea"
        resize="none"
        :rows="10"
        v-model="controls.text"/>
    </el-form-item>

    <el-dialog
      title="Предпросмотр"
      :visible.sync="previewDialog">
      <div :key="controls.text">
        <vue-markdown> {{controls.text}}</vue-markdown>
      </div>
    </el-dialog>

    <el-upload
      drag
      ref="upload"
      class="mb"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleImageChange"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Перетащите картинку <em>или нажмите</em></div>
      <div class="el-upload__tip" slot="tip">Файлы с расширение jpg/png</div>
    </el-upload>

    <el-button
      type="success"
      plain
      class="mb"
      @click="previewDialog = !previewDialog"
    >Предпросмотр
    </el-button>
    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        :loading="loading"
      >Создать
      </el-button>
    </el-form-item>

  </el-form>
</template>

<script>
    export default {
        name: "create",
        layout: 'admin',
        head:{
            title:`Новый пост | ${process.env.appName}`
        },
        data: () => ({
            previewDialog: false,
            image:null,
            controls: {
                title: '',
                text: ''
            },
            loading: false,
            rules: {
                text: [
                    {required: true, message: 'Текст не должен быть пустым', trigger: 'blur'}
                ],
                title: [
                    {required: true, message: 'Название поста не может быть пустым', trigger: 'blur'}
                ]
            }
        }),
        methods: {
            handleImageChange(file, fileList) {
                console.log(file);
                this.image = file.raw;
            },
            onSubmit() {
                this.$refs.form.validate(async valid => {
                    if (valid && this.image) {
                        this.loading = true;
                        const formData = {
                            title: this.controls.title,
                            text: this.controls.text,
                            image:this.image
                        };
                        try {
                            await this.$store.dispatch('post/create', formData);
                            this.controls.text = '';
                            this.controls.title = '';
                            this.image = null;
                            this.$refs.upload.clearFiles();
                            this.$message.success('Пост создан');
                            this.loading = false;
                        } catch (e) {

                        }
                    }else{
                        this.$message.warning('Форма не валидна')
                    }
                })
            }
        }
    }
</script>

<style scoped>
  form {
    width: 600px;
  }
</style>
