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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { settingsOutline, searchOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./Scores.css";
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
const Scores: React.FC = () => {
  const [completedGames, setCompletedGames] = useState<Game[]>([]);

  //takes score data from json file and filters to present to user
  useEffect(() => {
    const now = new Date();
    const filteredGames = data
      .filter(
        (game) => game.state === "completed" && new Date(game.startTime) < now
      )
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      )
      .slice(0, 10);
    setCompletedGames(filteredGames);
  }, []);

  const leagues = [
    "League of Legends Champions Korea",
    "League of Legends Pro League",
    "League of Legends EMEA Championship",
    "League of Legends Championship of The Americas",
    "League of Legends Championship Pacific",
    "Worlds",
    "LEC",
    "LCK",
  ];

  //function that takes available scores and makes a list of cards for them
  //TODO: add date's to cards and loading before data is presented
  const renderLeagueCards = () => {
    return leagues.map((league) => {
      const leagueMatches = completedGames.filter(
        (match) => match.league.name === league
      );

      if (leagueMatches.length === 0) {
        return null;
      }

      return (
        <IonCard key={league} className="score-card">
          <IonTitle className="score-title">{league}</IonTitle>
          <div className="score-divider" />
          <IonCardContent>
            <IonList lines="none" className="score-list">
              {leagueMatches.map((list, index) => (
                <IonItem key={`item_${index}`} className="score-item">
                  <div className="teamImage">
                    <IonImg
                      src={list.teams[0].image}
                      className="score-image teamImage"
                    />
                    <IonImg src={list.teams[1].image} className="score-image" />
                  </div>
                  <div>
                    <IonLabel className="teamName">
                      {list.teams[0].name}
                    </IonLabel>
                    <IonLabel className="teamName">
                      {list.teams[1].name}
                    </IonLabel>
                  </div>
                  <div className="teamScore">
                    <IonLabel slot="end" className="teamScore">
                      {list.teams[0].gameWins}
                    </IonLabel>
                    <IonLabel slot="end" className="teamScore">
                      {list.teams[1].gameWins}
                    </IonLabel>
                  </div>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>
      );
    });
  };

  //static version of scores page
  //TODO: make these interact with rendercards function to reload page
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"tertiary"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Scores</IonTitle>
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
      <IonContent>{renderLeagueCards()}</IonContent>
    </IonPage>
  );
};

export default Scores;
