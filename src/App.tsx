import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return (
    <div className="App">
      <div className="background"></div>
      <RouterProvider router={router} />
      <p className="developer">
        Developed by 🧑‍💻 <span>Aneesh Pissay</span>
      </p>
    </div>
  )
}

export default App
