<template>
  <div class="cookie-button-container" @click="incrementCookies">
    <img src="@/assets/putin.png" alt="Cookie" class="cookie-image" :class="{ 'rotate': isRotating }" />
  </div>
</template>

<script>
export default {
  name: 'CookieButton',
  data() {
    return {
      isRotating: false,
    };
  },
  methods: {
    incrementCookies() {
      this.$emit('cookie-increment');
      this.rotateImage();
    },
    rotateImage() {
      this.isRotating = true;
      setTimeout(() => {
        this.isRotating = false;
      }, 1000); // Désactive la rotation après 1 seconde
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
  width: 250px;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}

.cookie-image:hover {
  transform: scale(1.1);
}

/* Animation de rotation */
.rotate {
  animation: rotate360 0.5s linear;
}

@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
