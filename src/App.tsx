import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodoContainer } from "./components/TodoContainer";
import { RegisterUser } from "./components/RegisterUser";
import { LoginUser } from "./components/LoginUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoContainer />,
  },
  {
    path: "/about",
    element: <p>i am about page</p>,
  },
  {
    path: "/register",
    element: <RegisterUser />,
  },
  {
    path: "/login",
    element: <LoginUser />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
