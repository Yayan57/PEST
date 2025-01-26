import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { settingsOutline, searchOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Watch.css";
interface Stream {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: any[];
  tags: string[];
  is_mature: boolean;
}

interface RootInterface {
  "League of Legends": Stream[];
  "Rocket League": Stream[];
  "Counter-Strike": Stream[];
  "Marvel Rivals": Stream[];
  Fortnite: Stream[];
}

const Watch: React.FC = () => {
  const [watchGames, setWatchGames] = useState<Partial<RootInterface>>({});

  const getToken = async () => {
    const response = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      body: new URLSearchParams({
        client_id: import.meta.env.VITE_CLIENT_ID!,
        client_secret: import.meta.env.VITE_CLIENT_SECRET!,
        grant_type: "client_credentials",
      }),
    });
    const data = await response.json();
    return data.access_token;
  };

  const getGameID = async (accessToken: string, gameName: string) => {
    const response = await fetch(
      `https://api.twitch.tv/helix/games?name=${encodeURIComponent(gameName)}`,
      {
        method: "GET",
        headers: {
          "Client-ID": import.meta.env.VITE_CLIENT_ID!,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    if (data.data && data.data.length > 0) {
      return data.data[0].id;
    } else {
      console.log(`Game not found: ${gameName}`);
      return null;
    }
  };

  const getTopStreams = async (
    accessToken: string,
    gameID: string,
    gameName: string
  ) => {
    const response = await fetch(
      `https://api.twitch.tv/helix/streams?game_id=${gameID}&first=10`,
      {
        method: "GET",
        headers: {
          "Client-ID": import.meta.env.VITE_CLIENT_ID!,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data.data;
  };

  const fetchStreamsForGame = async (gameName: string) => {
    const accessToken = await getToken();
    const gameID = await getGameID(accessToken, gameName);
    if (gameID) {
      const streams = await getTopStreams(accessToken, gameID, gameName);
      setWatchGames((prev) => ({ ...prev, [gameName]: streams }));
    }
  };

  useEffect(() => {
    //TODO: add limit to char count in cards, make cards smaller to show like 3 a page
    const gameNames = [
      "League of Legends",
      "Rocket League",
      "Counter-Strike",
      "Marvel Rivals",
      "Fortnite",
    ];
    gameNames.forEach((gameName) => {
      fetchStreamsForGame(gameName);
    });
  }, []);

  const renderWatchCards = (league: string) => {
    if (!watchGames) return null;

    const leagueData = watchGames[league as keyof RootInterface];
    if (!leagueData) return null;

    return (
      <Swiper
        spaceBetween={0}
        slidesPerView="auto"
        className="watch-slides"
        key={league}
      >
        {leagueData.map((match) => {
          const thumbnailUrl = match.thumbnail_url
            .replace("{width}", "300")
            .replace("{height}", "169");
          return (
            <SwiperSlide key={match.id} className="watch-slide">
              <a
                href={"https://www.twitch.tv/" + match.user_name}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-slide-anchor"
              >
                <IonCard className="watch-card">
                  <img src={thumbnailUrl} alt="card" className="image" />

                  <IonCardContent>
                    <IonCardTitle className="title">{match.title}</IonCardTitle>
                  </IonCardContent>
                </IonCard>
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"tertiary"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Watch</IonTitle>
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
      <IonContent className="content-top">
        <IonTitle className="watch-title">League of Legends</IonTitle>
        {renderWatchCards("League of Legends")}
        <IonTitle className="watch-title">Rocket League</IonTitle>
        {renderWatchCards("Rocket League")}
        <IonTitle className="watch-title">Marvel Rivals</IonTitle>
        {renderWatchCards("Marvel Rivals")}
        <IonTitle className="watch-title">Counter-Strike</IonTitle>
        {renderWatchCards("Counter-Strike")}
        <IonTitle className="watch-title">Fortnite</IonTitle>
        {renderWatchCards("Fortnite")}
      </IonContent>
    </IonPage>
  );
};

export default Watch;
