export default defineNuxtRouteMiddleware(async (to, from) => {
  
  console.log("to", to);
  console.log("from,", from);
  if(to.name!="login"){
    const cookie = useCookie("token");
  if(!cookie.value){
    console.log("enviar a login");
    return navigateTo("/login");
  }
  const router = useRouter();
    console.log("cookie", cookie.value);
    // @ts-ignore
    const token = cookie.value.token;

    const response = await useAsyncData(async () => {
      return await $fetch(urlApi+"/auth/checkToken", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    });
    if (response.error.value) {
      console.log("enviar a login");
      return navigateTo("/login");
    }
    console.log("puede entrar a la ruta ");
    
    if(to.name=="settings"){
     
      return router.push({name: "settings-user-profile"})
    }

    const routeName:any = to.name;
    let bgBody = "#FFFFFF"
    if(routeName.includes("settings")){ 
      bgBody = "#FCFCFC"
    }
    if (process.client) {
      document.body.style.backgroundColor = bgBody;
    }
    
    return true;
    
  }
  

});


