import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  logOutOutline,
  searchOutline,
  settingsOutline,
  sunnyOutline,
  moonOutline,
} from "ionicons/icons";
import React, { useState, useEffect } from "react";

const More: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"tertiary"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>More</IonTitle>
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
      <IonContent className="ion-padding">
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: "95%",
            margin: "auto",
          }}
        >
          <IonButton expand="block" routerLink="/" routerDirection="root">
            <IonIcon slot="start" icon={logOutOutline} />
            Logout
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default More;
