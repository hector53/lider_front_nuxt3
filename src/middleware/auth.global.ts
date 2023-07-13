import * as jose from "jose";
import { env } from "process";
export default defineNuxtRouteMiddleware(async (to, from) => {
  //  console.log("to", to);
  // console.log("from,", from);
  let rutasUser = ['index', 'wallet_user', 'withdraws_user', 'settings', 'settings-user-profile', 'settings-settings' ]
  if (to.name != "login") {
    const cookie = useCookie("token");
    if (!cookie.value) {
      console.log("enviar a login");
      return navigateTo("/login");
    }
    const router = useRouter();
    //   console.log("cookie", cookie.value);
    // @ts-ignore
    const token = cookie.value.token;
    
    const secret = new TextEncoder().encode(jSecret);
    // Si hay token, verificamos que sea válido
    let roleUser;
    try {
      const { payload, protectedHeader } = await jose.jwtVerify(token, secret);
      // Si el token es válido, podemos almacenar la información del usuario en el objeto $auth
      console.log("token valido ", payload);
      //@ts-ignore
      setPayloadToken(payload)
      roleUser = payload.r
    } catch (e) {
      console.log("el token no es valido", e);
      // Si el token no es válido, redirigimos al usuario a la página de inicio de sesión
      return navigateTo("/login");
    }
    
    //ahora verificamos el rol
    if(roleUser=="user"){
        
      setMenuList(2)
      //@ts-ignore
      if(!rutasUser.includes(to.name)){
        //ruta no permitida al usuario entonces mandar a login
        console.log("enviar a login");
        return navigateTo("/login");
      }
    }else{
      setMenuList(1)
    }


    if (to.name == "settings") {
      return router.push({ name: "settings-user-profile" });
    }
    let routeName:string = to.name?.toString() || '';
    let bgBody = "#FFFFFF";
    if (routeName.includes("settings")) {
      bgBody = "#FCFCFC";
    }
    if (process.client) {
      document.body.style.backgroundColor = bgBody;
    }

    return true;
  }
});
