import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Films from "./Pages/Films";
import AddFilms from "./Pages/Films/AddFilms";
import EditFilms from "./Pages/Films/EditFilms";
import ShowTime from "./Pages/ShowTime";
import Signin from "./Pages/Signin";
import Users from "./Pages/Users";
import AddUser from "./Pages/Users/AddUser";
import EditUser from "./Pages/Users/EditUser";
import { AdminTemplate } from "./Template/AdminTemplate";
import { SigninTemplate } from "./Template/SignTemplate";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <AdminTemplate path="/" exact Component={Dashboard} />
        <AdminTemplate path="/admin" exact Component={Dashboard} />
        <AdminTemplate path="/admin/users" exact Component={Users} />
        <AdminTemplate path="/admin/films" exact Component={Films} />
        <AdminTemplate
          path="/admin/films/addfilms"
          exact
          Component={AddFilms}
        />
        <AdminTemplate
          path="/admin/films/editfilms/:id"
          exact
          Component={EditFilms}
        />
        <AdminTemplate
          path="/admin/films/showtime/:id"
          exact
          Component={ShowTime}
        />
        <AdminTemplate path="/admin/films/addUser" exact Component={AddUser} />
        <AdminTemplate
          path="/admin/films/editUser/:id"
          exact
          Component={EditUser}
        />
        <SigninTemplate path="/signin" exact Component={Signin} />
      </Switch>
    </Router>
  );
}

export default App;
