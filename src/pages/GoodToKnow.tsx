import {
  CreateAnimation,
  createGesture,
  Gesture,
  GestureDetail,
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
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
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  addOutline,
  moonOutline,
  sunnyOutline,
  trashBinOutline,
} from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";

const GoodToKnow: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  //for the modal cards and the list
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any[]>([]);
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const cardModal = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const page = useRef(null);
  const [activeSegment, setActiveSegment] = useState<any>("details");

  useEffect(() => {
    setPresentingElement(page.current);
  });

  const fetchUsers = async () => {
    const users = await getUsers();
    console.table(users);
    setUsers(users);
    setLoading(false);
  };
  useIonViewWillEnter(() => {
    fetchUsers();
  });

  const getUsers = async () => {
    const data = await fetch("https://randomuser.me/api?results=10");
    const users = await data.json();
    return users.results;
  };

  const clearList = () => {
    showAlert({
      header: "Confirm!",
      message: "Are you sure you want to delete all users?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Delete",
          handler: () => {
            setUsers([]);
            showToast({
              message: "All users deleted",
              duration: 1750,
              color: "danger",
            });
          },
        },
      ],
    });
  };

  const doRefresh = async (event: any) => {
    const data = await getUsers();
    setUsers(data);
    event.detail.complete();
  };

  //For the red box
  const animationRef = useRef<CreateAnimation>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useIonViewDidEnter(() => {
    //animationRef.current?.animation.play();
    const gesture: Gesture = createGesture({
      el: elementRef.current!,
      threshold: 0,
      gestureName: "my-gesture",
      onStart: (ev) => onStart(ev),
      onMove: (ev) => onMoveHandler(ev),
      onEnd: (ev) => onEndHandler(ev),
    });
    gesture.enable();
  });

  const onStart = (detail: GestureDetail) => {
    elementRef.current!.style.transition = "none";
  };

  const onMoveHandler = (detail: GestureDetail) => {
    const x = detail.currentX - detail.startX;
    const y = detail.currentY - detail.startY;

    elementRef.current!.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onEndHandler = (detail: GestureDetail) => {
    elementRef.current!.style.transition = "700ms ease-out";
    elementRef.current!.style.transform = `translate(0px, 0px)`;
  };

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Good2No</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" scrollY={false}>
        This is for all the stuff I dont want to delete cause it could be useful
        to me in the future But I dont want to have in the actual website, so
        the only way to get here will be if you know the page name, nothing cool
        or 'in the works' is here either just things I want to know how to do.
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={(ev) => doRefresh(ev)}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <IonButton className="dark-mode" onClick={toggleDarkMode}>
            <IonIcon
              slot="start"
              icon={darkMode ? moonOutline : sunnyOutline}
            />
            {darkMode ? "Dark Mode" : "Light Mode"}
          </IonButton>

          {loading &&
            [...Array(10)].map((_, index) => (
              <IonCard key={index}>
                <IonCardContent className="ion-no-padding">
                  <IonItem lines="none">
                    <IonAvatar slot="start">
                      <IonSkeletonText />
                    </IonAvatar>
                    <IonLabel>
                      <IonSkeletonText animated style={{ width: "150px" }} />
                      <p>
                        <IonSkeletonText />
                      </p>
                    </IonLabel>
                    <IonChip slot="end" color={"primary"}></IonChip>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))}

          {users.map((user, index) => (
            <IonCard key={index} onClick={() => setSelectedUser(user)}>
              <IonCardContent className="ion-no-padding">
                <IonItem lines="none">
                  <IonAvatar slot="start">
                    <IonImg src={user.picture.thumbnail} />
                  </IonAvatar>
                  <IonLabel>
                    {user.name.first} {user.name.last}
                    <p>{user.email}</p>
                  </IonLabel>
                  <IonChip slot="end" color={"primary"}>
                    {user.nat}
                  </IonChip>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}

          <IonModal
            breakpoints={[0, 0.5, 0.8]}
            initialBreakpoint={0.5}
            ref={modal}
            isOpen={selectedUser !== null}
            onIonModalDidDismiss={() => setSelectedUser(null)}
          >
            <IonHeader>
              <IonToolbar color={"light"}>
                <IonButtons slot="start">
                  <IonButton onClick={() => modal.current?.dismiss()}>
                    Close
                  </IonButton>
                </IonButtons>
                <IonTitle>
                  {selectedUser?.name.first} {selectedUser?.name.last}
                </IonTitle>
              </IonToolbar>
              <IonToolbar color={"light"}>
                <IonSegment
                  value={activeSegment}
                  onIonChange={(e) => setActiveSegment(e.detail.value!)}
                >
                  <IonSegmentButton value="details">Details</IonSegmentButton>
                  <IonSegmentButton value="calendar">Calendar</IonSegmentButton>
                </IonSegment>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              {activeSegment === "details" && (
                <IonCard>
                  <IonAvatar slot="start">
                    <IonImg src={selectedUser?.picture.large} />
                  </IonAvatar>
                  <IonCardContent className="ion-no-padding">
                    <IonItem lines="none">
                      <IonLabel class="ion-text-wrap">
                        {selectedUser?.name.first} {selectedUser?.name.last}
                        <p>{selectedUser?.email}</p>
                      </IonLabel>
                    </IonItem>
                  </IonCardContent>
                </IonCard>
              )}
              {activeSegment === "calendar" && <IonDatetime />}
            </IonContent>
          </IonModal>
        </IonContent>
        <IonModal
          ref={cardModal}
          trigger="card-modal"
          presentingElement={presentingElement!}
        >
          <IonHeader>
            <IonToolbar color={"success"}>
              <IonButtons slot="start">
                <IonButton onClick={() => cardModal.current?.dismiss()}>
                  Close
                </IonButton>
              </IonButtons>
              <IonTitle>Card Modal</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <p>My card modal</p>
          </IonContent>
        </IonModal>
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton id="card-modal">
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={clearList}>
            <IonIcon icon={trashBinOutline} />
          </IonFabButton>
        </IonFab>
        <CreateAnimation
          ref={animationRef}
          duration={2000}
          iterations={Infinity}
          delay={1000}
          keyframes={[
            { offset: 0, transform: "scale(1)", opacity: "1" },
            { offset: 0.5, transform: "scale(1.5)", opacity: "0.5" },
            { offset: 1, transform: "scale(1)", opacity: "1" },
          ]}
        ></CreateAnimation>
        <div
          ref={elementRef}
          className="box"
          style={{ width: 50, height: 50, backgroundColor: "red" }}
        />
      </IonContent>
    </IonPage>
  );
};

export default GoodToKnow;
