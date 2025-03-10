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
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { settingsOutline, searchOutline } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import "./Schedule.css";
import pb from "../lib/pocketbase";
import { format } from "date-fns";
import { render } from "@testing-library/react";

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

const Schedule: React.FC = () => {
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState(true);

  //sorts games to find those that havent started yet
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const nowTime = new Date().toISOString();
        const records = await pb.collection("games").getFullList<Game>({
          filter: `state="unstarted" && startTime > "${nowTime}"`,
          sort: "startTime",
        });
        console.log("Fetched games:", records);
        setUpcomingGames(records);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoadingSchedule(false);
      }
    };
    fetchGames();
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
  //TODO: add argument with dropdown to change between all and certain games
  const renderScheduleCards = () => {
    if (upcomingGames.length > 0) {
      const groupedGames = groupGamesByDate(upcomingGames);
      return (
        <IonList>
          {Object.keys(groupedGames).map((date) => (
            <div key={date}>
              <IonLabel className="date-label">
                {format(new Date(date), "MMM do")}
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
                    <div>
                      <IonTitle className="schedule-subtitle">
                        {format(new Date(game.startTime), "h:mm a ")} &middot;
                        LoL &middot; {game.league_name}
                      </IonTitle>
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

  const renderSkeletonScheduleCards = () => {
    return (
      <IonList>
        {[...Array(3)].map(() => (
          <div>
            <IonLabel className="date-label">
              <IonSkeletonText
                animated={true}
                style={{ width: "7rem", height: "2rem" }}
              ></IonSkeletonText>
            </IonLabel>
            {[...Array(2)].map(() => (
              <IonCard className="schedule-card">
                <IonCardContent>
                  <div className="game-info">
                    <IonThumbnail>
                      <IonSkeletonText animated={true}></IonSkeletonText>
                    </IonThumbnail>
                    <IonLabel className="team-name">
                      <IonSkeletonText
                        animated={true}
                        className="loading-team"
                      ></IonSkeletonText>
                    </IonLabel>
                    <IonLabel className="vs">vs.</IonLabel>
                    <IonLabel className="team-name">
                      <IonSkeletonText
                        animated={true}
                        className="loading-team"
                      ></IonSkeletonText>
                    </IonLabel>
                    <IonThumbnail>
                      <IonSkeletonText animated={true}></IonSkeletonText>
                    </IonThumbnail>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        ))}
      </IonList>
    );
  };

  //static version of site
  //TODO: make these interact with rendercards function to reload page
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
      <IonContent>
        <IonGrid>
          <IonCol>
            <IonRow>
              <IonTitle className="schedule-title">Leauge of Legends</IonTitle>
              <IonSelect
                aria-label="Choose a game"
                interface="popover"
                placeholder="All"
                className="game-select-schedule"
              >
                <IonSelectOption value="All">All</IonSelectOption>
                <IonSelectOption value="Leauge of legends">
                  Leauge of legends
                </IonSelectOption>
                <IonSelectOption value="CS2">CS2</IonSelectOption>
                <IonSelectOption value="Call of duty">
                  Call of duty
                </IonSelectOption>
                <IonSelectOption value="Fortnite">Fortnite</IonSelectOption>
                <IonSelectOption value="Overwatch">Overwatch</IonSelectOption>
              </IonSelect>
            </IonRow>
          </IonCol>
        </IonGrid>
        <IonList>
          {loadingSchedule
            ? renderSkeletonScheduleCards()
            : renderScheduleCards()}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Schedule;
