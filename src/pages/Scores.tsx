import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSkeletonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { settingsOutline, searchOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./Scores.css";
import pb from "../lib/pocketbase";

interface Game {
  id: string;
  startTime: string;
  state: string;
  league_name: string;
  league_image: string;
  teams: {
    name: string;
    image: string;
    code: string;
    gameWins: number;
  }[];
}

const Scores: React.FC = () => {
  const [completedGames, setCompletedGames] = useState<Game[]>([]);
  const [loadingScores, setLoadingScores] = useState(true);

  //takes score data from json file and filters to present to user
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const records = await pb.collection("games").getFullList<Game>({
          filter: 'state="completed"',
          sort: "-startTime",
        });
        setCompletedGames(records);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoadingScores(false);
      }
    };
    fetchGames();
  }, []);

  const leagues = [
    "League of Legends Champions Korea",
    "League of Legends Pro League",
    "League of Legends EMEA Championship",
    "LTA North",
    "LPL",
    "Worlds",
    "LEC",
    "LCK",
  ];

  //function that takes available scores and makes a list of cards for them
  //TODO: add date's to cards and loading before data is presented
  //TODO: add argument with dropdown to change between all and certain games
  const renderScoreCards = () => {
    return leagues.map((league) => {
      const leagueMatches = completedGames
        .filter((match) => match.league_name === league)
        .slice(0, 3);

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
  const renderSkeletonScoreCards = () => {
    return (
      <IonCard className="score-card">
        <IonSkeletonText className="loading-title" animated={true} />
        <div className="score-divider" />
        <IonCardContent>
          <IonList lines="none" className="score-list">
            <IonItem className="score-item">
              <div className="teamImage">
                <IonThumbnail className="loading-img">
                  <IonSkeletonText animated={true}></IonSkeletonText>
                </IonThumbnail>
                <IonThumbnail className="loading-img">
                  <IonSkeletonText animated={true}></IonSkeletonText>
                </IonThumbnail>
              </div>
              <div>
                <IonSkeletonText className="loading-team-top" animated={true} />
                <IonSkeletonText
                  className="loading-team-bottom"
                  animated={true}
                />
              </div>
              <div className="teamScore">
                <IonSkeletonText
                  slot="end"
                  className="loading-score"
                  animated={true}
                />
                <IonSkeletonText
                  slot="end"
                  className="loading-score"
                  animated={true}
                />
              </div>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
    );
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
      <IonContent>
        <IonGrid>
          <IonCol>
            <IonRow>
              <IonTitle>League of Legends</IonTitle>
              <IonSelect
                aria-label="Choose a game"
                interface="popover"
                placeholder="All"
                className="game-select-score"
              >
                <IonSelectOption value="All">All</IonSelectOption>
                <IonSelectOption value="League of legends">
                  League of legends
                </IonSelectOption>
                <IonSelectOption value="CS2">CS2</IonSelectOption>
                <IonSelectOption value="Call of Duty">
                  Call of Duty
                </IonSelectOption>
                <IonSelectOption value="Fortnite">Fortnite</IonSelectOption>
                <IonSelectOption value="Overwatch">Overwatch</IonSelectOption>
              </IonSelect>
            </IonRow>
            {loadingScores ? renderSkeletonScoreCards() : renderScoreCards()}
          </IonCol>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Scores;
