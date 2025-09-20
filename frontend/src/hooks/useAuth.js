import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId, setUserType } from "../redux/action";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          dispatch(setUserType(decoded.role));
          dispatch(setUserId(decoded.id));
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return isAuthenticated;
};

export const GuestRoute = ({ children }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? <Navigate to='/dashboard' /> : children;
};

export const multiPartFormData = (isAuthenticated) => {
  if (isAuthenticated) {
    const token = localStorage.getItem("token");
    return {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
  }
};

export const applicationJsonType = (isAuthenticated) => {
  if (isAuthenticated) {
    const token = localStorage.getItem("token");
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }
};
