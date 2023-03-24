import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext();

// export const AuthContextWrapper = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const login = useCallback(() => {
//     setIsLoggedIn(true);
//   }, []);
//   const logout = useCallback(() => {
//     setIsLoggedIn(false);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
