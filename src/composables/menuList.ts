export let menuListReactive = {};

export function setMenuList(val: number) {
  if (val == 1) {
    menuListReactive = menuList;
  }else{
    menuListReactive = menuListUser;
  }
}

export const menuList = [
  {
    title: "dashboard",
    link: "/",
  },
  {
    title: "sites",
    link: "/sites",
  },
  {
    title: "withdraws",
    link: "/withdraws",
  },
  {
    title: "processors",
    link: "/processors",
  },
  {
    title: "users",
    link: "/users",
  },
  {
    title: "domains",
    link: "/domains",
  },
  {
    title: "templates",
    link: "/templates",
  },
  {
    title: "settings",
    link: "/settings",
  },
];

export const menuListUser = [
  {
    title: "dashboard",
    link: "/",
  },

  {
    title: "settings",
    link: "/settings",
  },
];
