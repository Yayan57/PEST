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
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
//import "swiper/css";
import LOLthumbnail from "../assets/images/lol_thumbnail.jfif";
import CS2thumbnail from "../assets/images/cs2_thumbnail.jfif";
import RLthumbnail from "../assets/images/rl_thumbnail.jfif";
import "./Watch.css";

const Watch: React.FC = () => {
  const data = [
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
        <IonToolbar color={"success"}>
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
        <IonCard>
          <IonTitle style={{ color: "black" }}>Watch Here</IonTitle>
          <Swiper
            spaceBetween={0}
            slidesPerView="auto"
            className="watch-slides"
          >
            {data.map((card, index) => {
              return (
                <SwiperSlide key={`slide_${index}`} className="watch-slide">
                  <a href={card.link} target="_blank" rel="noopener noreferrer">
                    <IonCard color={"tertiary"}>
                      <img src={card.image} alt="card" className="image" />

                      <IonCardContent>
                        <IonCardTitle className="title">
                          {card.title}
                        </IonCardTitle>
                        <IonNote className="subtitle" slot="">
                          {card.subtitle}
                        </IonNote>
                      </IonCardContent>
                    </IonCard>
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Watch;
