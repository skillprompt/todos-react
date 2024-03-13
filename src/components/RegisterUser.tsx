import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type TRegisterUserOutput = {
  statusCode: 200;
  data: {
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
  success: boolean;
};

type TRegisterUserInput = {
  email: string;
  password: string;
  role: string;
  username: string;
};

export function RegisterUser() {
  const navigate = useNavigate();

  const registerUserMutation = useMutation<
    TRegisterUserOutput,
    Error,
    TRegisterUserInput
  >({
    mutationFn: async (body) => {
      const response = await fetch(
        `http://localhost:8080/api/v1/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: body.email,
            password: body.password,
            role: body.role,
            username: body.username,
          }),
        }
      );

      const data = await response.json();

      return data;
    },
    onSuccess(data) {
      console.log("data", data.message);

      navigate("/login");
    },
    onError(error) {
      console.log("error", error);
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("ADMIN");

  const handleUserRegistration = async () => {
    await registerUserMutation.mutateAsync({
      email,
      password,
      username,
      role,
    });
  };

  return (
    <div>
      <h1>Register page</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleUserRegistration();
        }}
      >
        <div>
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="role">role</label>
          <input
            id="role"
            type="text"
            placeholder="role"
            value={role}
            disabled
            onChange={(e) => {
              setRole(e.target.value);
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

        <div>
          <label htmlFor="confirm_password">confirm password</label>
          <input
            id="confirm_password"
            type="password"
            placeholder="confirm password"
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
