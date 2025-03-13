<template>
  <div class="cookie-button-container" @click="incrementCookies">
    <img src="@/assets/cookie.jpg" alt="Cookie" class="cookie-image" />
  </div>
</template>

<script>
export default {
  name: 'CookieButton',
  methods: {
    incrementCookies() {
      this.$emit('cookie-increment');
    },
  },
};
</script>

<style scoped>
.cookie-button-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.cookie-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}

.cookie-image:hover {
  transform: scale(1.1);
}
</style>
