import { useStorage } from "@vueuse/core";

const username = useStorage("username", "N/A")

export const useLogin = () => {

  const token = useCookie("token", {
    // maxAge: new Date(2147483647 * 1000).getTime() / 1000,
    expires: new Date(2147483647 * 1000),
  });

  const { addNotification } = useNotifications()

  const loading = ref(false)
  const isLoggedIn = computed(() => !!token.value)

  const login = async (userName: string, password: string) => {
    const response = await wrappedFetch<{ token: string }>("/api/login", {
      method: "POST",
      body: {
        username: userName,
        password,
      }
    })

    username.value = userName;
    token.value = response.token;
    addNotification({
      text: "Logged in successfuly.",
      level: "success",
    })
  }

  const clear = () => {
    token.value = undefined;
    username.value = undefined;
  }

  const logout = () => {
    clear();
    addNotification({
      text: "Logged out successfuly.",
      level: "success",
      })
    navigateTo("/login");
  }

  return {
    username,
    isLoggedIn,
    loading,
    login,
    logout,
    clear,
  }
};
