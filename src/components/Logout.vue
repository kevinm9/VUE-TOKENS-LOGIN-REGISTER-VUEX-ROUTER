<template>
  <div class="px-4 py-5 my-5 text-center">
    <div class="col-lg-6 mx-auto">
      <div class="hollow-dots-spinner mx-auto">
        <div class="dot" />
        <div class="dot" />
        <div class="dot" />
      </div>
    </div>
    <h1 class="display-5 fw-bold text-body-emphasis">
      saliendo del sistema
    </h1>
  </div>
</template>

<script>
export default {
    name: "UserLogout",
    mounted() {
        this.logout();
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout').then(
                () => {
                    this.$router.push("login");
                },
                error => {
                    this.$router.push("login");
                    console.log(error);
                }
            )
        }
    }
};
</script>
<style >
.hollow-dots-spinner,
.hollow-dots-spinner * {
    box-sizing: border-box;
}

.hollow-dots-spinner {
    height: 50px;
    width: calc(75px * 3);
}

.hollow-dots-spinner .dot {
    width: 50px;
    height: 50px;
    margin: 0 calc(15px / 2);
    border: calc(15px / 5) solid #007bff;
    border-radius: 50%;
    float: left;
    transform: scale(0);
    animation: hollow-dots-spinner-animation 1000ms ease infinite 0ms;
}

.hollow-dots-spinner .dot:nth-child(1) {
    animation-delay: calc(300ms * 1);
}

.hollow-dots-spinner .dot:nth-child(2) {
    animation-delay: calc(300ms * 2);
}

.hollow-dots-spinner .dot:nth-child(3) {
    animation-delay: calc(300ms * 3);

}

@keyframes hollow-dots-spinner-animation {
    50% {
        transform: scale(1);
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>
  