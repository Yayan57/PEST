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
import data from "../assets/data/LOL.json";
import { format } from "date-fns";

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
    const uniqueGameIds = new Set<string>();
    const filteredGames = data
      .filter(
        (game) => game.state === "unstarted" && new Date(game.startTime) > now
      )
      .filter((game) => {
        if (uniqueGameIds.has(game.id)) {
          return false;
        } else {
          uniqueGameIds.add(game.id);
          return true;
        }
      })
      .filter((game) => {
        if (game.teams[0].name === "TBD" && game.teams[1].name === "TBD") {
          return false;
        } else {
          return true;
        }
      })
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      )
      .slice(0, 10);
    setUpcomingGames(filteredGames);
  }, []);

  //Groups games by date
  const groupGamesByDate = (games: Game[]) => {
    return games.reduce((groups, game) => {
      const date = new Date(game.startTime).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(game);
      return groups;
    }, {} as { [key: string]: Game[] });
  };

  // creates unstarted game cards
  const checkSchedule = () => {
    if (upcomingGames.length > 0) {
      const groupedGames = groupGamesByDate(upcomingGames);
      return (
        <IonList>
          {Object.keys(groupedGames).map((date) => (
            <div key={date}>
              <IonLabel className="date-label">
                {format(date, "MMMM do, yyyy")}
              </IonLabel>
              {groupedGames[date].map((game) => (
                <IonCard key={game.id} className="schedule-card">
                  <IonCardContent>
                    <div className="game-info">
                      <IonImg
                        src={game.teams[0].image}
                        className="team-image"
                      />
                      <IonLabel className="team-name">
                        {game.teams[0].name}
                      </IonLabel>
                      <IonLabel className="vs">vs.</IonLabel>
                      <IonLabel className="team-name">
                        {game.teams[1].name}
                      </IonLabel>
                      <IonImg
                        src={game.teams[1].image}
                        className="team-image"
                      />
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
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
  //TODO: make these interact with rendercards function to reload page
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"tertiary"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Schedule </IonTitle>
          <IonSelect
            aria-label="Choose a game"
            interface="popover"
            placeholder="All"
            slot="end"
          >
            <IonSelectOption value="All">All</IonSelectOption>
            <IonSelectOption value="Leauge of legends">
              Leauge of legends
            </IonSelectOption>
            <IonSelectOption value="CS2">CS2</IonSelectOption>
            <IonSelectOption value="Call of duty">Call of duty</IonSelectOption>
            <IonSelectOption value="Fortnite">Fortnite</IonSelectOption>
            <IonSelectOption value="Overwatch">Overwatch</IonSelectOption>
          </IonSelect>
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
      <IonContent className="ion-padding">
        <IonList>{checkSchedule()}</IonList>
      </IonContent>
    </IonPage>
  );
};

export default Schedule;
