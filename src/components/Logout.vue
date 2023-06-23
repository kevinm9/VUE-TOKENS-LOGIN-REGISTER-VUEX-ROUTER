<script>
import AuthService from '../services/auth.service';
export default {
    name: "user-logout",
    methods: {
        logout() {
            AuthService.logoutapi().then(response => {
                console.log(response);
                //response.data.data;
            })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.logout();
    }
};
</script>
  