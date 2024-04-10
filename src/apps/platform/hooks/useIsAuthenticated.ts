export const useIsAuthenticated = () => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  const authCredentials = sessionStorage.getItem("authCredentials");
  return isAuthenticated && !!authCredentials;
};
