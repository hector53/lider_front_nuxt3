import * as jose from "jose";
import { env } from "process";
export default defineNuxtRouteMiddleware(async (to, from) => {
  //  console.log("to", to);
  // console.log("from,", from);
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
    try {
      const { payload, protectedHeader } = await jose.jwtVerify(token, secret);
      // Si el token es válido, podemos almacenar la información del usuario en el objeto $auth
      console.log("token valido ", payload);
    } catch (e) {
      console.log("el token no es valido", e);
      // Si el token no es válido, redirigimos al usuario a la página de inicio de sesión
      return navigateTo("/login");
    }
    console.log("puede entrar a la ruta ");
    if (to.name == "settings") {
      return router.push({ name: "settings-user-profile" });
    }
    const routeName: any = to.name;
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
