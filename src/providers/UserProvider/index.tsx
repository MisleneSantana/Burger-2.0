import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { IRegisterFormData } from "../../components/Form/RegisterForm";
import { ILoginFormData } from "../../components/Form/LoginForm";

// *Interfaces*:
export interface IUserProviderProps {
  children: React.ReactNode;
}

export interface IUserContext {
  login: (loginFormData: ILoginFormData) => Promise<void>;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  postRegisterUser: (registerFormData: IRegisterFormData) => Promise<void>;
  userLogout: () => void;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface ILoginResponse {
  accessToken: string;
  user: IUser;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [userRegister, setUserRegister] = useState(null); //Uso futuro.

  const navigate = useNavigate();

  // *Toasts*:
  const toastSuccess = () => {
    toast.success("Conta criada com sucesso!", {
      autoClose: 2000,
    });
  };

  const toastError = () => {
    toast.error("Ops! Algo deu errado", {
      autoClose: 2000,
    });
  };

  // *Register*:
  const postRegisterUser = async (registerFormData: IRegisterFormData) => {
    try {
      setLoading(true);
      const responseApi = await api
        .post("/users", registerFormData)
        .then((response) => {
          setUserRegister(response.data);
        });
      toastSuccess();
      navigate("/");
      return responseApi;
    } catch (error) {
      toastError();
    } finally {
      setLoading(false);
    }
  };

  // *Login*:
  const login = async (loginFormData: ILoginFormData) => {
    try {
      setLoading(true);
      const responseApi = await api
        .post<ILoginResponse>("/login", loginFormData)
        .then((response) => {
          const { accessToken, user: userResponse } = response.data;

          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

          localStorage.setItem("@TOKEN", accessToken);
          localStorage.setItem("@USERID", JSON.stringify(userResponse.id));

          setUser(userResponse);
          navigate("/shop");
        });

      return responseApi;
    } catch (error) {
      toastError();
    } finally {
      setLoading(false);
    }
  };

  // *Auto-Login*:
  useEffect(() => {
    const userToken = localStorage.getItem("@TOKEN");
    const userId = localStorage.getItem("@USERID");

    const userLoggedIn = async () => {
      try {
        if (!userToken && !userId) {
          return;
        }
        api.defaults.headers.common.Authorization = `Bearer ${userToken}`;

        const { data } = await api.get(`/users/${userId}`);

        setUser(data);
        navigate("/shop");
      } catch (error) {
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@USERID");
        toastError();
      }
    };
    userLoggedIn();
  }, []);

  // *Logout*:
  const userLogout = () => {
    localStorage.removeItem("@TOKEN");
    localStorage.removeItem("@USERID");
    setUser(null);
    navigate("/");
  };

  // *Return Provider - JSX*:
  return (
    <UserContext.Provider
      value={{
        login,
        user,
        setUser,
        loading,
        setLoading,
        postRegisterUser,
        userLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
