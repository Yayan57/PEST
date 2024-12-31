import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { Children } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import Intro1Img from "../assets/intro/League_of_Legends_2019_vector.svg";
import Intro2Img from "../assets/intro/stats-svgrepo-com.svg";
import Intro3Img from "../assets/intro/Live-Streaming-App-Development-1.svg";
import Intro4Img from "../assets/intro/chess-pawn.svg";
import "./Intro.css";
interface ContainerProps {
  onFinish: () => void;
}

const SwiperButtonNext = ({ children }: any) => {
  const swiper = useSwiper();
  return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>;
};

const Intro: React.FC<ContainerProps> = ({ onFinish }) => {
  return (
    <Swiper className="intro-swiper">
      <SwiperSlide className={`intro-slides`}>
        <img src={Intro1Img} width={"50%"} alt="Leauge of legends logo" />
        <IonText>
          <h2>
            Intro 1 slide -to be made later, something about keeping up with
            your fav esports-
          </h2>
        </IonText>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>
      <SwiperSlide className={`intro-slides`}>
        <img
          src={Intro2Img}
          width={"50%"}
          alt="image representing statistics"
        />
        <IonText>
          <h2>
            Intro 2 slide -to be made later, something about stats from all the
            games-
          </h2>
        </IonText>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>
      <SwiperSlide className={`intro-slides`}>
        <img
          src={Intro3Img}
          width={"50%"}
          alt="image representing live streaming"
        />
        <img src={Intro4Img} width={"50%"} alt="image showing chess pawn" />
        <IonText>
          <h2>
            Intro 3 slide -to be made later, not just esports but creator and
            chess events too!-
          </h2>
        </IonText>
        <IonButton onClick={() => onFinish()}>Finish</IonButton>
      </SwiperSlide>
    </Swiper>
  );
};

export default Intro;
