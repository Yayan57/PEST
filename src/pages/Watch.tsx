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
import LECthumbnail from "../assets/images/LEC.jpeg";
import LCKthumbnail from "../assets/images/LCK.webp";
import "./Watch.css";
//TODO: connect thumbnail to leauge channel link
//TODO: link leauge name in game interface to the thumbnail
//TODO: create watch cards for games that are currently on, if no games are on put nothing to watch right now
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

const leauges = ["LEC", "LCK", "CS2", "Rocket League", "League of Legends"];

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
  const getThumbnailAndLink = (leagueName: string) => {
    switch (leagueName) {
      case "LTANorth":
        return {
          thumbnail: LECthumbnail,
          link: "https://www.twitch.tv/ltanorth",
        };
      case "LEC":
        return { thumbnail: LECthumbnail, link: "https://www.twitch.tv/lec" };
      case "LCK":
        return { thumbnail: LCKthumbnail, link: "https://www.twitch.tv/lck" };
      case "LPL":
        return { thumbnail: LECthumbnail, link: "https://www.twitch.tv/lpl" };
      case "League of Legends":
        return {
          thumbnail: LOLthumbnail,
          link: "https://www.twitch.tv/riotgames",
        };
      case "CS2":
        return { thumbnail: CS2thumbnail, link: "https://www.twitch.tv/eslcs" };
      case "Rocket League":
        return {
          thumbnail: RLthumbnail,
          link: "https://www.twitch.tv/rocketleague",
        };
      default:
        return { thumbnail: LOLthumbnail, link: "https://www.twitch.tv" }; // Default thumbnail and link if no match is found
    }
  };

  const renderWatchCards = (leauge: string) => {
    const leaugeMatch = watchGames.filter(
      (match) => match.league.name === leauge
    );

    if (leaugeMatch.length === 0) {
      return null;
    }

    const { thumbnail, link } = getThumbnailAndLink(leauge);

    return (
      <Swiper
        spaceBetween={0}
        slidesPerView="auto"
        className="watch-slides"
        key={leauge}
      >
        {leaugeMatch.map((match) => {
          return (
            <SwiperSlide key={match.id} className="watch-slide">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-slide-anchor"
              >
                <IonCard className="watch-card">
                  <img src={thumbnail} alt="card" className="image" />

                  <IonCardContent>
                    <IonCardTitle className="title">
                      {match.league.name}
                    </IonCardTitle>
                  </IonCardContent>
                </IonCard>
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };

  const renderAlsoWatchCards = (leauge: string) => {
    const leaugeMatch = watchGames.filter(
      (match) => match.league.name === leauge
    );

    if (leaugeMatch.length === 0) {
      return null;
    }

    const { thumbnail, link } = getThumbnailAndLink(leauge);

    return (
      <Swiper spaceBetween={0} slidesPerView="auto" className="watch-slides">
        {leaugeMatch.map((match) => {
          return (
            <SwiperSlide key={leauge} className="alsowatch-slide">
              <IonCard className="small-card">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="watch-slide-anchor"
                >
                  <img src={thumbnail} alt="card" className="small-image" />

                  <IonCardContent>
                    <IonCardTitle className="small-title">
                      {match.league.name}
                    </IonCardTitle>
                    <IonNote className="small-subtitle" slot="">
                      {match.league.name}
                    </IonNote>
                  </IonCardContent>
                </a>
              </IonCard>
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
        <Swiper spaceBetween={0} slidesPerView="auto" className="watch-slides">
          {leauges.map((leauge) => renderWatchCards(leauge))};
        </Swiper>
        <IonTitle className="watch-title">Also Watch</IonTitle>
      </IonContent>
    </IonPage>
  );
};

export default Watch;
