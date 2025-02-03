import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { logInOutline, personCircleOutline, play, text } from "ionicons/icons";
import PEST_logo from "../assets/PEST_logo.svg";
import Intro from "../components/Intro";
import { Preferences } from "@capacitor/preferences";

const INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
  const router = useIonRouter();
  const [introSeen, setIntroSeen] = useState(true);
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      console.log("🚀 ~ file: Login.tst:17 ~ checkStorage ~ seen:", seen);
      setIntroSeen(seen.value === "true");
    };
    checkStorage();
  }, []);

  const doLogin = async (event: any) => {
    event.preventDefault();
    await present("Logging in...");
    setTimeout(async () => {
      dismiss();
      router.push("/app", "root");
    }, 1500);
    // TODO: some kind of backend integration looking for username/email and password.
  };

  const finishIntro = async () => {
    console.log("FIN");
    setIntroSeen(true);
    Preferences.set({ key: INTRO_KEY, value: "true" });
  };

  const seeIntroAgain = () => {
    setIntroSeen(false);
    Preferences.remove({ key: INTRO_KEY });
  };
  return (
    <>
      {!introSeen ? (
        <Intro onFinish={finishIntro} />
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar color={"tertiary"}>
              <IonTitle></IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent scrollY={false} className="ion-padding">
            <IonGrid fixed>
              <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <IonTitle className="login-title">PEST</IonTitle>
                  <div className="ion-text-center ion-padding">
                    <img src={PEST_logo} alt="PEST Logo" width={"50%"} />
                  </div>
                </IonCol>
              </IonRow>

              <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <IonCard>
                    <IonCardContent>
                      <form onSubmit={doLogin}>
                        <IonInput
                          fill="outline"
                          labelPlacement="floating"
                          label="Email:"
                          type="email"
                          placeholder="username@email.com"
                        ></IonInput>
                        <IonInput
                          className="ion-margin-top"
                          fill="outline"
                          labelPlacement="floating"
                          label="Password:"
                          type="password"
                        ></IonInput>
                        <IonButton
                          type="submit"
                          expand="block"
                          className="ion-margin-top"
                        >
                          Login
                          <IonIcon icon={logInOutline} slot="end" />
                        </IonButton>
                        <IonButton
                          routerLink="/register"
                          type="button"
                          expand="block"
                          className="ion-margin-top"
                          color={"secondary"}
                        >
                          Create Account
                          <IonIcon icon={personCircleOutline} slot="end" />
                        </IonButton>
                        <IonButton
                          onClick={seeIntroAgain}
                          size="small"
                          fill="clear"
                          type="button"
                          expand="block"
                          className="ion-margin-top"
                          color={"medium"}
                        >
                          Watch intro again
                          <IonIcon icon={play} slot="end" />
                        </IonButton>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Login;
