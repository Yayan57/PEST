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
//TODO: connect thumbnail to leauge channel link
//TODO: link leauge name in game interface to the thumbnail
//TODO: create watch cards for games that are currently on, if no games are on put nothing to watch right now
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
