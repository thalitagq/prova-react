import { Redirect, Route, Switch } from "react-router-dom";
import AuthenticationContaier from "./components/AuthenticationContaier";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Bet from "./pages/Bet";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const { user } = useSelector((state: RootState) => state.auth)
  
  return (
    <Switch>
      {!user?.email && (
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
      )}
      <Route path="/login">
        <AuthenticationContaier />
      </Route>
      <Route path="/reset-password">
        <AuthenticationContaier />
      </Route>
      <Route path="/signup">
        <AuthenticationContaier />
      </Route>
      <Route path="/new_password">
        <AuthenticationContaier />
      </Route>
      <Layout>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/new-bet">
          <Bet />
        </Route>
      </Layout>
    </Switch>
  );
}

export default App;
