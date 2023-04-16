<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <form class="bg-white p-6 rounded-lg shadow-md" @submit.prevent="login">
      <h2 class="text-2xl font-medium mb-4">Login</h2>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="email">
          Email
        </label>
        <input
          v-model.trim="email"
          :class="{ 'border-red-500': emailError }"
          @blur="validateEmail"
          class="w-full border border-gray-400 py-2 px-3 rounded-lg focus:outline-none focus:border-blue-500"
          type="email"
          id="email"
          name="email"
          required
        />
        <p v-if="emailError" class="text-red-500 mt-1">{{ emailError }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="password">
          Password
        </label>
        <input
          v-model.trim="password"
          :class="{ 'border-red-500': passwordError }"
          @blur="validatePassword"
          class="w-full border border-gray-400 py-2 px-3 rounded-lg focus:outline-none focus:border-blue-500"
          type="password"
          id="password"
          name="password"
          required
        />
        <p v-if="passwordError" class="text-red-500 mt-1">
          {{ passwordError }}
        </p>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg w-full"
        type="submit"
        :disabled="formError || formSend"
      >
        Login
      </button>

      <div v-if="formHttpError!=''" class="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong class="font-bold">Error:</strong>
  <span class="block sm:inline">{{formHttpError}}</span>
</div>
  
    </form>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: false,
});

const cookie = useCookie("token")
console.log("cookie", cookie)
const email = ref("");
const password = ref("");

const emailError = ref("");
const passwordError = ref("");

const formError = computed(() => !!emailError.value || !!passwordError.value);
const formSend = ref(false);
const formHttpError = ref("")
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
    formSend.value = true
    const params = {
      email: email.value,
      password: password.value,
    };
    const response = await useAsyncData(async () => {
      return await $fetch(urlApi+"/auth/login", {
        method: "POST",
        body: params,
      });
    });
    console.log("response", response);
    formSend.value = false
    if (response.error.value) {
        // @ts-ignore. 
      const { data } = response.error.value;
      console.log("error:", data);
      formHttpError.value = data.message
    }else{
      const  data  = response.data.value;
      cookie.value = JSON.stringify(data)
      console.log("es correcto avanzamos ")
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
