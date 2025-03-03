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
import pb from "../lib/pocketbase";
import { useForm } from "react-hook-form";

const INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setLoading] = useState(false);
  const isLoggedIn = pb.authStore.isValid;
  const [badLogin, setBadLogin] = useState(false);
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

  function logout() {
    pb.authStore.clear();
  }

  const doLogin = async (event: any) => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(event.email, event.password);
      setBadLogin(false);
      setTimeout(async () => {
        dismiss();
        router.push("/app", "root");
      }, 1500);
    } catch (e) {
      setBadLogin(true);
    }
  };

  const finishIntro = async () => {
    setIntroSeen(true);
    Preferences.set({ key: INTRO_KEY, value: "true" });
  };

  const seeIntroAgain = () => {
    setIntroSeen(false);
    Preferences.remove({ key: INTRO_KEY });
  };
  return (
    <>
      {isLoading && <p>Loading...</p>}
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
                      <form onSubmit={handleSubmit(doLogin)}>
                        <IonInput
                          fill="outline"
                          labelPlacement="floating"
                          label="Email:"
                          type="email"
                          placeholder="username@email.com"
                          {...register("email")}
                        ></IonInput>
                        <IonInput
                          className="ion-margin-top"
                          fill="outline"
                          labelPlacement="floating"
                          label="Password:"
                          type="password"
                          {...register("password")}
                        ></IonInput>
                        {badLogin && (
                          <p className="bad-login">
                            Incorrect username or password.
                          </p>
                        )}
                        <IonButton
                          type="submit"
                          expand="block"
                          className="ion-margin-top"
                          disabled={isLoading}
                        >
                          {isLoading ? "Loading" : "Login"}
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
