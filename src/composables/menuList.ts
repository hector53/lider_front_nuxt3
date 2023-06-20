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
    title: "wallets",
    link: "/wallet",
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
    title: "wallet",
    link: "/wallet_user",
  },

  {
    title: "withdraws",
    link: "/withdraws_user",
  },

  {
    title: "settings",
    link: "/settings",
  },
];
