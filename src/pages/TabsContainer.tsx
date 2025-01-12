import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  homeOutline,
  barChartOutline,
  playCircleOutline,
  gridOutline,
  calendarOutline,
} from "ionicons/icons";
import React from "react";
import { Route, Redirect } from "react-router";
import Home from "./Home";
import Scores from "./Scores";
import Watch from "./Watch";
import More from "./More";
import Schedule from "./Schedule";

const TabsContainer: React.FC = () => {
  return (
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/app/tabscontainer/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="scores" href="/app/tabscontainer/scores">
          <IonIcon icon={barChartOutline} />
          <IonLabel>Scores</IonLabel>
        </IonTabButton>
        <IonTabButton tab="watch" href="/app/tabscontainer/watch">
          <IonIcon icon={playCircleOutline} />
          <IonLabel>Watch</IonLabel>
        </IonTabButton>
        <IonTabButton tab="schedule" href="/app/tabscontainer/schedule">
          <IonIcon icon={calendarOutline} />
          <IonLabel>Schedule</IonLabel>
        </IonTabButton>
        <IonTabButton tab="more" href="/app/tabscontainer/more">
          <IonIcon icon={gridOutline} />
          <IonLabel>More</IonLabel>
        </IonTabButton>
      </IonTabBar>
      <IonRouterOutlet>
        <Route path="/app/tabscontainer/home" component={Home} />
        <Route path="/app/tabscontainer/scores" component={Scores} />
        <Route path="/app/tabscontainer/watch" component={Watch} />
        <Route path="/app/tabscontainer/more" component={More} />
        <Route path="/app/tabscontainer/schedule" component={Schedule} />

        <Route exact path="/app/tabscontainer">
          <Redirect to="/app/tabscontainer/home" />
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default TabsContainer;
