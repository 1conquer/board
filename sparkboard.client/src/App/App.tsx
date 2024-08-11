import NavBar from "../Global/NavBar";
import Home from "../pages/HomePage";
import BoardPage from "../pages/BoardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IconBreadcrumbs from "../Global/IconBreadcrumbs";
import TaskPage from "../pages/TaskPage";
import NotFoundPage from "../pages/NotFoundPage";
import CalendarPage from "../pages/CalendarPage";
import ReportPage from "../pages/ReportPage";
import BacklogPage from "../pages/BacklogPage";
import SettingPage from "../pages/SettingPage";
import UserPage from "../pages/UserPage";
import { FunctionComponent, useState } from "react";
import { Dispatcher } from "../Flux/Dispatcher";
import { AppStore } from "./AppStore";
import { Action } from "../Flux/Action";

type AppProps = { val: number };

const App: FunctionComponent<AppProps> = (props) => {
  const [store, setStore] = useState<AppStore>(
    new AppStore(new Dispatcher<Action>(), "")
  );

  if (!store) {
    return null;
  }
  const onStoreChanged = (): void => {
    Update();
  };

  store.changed.addHandler(onStoreChanged);

  const Update = () => {};

  return (
    <BrowserRouter>
      <NavBar projectGuid={store.getState().projectGuid} />
      <IconBreadcrumbs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="reports" element={<ReportPage />} />
        <Route path="/backlog" element={<BacklogPage />} />
        <Route path="setting" element={<SettingPage />} />
        <Route path="task" element={<TaskPage />} />
        <Route path="task/:id" element={<TaskPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="user/:id" element={<UserPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
