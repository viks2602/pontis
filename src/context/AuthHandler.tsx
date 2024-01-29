import { useState, createContext, ReactNode, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axiosInstances from "../services/axios";

import { AuthContextValue } from "../interfaces/authContextInterface";

import { getSessionStorageData } from "../common/helperFunctions";


const AuthContext = createContext<AuthContextValue|null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  
  const unAuthorizedErrorCount = useRef(0);

  const [user, setUser] = useState<string | null | undefined>(null);

  useEffect(() => {
    if (getSessionStorageData()?.accessToken) {
      setUser(getSessionStorageData()?.accessToken);
    } else {
      navigate("/");
    }
  }, []);

    // if new session started old session nevigate to login 
    // useEffect(() => {
    //   const interceptor = axiosInstances.instance.interceptors.response.use(
    //     (response) => {
    //       unAuthorizedErrorCount.current = 0;
    //       return response;
    //     },
    //     (error) => {
          
    //       // error.message === 'Network Error' is used because we are not getting status code on unauthorized request
    //       if (error.message === 'Network Error' && unAuthorizedErrorCount.current <= 0) {
    //         unAuthorizedErrorCount.current += 1;
    //         logout();
    //         toast.warning('Unauthorized User', {
    //           position: "top-right",
    //           autoClose: 2000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "light",
    //         });
    //         navigate("/");
    //       }
    //       return Promise.reject(error);
    //     }
    //   );
    //   // Clean up the interceptor when the component is unmounted
    //   return () => {
    //     axiosInstances.instance.interceptors.response.eject(interceptor);
    //   };
    // },[]);
  
  const login = (accessToken: string) => {
    setUser(accessToken);
  };

  const logout = () => {
    sessionStorage.clear()
    setUser(null);
  };

  const contextValues = {
    user, login, logout
  }

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
