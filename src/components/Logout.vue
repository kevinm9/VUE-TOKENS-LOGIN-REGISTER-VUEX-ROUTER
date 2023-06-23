<script>
export default {
    name: "user-logout",
    methods: {
        logout() {
            this.$store.dispatch('auth/logout').then(
                () => {
                    this.$router.push("login");
                },
                error => {
                    console.log(error);
                }
            );
        }
    },
    mounted() {
        this.logout();
    }
};
</script>
  