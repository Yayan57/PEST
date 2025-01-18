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
import data from "../assets/data/LCK.json";
import LOLthumbnail from "../assets/images/lol_thumbnail.jfif";
import CS2thumbnail from "../assets/images/cs2_thumbnail.webp";
import RLthumbnail from "../assets/images/rl_thumbnail.jfif";
import "./Watch.css";

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

const Watch: React.FC = () => {
  const [watchGames, setWatchGames] = useState<Game[]>([]);

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
    setWatchGames(filteredGames);
  }, []);
  const games = [
    {
      title: "leauge of legends",
      subtitle: "LCK",
      image: LOLthumbnail,
      link: "https://www.twitch.tv/yugioh_official",
    },
    {
      title: "CS2",
      subtitle: "ESL",
      image: CS2thumbnail,
      link: "https://www.twitch.tv/yugioh_official",
    },
    {
      title: "Rocket Leauge",
      subtitle: "RSL",
      image: RLthumbnail,
      link: "https://www.twitch.tv/yugioh_official",
    },
    {
      title: "leauge of legends",
      subtitle: "LTA North",
      image: LOLthumbnail,
      link: "https://www.twitch.tv/yugioh_official",
    },
    {
      title: "leauge of legends",
      subtitle: "LTA South",
      image: RLthumbnail,
      link: "https://www.twitch.tv/yugioh_official",
    },
    {
      title: "Apex",
      subtitle: "ALGS",
      image: RLthumbnail,
      link: "https://www.twitch.tv/yugioh_official",
    },
    {
      title: "leauge of legends",
      subtitle: "Worlds",
      image: LOLthumbnail,
      link: "https://www.twitch.tv/yugioh_official",
    },
    {
      title: "Rocket Leauge",
      subtitle: "RSL",
      image: RLthumbnail,
      link: "https://www.twitch.tv/yugioh_official",
    },
  ];
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
        <Swiper spaceBetween={0} slidesPerView="auto" className="watch-slides">
          {data.map((card, index) => {
            return (
              <SwiperSlide key={`slide_${index}`} className="watch-slide">
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="watch-slide-anchor"
                >
                  <IonCard className="watch-card">
                    <img src={card.image} alt="card" className="image" />

                    <IonCardContent>
                      <IonCardTitle className="title">
                        {card.subtitle}
                      </IonCardTitle>
                    </IonCardContent>
                  </IonCard>
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <IonTitle className="watch-title">Also Watch</IonTitle>
        <Swiper spaceBetween={0} slidesPerView="auto" className="watch-slides">
          {data.map((card, index) => {
            return (
              <SwiperSlide key={`slide_${index}`} className="alsowatch-slide">
                <IonCard className="small-card">
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="watch-slide-anchor"
                  >
                    <img src={card.image} alt="card" className="small-image" />

                    <IonCardContent>
                      <IonCardTitle className="small-title">
                        {card.title}
                      </IonCardTitle>
                      <IonNote className="small-subtitle" slot="">
                        {card.subtitle}
                      </IonNote>
                    </IonCardContent>
                  </a>
                </IonCard>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default Watch;
