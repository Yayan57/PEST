import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import TabsContainer from "./TabsContainer";
import Settings from "./Settings";
import Search from "./Search";
import GoodToKnow from "./GoodToKnow";
import {
  flashOutline,
  homeOutline,
  logOutOutline,
  settingsOutline,
} from "ionicons/icons";

const Menu: React.FC = () => {
  return (
    <IonPage>
      <IonSplitPane contentId="main" when="lg">
        <IonRouterOutlet id="main">
          <Route path="/app/tabscontainer" component={TabsContainer} />
          <Route exact path="/app/settings" component={Settings} />
          <Route exact path="/app/search" component={Search} />
          <Route exact path="/app/goodtoknow" component={GoodToKnow} />
          <Route exact path="/app">
            <Redirect to="/app/tabscontainer" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
