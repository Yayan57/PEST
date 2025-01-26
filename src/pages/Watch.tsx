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
  const [watchGames, setWatchGames] = useState<RootInterface | null>(null);

  useEffect(() => {
    //TODO: put twitch api call here to send to watch.json file

    const getToken = async () => {
      const response = await fetch("https://id.twitch.tv/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-ww-for-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.REACT_APP_CLIENT_ID!,
          client_secret: process.env.REACT_APP_CLIENT_SECRET!,
          grant_type: "client_credentials",
        }),
      });
      const data = await response.json();
      return data.access_token;
    };

    const getGameID = async (accessToken: string, gameName: string) => {
      const response = await fetch(
        `https://api.twitch.tv/helix/games?name=${encodeURIComponent(
          gameName
        )}`,
        {
          method: "GET",
          headers: {
            "Client-ID": process.env.REACT_APP_CLIENT_ID!,
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
            "Client-ID": process.env.REACT_APP_CLIENT_ID!,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(`Top 10 streams for ${gameName}:`, data);
      return data.data;
    };

    const fetchStreams = async () => {
      const accessToken = await getToken();
      const gameNames = [
        "League of Legends",
        "Rocket League",
        "Counter-Strike",
        "Marvel Rivals",
        "Fortnite",
      ];
      const allStreams: Partial<RootInterface> = {};

      gameNames.forEach(async (gameName) => {
        const gameID = await getGameID(accessToken, gameName);
        if (gameID) {
          const streams = await getTopStreams(accessToken, gameID, gameName);
          allStreams[gameName as keyof RootInterface] = streams;
        }
      });
      setWatchGames(allStreams as RootInterface);
    };

    fetchStreams();
  }, []);

  /*
    const getoken = (callback: {
      (accessToken: any): void;
      (arg0: any): void;
    }) => {
      const options = {
        url: "https://id.twitch.tv/oauth2/token",
        json: true,
        form: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          grant_type: "client_credentials",
        },
      };

      request.post(
        options,
        (err: any, res: { statusCode: any }, body: { access_token: any }) => {
          if (err) {
            return console.log(err);
          }
          console.log(`Status: ${res.statusCode}`);
          console.log(body);

          callback(body.access_token);
        }
      );
    };

    const getGameD = (
      accessToken: any,
      gameName: string | number | boolean,
      callback: { (gameID: any): void; (arg0: any): void }
    ) => {
      const gameOptions = {
        url: `https://api.twitch.tv/helix/games?name=${encodeURIComponent(
          gameName
        )}`,
        method: "GET",
        headers: {
          "Client-ID": process.env.CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
      };

      request.get(gameOptions, (err: any, res: any, body: string) => {
        if (err) {
          return console.log(err);
        }
        const data = JSON.parse(body);
        if (data.data && data.data.length > 0) {
          callback(data.data[0].id);
        } else {
          console.log(`Game not found: ${gameName}`);
        }
      });
    };

    const getToptreams = (
      accessToken: any,
      gameID: any,
      gameName: string,
      callback: {
        (gameName: any, streams: any): void;
        (arg0: any, arg1: any): void;
      }
    ) => {
      const streamOptions = {
        url: `https://api.twitch.tv/helix/streams?game_id=${gameID}&first=10`,
        method: "GET",
        headers: {
          "Client-ID": process.env.CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
      };

      request.get(streamOptions, (err: any, res: any, body: string) => {
        if (err) {
          return console.log(err);
        }
        console.log(`Top 10 streams for ${gameName}:`);
        const streams = JSON.parse(body);
        console.log(streams);
        callback(gameName, streams);
      });
    };

    getToken((accessToken) => {
      const gameNames = [
        "League of Legends",
        "Rocket League",
        "Counter-Strike",
        "Marvel Rivals",
        "Fortnite",
      ];
      const allStreams: Partial<RootInterface> = {};

      let processedGames = 0;
      gameNames.forEach((gameName) => {
        getGameID(accessToken, gameName, (gameID: any) => {
          getTopStreams(
            accessToken,
            gameID,
            gameName,
            (gameName: string | number, streams: any) => {
              allStreams[gameName as keyof RootInterface] = streams;
              processedGames++;
              if (processedGames === gameNames.length) {
                setWatchGames(allStreams as RootInterface);
              }
            }
          );
        });
      });
    });
  }, []);*/

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
            .replace("{width}", "440")
            .replace("{height}", "280");
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
        <Swiper spaceBetween={0} slidesPerView="auto" className="watch-slides">
          {renderWatchCards("League of Legends")}
        </Swiper>
        <IonTitle className="watch-title">Rocket Leuage</IonTitle>
        <Swiper spaceBetween={0} slidesPerView="auto" className="watch-slides">
          {renderWatchCards("Rocket League")}
        </Swiper>
        <IonTitle className="watch-title">Marvel Rivals</IonTitle>
        <Swiper spaceBetween={0} slidesPerView="auto" className="watch-slides">
          {renderWatchCards("Marvel Rivals")}
        </Swiper>
        <IonTitle className="watch-title">Counter-Strike</IonTitle>
        <Swiper spaceBetween={0} slidesPerView="auto" className="watch-slides">
          {renderWatchCards("Counter-Strike")}
        </Swiper>
        <IonTitle className="watch-title">Fortnite</IonTitle>
        <Swiper spaceBetween={0} slidesPerView="auto" className="watch-slides">
          {renderWatchCards("Fortnite")}
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default Watch;
