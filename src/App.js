import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import "./styles/main.scss";

function App() {
  return (
    <div className="App">
      <Layout>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Homepage} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
