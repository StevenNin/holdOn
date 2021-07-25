<template>
  <div id="index">
    <section class="blog-posts">
      <router-link class="item" :to="`/detail/${blog.id}`" v-for="blog in blogs" :key=blog.id >
        <figure class="avatar">
          <img :src="blog.user.avatar" :alt="blog.user.username" :to="`/user/${blog.user.userId}`">
          <figcaption>{{blog.user.username}}</figcaption> 
        </figure>
        <h3>{{blog.title}} <span> {{friendlyDate(blog.createdAt)}}</span></h3> 
        <p>{{blog.description}}</p>
      </router-link>
    </section>
    <section class="pagination">
      <el-pagination :current-page.sync="currentPage" @current-change="onPageChange" small layout="prev, pager, next" :total="total"></el-pagination>
    </section>
  </div>
</template>

<script src="./template.js"></script>

<style scoped lang="less" src="./template.less"></style>
