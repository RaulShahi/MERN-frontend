import React, { useCallback, useContext, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AllPlaces from "./places/pages/AllPlaces";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import Auth from "./user/pages/Auth";
import Users from "./user/pages/Users";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const login = useCallback((uId) => {
    setIsLoggedIn(true);
    setUserId(uId);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);
  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" component={Users} exact />
        <Route path="/places" exact component={AllPlaces} />
        <Route path="/:userId/places" exact component={UserPlaces} />
        <Route path="/places/new" exact component={NewPlace} />
        <Route path="/places/:placeId" exact component={UpdatePlace} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" component={Users} exact />
        <Route path="/places" exact component={AllPlaces} />
        <Route path="/:userId/places" exact component={UserPlaces} />
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      <BrowserRouter>
        <MainNavigation />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
export default App;
