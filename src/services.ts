import { toast } from "react-toastify";
import { BACKEND_URL } from "./constants";
import { NavigateFunction } from "react-router-dom";

console.log(BACKEND_URL);

export const signIn = async (data: any, navigate: NavigateFunction) => {
  try {
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
      toast("Logged in successfully");
      navigate("/");
    } else {
      toast(json);
      console.log(`error: ${res}`);
    }
  } catch (err) {
    toast("Something went wrong. Try again later.");
    console.log(err);
  }
};

export const signUp = async (data: any, navigate: NavigateFunction) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (res.ok) {
      toast("Registered successfully");
      navigate("/auth/signin");
    } else {
      toast(json);
      console.log(`error: ${json}`);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BACKEND_URL}/api/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    if (res.ok) {
      setUsers(json);
    } else {
      toast("Error fetching users");
      // localStorage.removeItem("token");
      // navigate("/auth/signin");
    }
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

export const handleAction = async (
  action: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data: any
) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BACKEND_URL}/api/${action}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (res.ok) {
      toast(json);
    } else {
      toast(json);
      // localStorage.removeItem("token");
      // navigate("/auth/signin");
    }
  } catch (err) {
    console.log(`error: ${err}`);
  }
};
