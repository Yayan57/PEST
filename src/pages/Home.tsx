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

const Home: React.FC = () => {
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
        <IonCard className="headline-card">
          <IonTitle className="headline-title">Top Headlines</IonTitle>
          <div className="headline-divider" />
          {articles.map((article) => {
            return (
              <div className="headlines">
                <IonIcon slot="icon-only" icon={listOutline} color="dark" />
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="headline-link"
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
