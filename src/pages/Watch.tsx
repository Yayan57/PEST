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
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { settingsOutline, searchOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import data from "../assets/data/watch.json";
import "./Watch.css";
export interface RootInterface {
  Fortnite: Video_Game;
  "Rocket League": Video_Game;
  "League of Legends": Video_Game;
  "Marvel Rivals": Video_Game;
  "Counter-Strike": Video_Game;
}

export interface Video_Game {
  data: Datum[];
  pagination: Pagination;
}

export interface Pagination {
  cursor: string;
}

export interface Datum {
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

const Watch: React.FC = () => {
  const [watchGames, setWatchGames] = useState<RootInterface | null>(null);

  useEffect(() => {
    //TODO: put twitch api call here to send to watch.json file
    require("dotenv").config();
    const request = require("request");
    const fs = require("fs");

    const getToken = (callback: {
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

    const getGameID = (
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

    const getTopStreams = (
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

    const writeToFile = (data: Record<string, RootInterface[]>) => {
      fs.writeFile(
        "../assets/data/watch.json",
        JSON.stringify(data, null, 2),
        (err: any) => {
          if (err) {
            return console.log(err);
          }
          console.log("Data written to watch.json");
        }
      );
    };

    getToken((accessToken) => {
      const gameNames = [
        "League of Legends",
        "Rocket League",
        "Counter-Strike",
        "Marvel Rivals",
        "Fortnite",
      ];
      const allStreams: Record<string, RootInterface[]> = {};

      let processedGames = 0;
      gameNames.forEach((gameName) => {
        getGameID(accessToken, gameName, (gameID: any) => {
          getTopStreams(
            accessToken,
            gameID,
            gameName,
            (gameName: string | number, streams: any) => {
              allStreams[gameName] = streams;
              processedGames++;
              if (processedGames === gameNames.length) {
                writeToFile(allStreams);
              }
            }
          );
        });
      });
    });
    setWatchGames(data);
  }, []);

  const renderWatchCards = (leauge: string) => {
    if (!watchGames) return null;

    const leaugeData = watchGames[leauge as keyof RootInterface];
    if (!leaugeData) return null;

    return (
      <Swiper
        spaceBetween={0}
        slidesPerView="auto"
        className="watch-slides"
        key={leauge}
      >
        {leaugeData.data.map((match) => {
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
