import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["/api/v1/users/current-user"],
    queryFn: async () => {
      const resp = await fetch(
        `http://localhost:8080/api/v1/users/current-user`,
        {
          method: "get",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            // "authorization": `Bearer ${accessToken}`,
            // "refereshToken": `Bearer ${refereshtoken}`
          },
        }
      );
      const data = await resp.json();

      return data;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:8080/api/v1/users/logout`, {
        method: "post",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const d = await res.json();

      return d;
    },
    onSuccess() {
      navigate("/login");
    },
  });

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  if (isLoading) return <p>Loading...</p>;

  if (data.data?.email) {
    return (
      <div>
        you are logged in {data.data.email}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </div>
    );
  }

  return <p>You are not logged in</p>;
}
