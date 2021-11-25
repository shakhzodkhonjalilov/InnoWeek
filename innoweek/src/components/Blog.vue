<template>
  <div class="container">
    <div class="blog__headpost">
      <div class="blog__post-img">
        <img :src="headPost.img" alt />
      </div>
      <div class="blog__headpost-text">
        <div>
          <h3>{{ headPost.title }}</h3>
          <p>{{ headPost.content }}</p>
        </div>

        <a :href="headPost.link" target="_blank" class="btn">{{ details }}</a>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6" v-for="post in posts" :key="post.id">
        <div class="blog__post">
          <div class="blog__post-img">
            <img :src="post.img" alt />
          </div>
          <a :href="post.link" target="_blank" class="blog__post-link">{{
            post.title
          }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { details: String },
  data() {
    return {
      headPost: {},
      posts: []
    };
  },
  methods: {
    async fetchPost() {
      try {
        const res = await fetch("https://blog.innoweek.uz/index.php/todo");
        const data = await res.json();
        const posts = data.$data;
        Object.values(posts)
          .sort((a, b) => b.id - a.id)
          .map((el, idx) => {
            let post = {};
            // REGEXP
            let imgREG = /\(([^)]+)\)/,
              linkREG = '"(.*?)"',
              tagREG = /(<(\/?[^>]+)>)/g;

            // Create image link
            el.excerpt.replace(imgREG, (match, name) => {
              post.img = `https://blog.innoweek.uz/${name}`;
            });

            let link = el.title.match(linkREG);
            post.link = link
              ? link[1]
              : `https://blog.innoweek.uz/index.php${el.url}`;

            let title = el.title.replace(tagREG, "").split(" ");
            post.title =
              title.length > 7
                ? title.splice(0, 7).join(" ") + "..."
                : title.join(" ");

            if (idx === 0) {
              this.headPost = {
                ...post,
                title: el.title.replace(tagREG, "")
              };
              this.headPost.content = el.excerpt.split("\n")[1];
            } else if (idx < 5) {
              this.posts.push(post);
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.fetchPost();
  }
};
</script>

<style></style>
