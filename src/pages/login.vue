<template>
  <div class="wrapper-login">
    <img
      src="~/assets/playground_assets/rectangle31705-7psw.svg?url"
      alt="Rectangle31705"
      class="home-rectangle3"
      style="width: 100%; position: absolute; bottom: 0"
    />

    <div class="container-login">
      <div class="sub-container">
        <div class="loginHeader flex justify-start items-center">
          <img
            src="~/assets/playground_assets/lider-login.png?url"
            alt=""
            class="logoImg"
          />
          <img
            src="~/assets/playground_assets/lider1705-c4p7i.svg?url"
            alt="logoText"
          />
        </div>

        <div class="loginForm pt-10 pl-6 pr-6 pb-10 mt-8 shadow-sm">
          <form @submit.prevent="login">
            <h2>Welcome back</h2>
            <p class="mt-2">Login in to your account</p>
            <div class="mb-6 mt-6">
              <label for="email">Email address</label>
              <input
              v-model.trim="email"
                type="email"
                id="email"
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
                placeholder="Enter email address"
                :class="{ 'border-red-500': emailError }"
          @blur="validateEmail"
          required
              />
              <p v-if="emailError" class="text-red-500 mt-1">{{ emailError }}</p>
            </div>
            <div class="mb-6 mt-6">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
                placeholder="Enter password"
                name="password"
                v-model.trim="password"
          :class="{ 'border-red-500': passwordError }"
          @blur="validatePassword"
                required
              />
              <p v-if="passwordError" class="text-red-500 mt-1">
          {{ passwordError }}
        </p>
            </div>
            <div class="flex items-center">
              <input
                v-model="checkRememberMe"
                id="checked-checkbox"
                type="checkbox"
                class="w-4 h-4 text-blue-600 rounded accent-[#665AEC]"
          
              />
              <label
                for="checked-checkbox"
                class="ml-2 text-sm font-medium text-gray-900"
                >Remember me</label
              >
            </div>
            <button
              type="submit"
              style="width: 100%"
              class="text-white bg-[#665AEC] hover:bg-[#5d54c5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm sm:w-auto px-5 py-2.5 text-center mt-6"
              :disabled="formError || formSend"
              >
              Submit
            </button>
            <div v-if="formHttpError!=''" class="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong class="font-bold">Error:</strong>
  <span class="block sm:inline">{{formHttpError}}</span>
</div>
          </form>
        </div>
      </div>
      <div class="loginFooter flex justify-between items-center mt-6">
        <span>© Lider</span>
        <div class="flex justify-between">
          <a href="#" class="mr-4">Contact</a>
          <a href="#">Privacy and conditions</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({
  title: 'Lider | Login',
  meta: [
    { name: 'description', content: 'Login page.' }
  ],
})

const cookie = useCookie("token");
const cookieGraphql = useCookie("tokenGraphql");
const rememberMe = useCookie("rememberMe");

//console.log("cookie", cookie)
const email = ref("");
const password = ref("");

if(rememberMe.value){
  let cookieRemember:any = rememberMe.value
    console.log("existe la cookie",rememberMe.value)
    email.value = cookieRemember.email
    password.value = cookieRemember.password
}
const checkRememberMe = ref(true);
const emailError = ref("");
const passwordError = ref("");

const formError = computed(() => !!emailError.value || !!passwordError.value);
const formSend = ref(false);
const formHttpError = ref("");
const router = useRouter();

const validateEmail = () => {
  if (!email.value) {
    emailError.value = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    emailError.value = "Invalid email address";
  } else {
    emailError.value = "";
  }
};

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = "Password is required";
  } else if (password.value.length < 8) {
    passwordError.value = "Password must be at least 8 characters long";
  } else {
    passwordError.value = "";
  }
};

const login = async () => {
  validateEmail();
  validatePassword();

  if (!formError.value) {
    formSend.value = true;
    const params = {
      email: email.value,
      password: password.value,
    };
    const response = await useAsyncData(async () => {
      return await $fetch(urlApi + "/auth/login", {
        method: "POST",
        body: params,
      });
    });
    console.log("response", response);
    formSend.value = false;
    if (response.error.value) {
      // @ts-ignore.
      const { data } = response.error.value;
      console.log("error:", data);
      formHttpError.value = data.message;
    } else {
      const data = response.data.value;
      cookie.value = JSON.stringify(data);
      //@ts-ignore
      cookieGraphql.value = 'Bearer '+data.token
      if(checkRememberMe.value==true){
        rememberMe.value = JSON.stringify(params);
      }else{
        rememberMe.value=null
      }
      console.log("es correcto avanzamos ");
      router.push("/");
    }

    /*
me falta poner el loader , aunq mejor lo  q hago es pasar a inactivo los inputs y cambio el color del boton
y luego pasar al index y luego hacer el guard para q no se pueda entrar a menos q este logueado 
tanto en el front como en el back 
    */
    /*
    if (data?.status === 200) {
      router.push("/");
    } else {
      console.error(response?.statusText);
    }*/
  }
};
</script>
