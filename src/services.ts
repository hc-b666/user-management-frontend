import { toast } from "react-toastify";
import { BACKEND_URL } from "./constants";
import { NavigateFunction } from "react-router-dom";
import { LoadingAction } from "@/reducers/loadingReducer";

export const signIn = async (
  data: any,
  navigate: NavigateFunction,
  dispatch: React.Dispatch<LoadingAction>
) => {
  try {
    dispatch({ type: "START_LOADING" });
    const res = await fetch(`${BACKEND_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (res.ok) {
      localStorage.setItem("token", json.token);
      toast.success("Logged in successfully");
      navigate("/");
    } else {
      toast(json);
      console.log(`error: ${res}`);
    }
  } catch (err) {
    toast.error("Something went wrong. Try again later.");
    console.log(err);
  } finally {
    dispatch({ type: "STOP_LOADING" });
  }
};

export const signUp = async (
  data: any,
  navigate: NavigateFunction,
  dispatch: React.Dispatch<LoadingAction>
) => {
  try {
    dispatch({ type: "START_LOADING" });
    const res = await fetch(`${BACKEND_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (res.ok) {
      toast.success("Registered successfully");
      navigate("/auth/signin");
    } else {
      toast.error(json);
      console.log(`error: ${json}`);
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch({ type: "STOP_LOADING" });
  }
};

export const getUsers = async (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  dispatch: React.Dispatch<LoadingAction>
) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({ type: "START_LOADING" });

    const res = await fetch(`${BACKEND_URL}/api/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const json = await res.json();
      setUsers(json);
    } else if (res.status === 401) {
      localStorage.removeItem("token");
      toast.error("Unauthorized. Please log in again.");
    } else {
      const errorText = await res.text();
      console.log("Error Response:", errorText);
      toast.error("Error fetching users");
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    dispatch({ type: "STOP_LOADING" });
  }
};

export const handleAction = async (
  action: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data: any,
  dispatch: React.Dispatch<LoadingAction>,
  callback: () => void
) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({ type: "START_LOADING" });
    const res = await fetch(`${BACKEND_URL}/api/${action}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const json = await res.json();
      toast.success(json);
      callback();
    } else if (res.status === 401) {
      localStorage.removeItem("token");
      toast.error("Unauthorized. Please log in again.");
    } else {
      toast.error("Error performing action");
    }
  } catch (err) {
    console.log(`error: ${err}`);
  } finally {
    dispatch({ type: "STOP_LOADING" });
  }
};
