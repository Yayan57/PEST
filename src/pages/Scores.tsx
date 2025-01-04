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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { settingsOutline, searchOutline } from "ionicons/icons";
import React from "react";
import logo1 from "../assets/images/FaZe-Clan-OnDark.png";
import logo2 from "../assets/images/Sangal-eSports.png";
import "./Scores.css";

const Scores: React.FC = () => {
  const leagues = [
    "League of Legends Champions Korea",
    "League of Legends Pro League",
    "League of Legends EMEA Championship",
    "League of Legends Championship of The Americas",
    "League of Legends Championship Pacific",
  ];

  const matches = [
    {
      league: "League of Legends Pro League",
      team1Name: "FAZE CLAN",
      team1Score: 3,
      team1Image: logo1,
      team2Name: "SANGAL 1XBET",
      team2Score: 1,
      team2Image: logo2,
    },
    {
      league: "League of Legends Pro League",
      team1Name: "T1",
      team1Score: 2,
      team1Image: logo1,
      team2Name: "TSM",
      team2Score: 3,
      team2Image: logo2,
    },
    {
      league: "League of Legends EMEA Championship",
      team1Name: "Cloud9",
      team1Score: 3,
      team1Image: logo1,
      team2Name: "Fnatic",
      team2Score: 0,
      team2Image: logo2,
    },
    {
      league: "League of Legends Championship of The Americas",
      team1Name: "G2",
      team1Score: 2,
      team1Image: logo1,
      team2Name: "Vitality",
      team2Score: 3,
      team2Image: logo2,
    },
  ];

  const renderLeagueCards = () => {
    return leagues.map((league) => {
      const leagueMatches = matches.filter((match) => match.league === league);

      if (leagueMatches.length === 0) {
        return null;
      }

      return (
        <IonCard key={league} className="score-card">
          <IonTitle className="score-title">{league}</IonTitle>
          <div className="score-divider" />
          <IonCardContent>
            <IonList lines="none">
              {leagueMatches.map((list, index) => (
                <IonItem key={`item_${index}`} className="score-item">
                  <div className="teamImage">
                    <IonImg
                      src={list.team1Image}
                      className="score-image teamImage"
                    />
                    <IonImg src={list.team2Image} className="score-image" />
                  </div>
                  <div>
                    <IonLabel className="teamName">{list.team1Name}</IonLabel>
                    <IonLabel className="teamName">{list.team2Name}</IonLabel>
                  </div>
                  <div className="teamScore">
                    <IonLabel slot="end" className="teamScore">
                      {list.team1Score}
                    </IonLabel>
                    <IonLabel slot="end" className="teamScore">
                      {list.team2Score}
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Scores</IonTitle>
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
