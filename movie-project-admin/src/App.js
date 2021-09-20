import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Films from "./Pages/Films";
import AddFilms from "./Pages/Films/AddFilms";
import EditFilms from "./Pages/Films/EditFilms";
import Users from "./Pages/Users";
import { AdminTemplate } from "./Template/AdminTemplate";



export const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
        <Switch>
        <AdminTemplate path="/" exact Component={Dashboard} />
        <AdminTemplate path="/admin" exact Component={Dashboard}/>
        <AdminTemplate path="/admin/users" exact Component={Users} />
        <AdminTemplate path="/admin/films" exact Component={Films} />
        <AdminTemplate path="/admin/films/addfilms" exact Component ={AddFilms}/>
        <AdminTemplate path="/admin/films/editfilms/:id" exact Component={EditFilms} />
        </Switch>
    </Router>
  );
}

export default App;
