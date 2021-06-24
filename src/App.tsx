import { Route, Switch } from "react-router-dom";
import AuthenticationContaier from "./components/AuthenticationContaier";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Bet from "./pages/Bet";

function App() {
  return (
    <Switch>
      <Route path="/login">
        <AuthenticationContaier />
      </Route>
      <Route path="/reset-password">
        <AuthenticationContaier />
      </Route>
      <Route path="/signup">
        <AuthenticationContaier />
      </Route>
      <Layout>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/new-bet">
          <Bet/>
        </Route>
      </Layout>
    </Switch>
  );
}

export default App;
