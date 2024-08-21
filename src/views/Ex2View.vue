  <template>
    <div>
      <div class="mb-3">
        <h2>Sign up</h2>

        <div class="mb-3">
          <label for="signup-email" class="form-label">Email</label>
          <input type="email" class="form-control" id="signup-email" v-model="signupField.email">
        </div>
        <div class="mb-3">
          <label for="signup-password" class="form-label">Password</label>
          <input type="password" class="form-control" id="signup-password" v-model="signupField.password">
        </div>
        <div class="mb-3">
          <label for="nickname" class="form-label">NickName</label>
          <input type="text" class="form-control" id="nickname" v-model="signupField.nickname">
        </div>
        <button type="button" @click="signUp" class="btn btn-primary mb-3">確定</button>
        <p>signupField: {{ signupField }}</p>
        <p>signup UID: {{ signupRes }}</p>
      </div>

      <hr>

      <div class="mb-3">
        <h2>Sign In</h2>
        <div class="mb-3">
          <label for="signIn-email" class="form-label">Email</label>
          <input type="email" class="form-control" id="signIn-email" v-model="signInField.email">
        </div>
        <div class="mb-3">
          <label for="signIn-password" class="form-label">Password</label>
          <input type="password" class="form-control" id="signIn-password" v-model="signInField.password">
        </div>
        <button type="button" @click="signIn" class="btn btn-warning mb-3 me-2">登入</button>
        <button type="button" @click="signOut" class="btn btn-danger mb-3">登出</button>
        <p>signInField: {{ signInField }}</p>
        <p>signIn UID: {{ signInRes }}</p>
        <p>登入狀態: <span v-if="token !== ''">己登入</span> <span v-else>未登入</span></p>
      </div>

      <hr>

    </div>
  </template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const api = "https://todolist-api.hexschool.io";

const msg = ref("");
const token = ref("");
const signupRes = ref("");
const signInRes = ref("");
const signupField = ref({
  email: "",
  password: "",
  nickname: "",
});
const signInField = ref({
  email: "",
  password: "",
});


const signUp = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_up`, signupField.value);
    console.log(res);
    signupRes.value = res.data.uid;
  } catch (err) {
    console.log(err.response.data.message); 
  }
}

const signIn = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_in`, signInField.value);
    console.log(res);
    signInRes.value = res.data.token;
    document.cookie = `Vue30daysCookie=${res.data.token}; expires=${new Date(res.data.exp * 1000)}; path=/`;
    token.value = signInRes.value;
    console.log("Token: ", token.value);
  } catch (err) {
    console.log(err.response.data.message);
  }
  const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)Vue30daysCookie\s*=\s*([^;]*).*$)|^.*$/,"$1",);
  console.log(cookie);
}

const signOut = async () => {
  try {
    const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)Vue30daysCookie\s*=\s*([^;]*).*$)|^.*$/,"$1",);
    const res = await axios.post(`${api}/users/sign_out`, {}, {
      headers: {
        Authorization: cookie
      }
    });
    document.cookie = `Vue30daysCookie=; max-age=0; path=/;`
    token.value = "";
    console.log("Token: ", token.value);
    console.log(res);
    msg.value = res.data.message
  } catch (error) {
    console.log(error);
  }
  // console.log("signOut");
  
}

onMounted(async() => {
  token.value = document.cookie.replace(/(?:(?:^|.*;\s*)Vue30daysCookie\s*=\s*([^;]*).*$)|^.*$/,"$1",);
  
  try {
    const res = await axios.get(`${api}/users/checkout`, {
      headers: {
        Authorization: `${token.value}`
      }
    });
    console.log(res);
  } catch (error) {
    console.log(error.response.data.message);
  }
});

</script>


<style scoped></style>
