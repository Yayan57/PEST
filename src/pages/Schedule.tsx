import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { settingsOutline, searchOutline } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import "./Schedule.css";
import data from "../assets/data/LCK.json";

interface Game {
  id: string;
  blockName: string;
  startTime: string;
  state: string;
  league: {
    name: string;
    image: string;
  };
  tournament: string;
  teams: {
    name: string;
    image: string;
    code: string;
    gameWins: number;
  }[];
  strategy: {
    __typename: string;
    type: string;
    count: number;
  };
}

//TODO: integrate with database
const Schedule: React.FC = () => {
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);

  //sorts games to find those that havent started yet
  useEffect(() => {
    const now = new Date();
    const filteredGames = data
      .filter(
        (game) => game.state === "unstarted" && new Date(game.startTime) > now
      )
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      )
      .slice(0, 10);
    setUpcomingGames(filteredGames);
  }, []);

  // creates unstarted game cards
  const checkSchedule = () => {
    if (upcomingGames.length > 0) {
      return (
        <IonList>
          {upcomingGames.map((game) => (
            <IonCard key={game.id} className="schedule-card">
              <IonCardContent>
                <div className="game-info">
                  <IonImg src={game.teams[0].image} className="team-image" />
                  <IonLabel className="team-name">
                    {game.teams[0].name}
                  </IonLabel>
                  <IonLabel className="vs">vs.</IonLabel>
                  <IonLabel className="team-name">
                    {game.teams[1].name}
                  </IonLabel>
                  <IonImg src={game.teams[1].image} className="team-image" />
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      );
    } else {
      return (
        <IonContent>
          <IonLabel>There are no upcoming games!</IonLabel>
          <IonText>
            <br />
            Check back later!
          </IonText>
        </IonContent>
      );
    }
  };

  //static version of site
  //TODO add loading cards
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"tertiary"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Schedule </IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="../settings">
              <IonIcon slot="icon-only" icon={settingsOutline} color="light" />
            </IonButton>
            <IonButton slot="primary" routerLink="../search">
              <IonIcon slot="icon-only" icon={searchOutline} color="light" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">{checkSchedule()}</IonContent>
    </IonPage>
  );
};

export default Schedule;
