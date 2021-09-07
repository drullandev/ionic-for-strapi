import React from 'react'
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonImg } from '@ionic/react'
import { useTranslation } from 'react-i18next'

import './About.scss'

interface AboutProps { }

const Page: React.FC<AboutProps> = () => {

  const {t} = useTranslation()

  return (
    <IonPage id='about-page'>

      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <div className='about-header'>
          {/* Instead of loading an image each time the select changes, use opacity to transition them */}
          <IonImg src={'../assets/img/about/madison.jpg'} style={{opacity: '1'}}/>
        </div>

        <div className='about-info'>
          <h3 className='ion-padding-top ion-padding-start'>About</h3>
          <p className='ion-padding-start ion-padding-end'>
            The Ionic Conference is a one-day conference on featuring talks from the Ionic team. It is focused on Ionic applications being built with Ionic Framework. This includes migrating apps to the latest version of the framework, Angular concepts, Webpack, Sass, and many other technologies used in Ionic 2. Tickets are completely sold out, and we’re expecting more than 1000 developers – making this the largest Ionic conference ever!
          </p>
        </div>

      </IonContent>


    </IonPage>
  )
}

export default React.memo(Page)