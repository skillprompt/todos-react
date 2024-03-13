import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type TLoginUserInput = {
  password: string;
  username: string;
};

type TLoginUserOutput = {
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      _id: string;
      avatar: {
        url: string;
        localPath: string;
        _id: string;
      };
      username: string;
      email: string;
      role: string;
      loginType: string;
      isEmailVerified: boolean;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
  message: string;
  statusCode: 200;
  success: boolean;
};

export function LoginUser() {
  const loginUserMutation = useMutation<
    TLoginUserOutput,
    Error,
    TLoginUserInput
  >({
    mutationFn: async (body) => {
      const response = await fetch(`http://localhost:8080/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: body.username,
          password: body.password,
        }),
      });

      const data = await response.json();

      return data;
    },
    onSuccess(data) {
      console.log("data", data);
    },
    onError(error) {
      console.log("error", error);
    },
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUserLogin = async () => {
    await loginUserMutation.mutateAsync({
      username,
      password,
    });
  };

  return (
    <div>
      <h1>Login Form</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleUserLogin();
        }}
      >
        <div>
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="username"
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
