import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// entry point
import Root from "./routes/root";
import ErrorPage from "./error-page";
import { HomePage, LoginPage } from "./routes";
import Index from "./routes/indexRoutePage";
import DashLayout from "./routes/DashLayout";
import Welcome from "./routes/Welcome";
import NotesList from "./features/notes/NotesList";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./app/api/apislice";
// import { HomePage, AboutPage } from "./routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "dash",
        element: <DashLayout />,
        children: [
          { index: true, element: <Welcome /> },
          {
            path: "note",
            element: <NotesList />,
            children: [],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);
