import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
  useIonViewWillEnter,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import {
  addOutline,
  listOutline,
  searchOutline,
  settingsOutline,
  trashBinOutline,
} from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import "./Search";
import logo1 from "../assets/images/FaZe-Clan-OnDark.png";
import logo2 from "../assets/images/Sangal-eSports.png";
import video1 from "../assets/images/cs2_thumbnail.webp";
import video2 from "../assets/images/lol_thumbnail.jfif";
import video3 from "../assets/images/rl_thumbnail.jfif";
import { Swiper, SwiperSlide } from "swiper/react";

const Home: React.FC = () => {
  const swiperInfo = [
    {
      video: video1,
      headline: "Faker hits 3k",
      link: "https://www.foolproofme.org/articles/395-the-dangers-of-randomly-clicking-links",
    },
    {
      video: video2,
      headline: "DRX steals baron",
      link: "https://www.foolproofme.org/articles/395-the-dangers-of-randomly-clicking-links",
    },
    {
      video: video3,
      headline: "Teddy escapes certain death",
      link: "https://www.foolproofme.org/articles/395-the-dangers-of-randomly-clicking-links",
    },
    {
      video: video1,
      headline: "Doran saves Keria",
      link: "https://www.foolproofme.org/articles/395-the-dangers-of-randomly-clicking-links",
    },
  ];

  const featuredGame = [
    {
      team1: "T1",
      team2: "DRX",
      score1: 3,
      score2: 2,
      team1logo: logo1,
      team2logo: logo2,
      team1color: "red",
      team2color: "blue",
      SwiperInformation: swiperInfo,
    },
  ];
  const articles = [
    {
      headline: "Faker Leads T1 to Another Championship Victory at Worlds 2025",
      link: "https://www.foolproofme.org/articles/395-the-dangers-of-randomly-clicking-links",
    },
    {
      headline:
        "NAVI's s1mple Breaks Records with Unbelievable 1v5 Clutch in CS:GO Major",
      link: "https://www.foolproofme.org/articles/395-the-dangers-of-randomly-clicking-links",
    },
    {
      headline:
        "Team Liquid Dominates LCS Summer Split with Doublelift's Return",
      link: "https://www.foolproofme.org/articles/395-the-dangers-of-randomly-clicking-links",
    },
    {
      headline:
        "NRG's Clix Wins Fortnite World Cup, Setting New Standards for Solo Play",
      link: "https://www.foolproofme.org/articles/395-the-dangers-of-randomly-clicking-links",
    },
    {
      headline: "G2 Esports Stuns the Competition with Perfect Split in LEC",
      link: "https://www.foolproofme.org/articles/395-the-dangers-of-randomly-clicking-links",
    },
    {
      headline:
        "VALORANT's TenZ and Sentinels Claim First Masters Trophy of the Year",
      link: "https://www.foolproofme.org/articles/395-the-dangers-of-randomly-clicking-links",
    },
    {
      headline: "OG’s Ana Returns to Dota 2, Taking Team to Another TI Victory",
      link: "https://www.foolproofme.org/articles/395-the-dangers-of-randomly-clicking-links",
    },
    {
      headline:
        "LOUD’s Aspas Thrills Fans with Unprecedented Ace in VALORANT Champions Finals",
      link: "https://www.foolproofme.org/articles/395-the-dangers-of-randomly-clicking-links",
    },
    {
      headline:
        "C9's Perkz Outplays Rivals in a Historic Pentakill During MSI Finals",
      link: "https://www.foolproofme.org/articles/395-the-dangers-of-randomly-clicking-links",
    },
    {
      headline: "Fnatic's Rekkles Makes Unforgettable Comeback in LEC Playoffs",
      link: "https://www.foolproofme.org/articles/395-the-dangers-of-randomly-clicking-links",
    },
    {
      headline: "Faker to Fnatic?",
      link: "https://www.foolproofme.org/articles/395-the-dangers-of-randomly-clicking-links",
    },
  ];
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>PEST </IonTitle>
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
        {featuredGame.map((game) => {
          return (
            <IonCard className="home-card">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <IonTitle
                  style={{
                    background: `linear-gradient(to right, ${game.team1color}, ${game.team2color})`,
                    color: "white",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  <IonGrid>
                    <IonRow>
                      <IonCol>{game.team1}</IonCol>
                      <IonCol size="6" />
                      <IonCol>{game.team2}</IonCol>
                    </IonRow>
                  </IonGrid>
                </IonTitle>
              </div>
              <IonGrid>
                <IonRow>
                  <IonCol
                    size="3"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IonImg src={game.team1logo} className="score-image" />
                  </IonCol>
                  <IonCol size="6" />
                  <IonCol
                    size="3"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IonImg src={game.team2logo} className="score-image" />
                  </IonCol>
                </IonRow>
              </IonGrid>
              <Swiper
                spaceBetween={0}
                slidesPerView="auto"
                className="watch-slides"
              >
                {game.SwiperInformation.map((info, index) => (
                  <SwiperSlide key={`slide_${index}`} className="watch-slide">
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="home-anchor"
                    >
                      <IonCard className="home-card">
                        <IonImg src={info.video} />
                        <IonCardHeader>
                          <IonCardTitle className="title-text">
                            {info.headline}
                          </IonCardTitle>
                        </IonCardHeader>
                      </IonCard>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
              <IonGrid>
                <IonRow>
                  <IonCol
                    size="6"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IonButton>GameCast</IonButton>
                  </IonCol>
                  <IonCol
                    size="6"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IonButton>BoxScore</IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>
          );
        })}
        <IonCard className="home-card">
          <IonTitle className="headline-title">Top Headlines</IonTitle>
          <div className="headline-divider" />
          {articles.map((article) => {
            return (
              <div className="headlines">
                <IonIcon
                  slot="icon-only"
                  icon={listOutline}
                  className="list-icon"
                />
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-anchor"
                >
                  <IonText className="headline-text">
                    {article.headline}
                  </IonText>
                </a>
              </div>
            );
          })}
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
