import React from "react";
import PruIcon from "components/UI/PruIcon/PruIcon";
import { IRow } from "./types";

export const needs32: IRow[] = [
  {
    header: "Wydatki bieżące",
    products: [
      {
        icon: <PruIcon type="life-cost-to-fifty-thousand-residents" />,
        desc: "Miejscowość do 100 tysięcy mieszkańców",
        cost: 1600,
      },
      {
        icon: <PruIcon type="life-cost-to-fifty-thousand-residents" />,
        desc: "Miejscowość do 500 tysięcy mieszkańców",
        cost: 2400,
      },
      {
        icon: <PruIcon type="life-cost-above-two-milion-residents" />,
        desc: "Aglomeracja powyżej 500 tysięcy mieszkańców",
        cost: 4100,
      },
    ],
  },
  {
    header: "Utrzymanie nieruchomości",
    products: [
      {
        icon: <PruIcon type="bed" />,
        desc: "Mieszkanie, które posiadam",
        cost: 1100,
      },
      {
        icon: <PruIcon type="double-bed" />,
        desc: "Mieszkanie o podwyższonym standardzie",
        cost: 2000,
      },
      {
        icon: <PruIcon type="house" />,
        desc: "Dom",
        cost: 2500,
      },
    ],
  },
  {
    header: "Dostęp do opieki medycznej",
    products: [
      {
        icon: <PruIcon type="health-care-state" />,
        desc: "Państwowa",
        cost: 400,
      },
      {
        icon: <PruIcon type="health-care-private" />,
        desc: "Prywatny dostęp do internisty, specjalistów",
        cost: 850,
      },
      {
        icon: <PruIcon type="health-care-full" />,
        desc: "Prywatny dostęp do internisty, specjalistów i hospitalizacji",
        cost: 2000,
      },
    ],
  },
  {
    header: "Komunikacja",
    products: [
      {
        icon: <PruIcon type="transport-public" />,
        desc: "Publiczna",
        cost: 150,
      },
      {
        icon: <PruIcon type="car-average" />,
        desc: "Samochód",
        cost: 800,
      },
      {
        icon: <PruIcon type="transport-taxi" />,
        desc: "Samochód i taksówki",
        cost: 1200,
      },
    ],
  },
  {
    header: "Przyjemności - kino, teatr, sport, inne",
    products: [
      {
        icon: <PruIcon type="pleasure-no" />,
        desc: "Nie",
        cost: 0,
      },
      {
        icon: <PruIcon type="pleasure-cinema" />,
        desc: "Tak, średnio 2-3 razy w miesiącu",
        cost: 300,
      },
      {
        icon: <PruIcon type="pleasure-theater" />,
        desc: "Tak, więcej niż trzy razy w miesiącu",
        cost: 600,
      },
    ],
  },
];

export const needs33: IRow[] = [
  {
    products: [
      {
        icon: <PruIcon type="small-yacht" />,
        desc: "Mały jacht na Mazurach",
        cost: 300000,
      },
      {
        icon: <PruIcon type="air-plane" />,
        desc: "Własna awionetka",
        cost: 500000,
      },
      {
        icon: <PruIcon type="luxury-car" />,
        desc: "Luksusowy samochód",
        cost: 250000,
      },
      {
        icon: <PruIcon type="big-yacht" />,
        desc: "Duży jacht",
        cost: 1500000,
      },
    ],
  },

  {
    products: [
      {
        icon: <PruIcon type="bigger-house" />,
        desc: "Większe mieszkanie",
        cost: 400000,
      },
      {
        icon: <PruIcon type="house-outside-city" />,
        desc: "Domek za miastem",
        cost: 450000,
      },
      {
        icon: <PruIcon type="house-in-city" />,
        desc: "Dom w mieście",
        cost: 1000000,
      },
      {
        icon: <PruIcon type="house-in-big-city" />,
        desc: "Dom w dużym mieście",
        cost: 1600000,
      },
    ],
  },

  {
    products: [
      {
        icon: <PruIcon type="plot-in-masuria" />,
        desc: "Działka na Mazurach",
        cost: 250000,
      },
      {
        icon: <PruIcon type="plot-with-house" />,
        desc: "Działka z domem całorocznym",
        cost: 450000,
      },
      {
        icon: <PruIcon type="mediterranean-sea-apartment" />,
        desc: "Apartament nad Morzem Śródziemnym",
        cost: 600000,
      },
      {
        icon: <PruIcon type="mediterranean-sea-villa" />,
        desc: "Willa nad Morzem Śródziemnym",
        cost: 2000000,
      },
    ],
  },

  {
    products: [
      {
        icon: <PruIcon type="one-hundred-thousand" />,
        desc: "Sto tysięcy złotych",
        cost: 100000,
      },
      {
        icon: <PruIcon type="thirty-thousand" />,
        desc: "Trzysta tysięcy złotych",
        cost: 300000,
      },
      {
        icon: <PruIcon type="sixty-thousand" />,
        desc: "Pięćset tysięcy złotych",
        cost: 500000,
      },
      {
        icon: <PruIcon type="one-milion" />,
        desc: "Pierwszy milion",
        cost: 1000000,
      },
    ],
  },

  {
    products: [
      {
        icon: <PruIcon type="journey-to-africa" />,
        desc: "Wyprawa do Afryki",
        cost: 30000,
      },
      {
        icon: <PruIcon type="journey-to-australia" />,
        desc: "Wyprawa do Australii i Oceanii",
        cost: 50000,
      },
      {
        icon: <PruIcon type="journey-to-america" />,
        desc: "100 dni w Ameryce",
        cost: 100000,
      },
      {
        icon: <PruIcon type="journey-around-the-world" />,
        desc: "Wyprawa dookoła świata",
        cost: 200000,
      },
    ],
  },
];

export const needs34: IRow[] = [
  {
    header: "Opłaty za studia",
    products: [
      {
        icon: <PruIcon type="studies-state" />,
        desc: "Państwowe",
        cost: 12000,
      },
      {
        icon: <PruIcon type="studies-private" />,
        desc: "Prywatne",
        cost: 75000,
      },
      {
        icon: <PruIcon type="studies-foreign" />,
        desc: "Zagraniczne",
        cost: 360000,
      },
    ],
  },
  {
    header: "Standard mieszkania",
    products: [
      {
        icon: <PruIcon type="apartment-own" />,
        desc: "Mieszkanie własne (już posiadam)",
        cost: 66000,
      },
      {
        icon: <PruIcon type="dormitory" />,
        desc: "Akademik",
        cost: 36000,
      },
      {
        icon: <PruIcon type="apartment-rental" />,
        desc: "Mieszkanie wynajęte",
        cost: 150000,
      },
    ],
  },
  {
    header: "Koszt życia",
    products: [
      {
        icon: <PruIcon type="life-cost-to-fifty-thousand-residents" />,
        desc: "Miejscowość do 500 tysięcy mieszkańców",
        cost: 72000,
      },
      {
        icon: <PruIcon type="life-cost-to-fifty-thousand-residents" />,
        desc: "Aglomeracja powyżej 500 tysięcy mieszkańców",
        cost: 84000,
      },
      {
        icon: <PruIcon type="life-cost-above-two-milion-residents" />,
        desc: "Aglomeracja powyżej 2 milionów mieszkańców",
        cost: 96000,
      },
    ],
  },
  {
    header: "Samochód",
    products: [
      {
        icon: <PruIcon type="car-moderate" />,
        desc: "Skromny",
        cost: 40000,
      },
      {
        icon: <PruIcon type="car-average" />,
        desc: "Średni",
        cost: 60000,
      },
      {
        icon: <PruIcon type="car-average" />,
        desc: "Wygodny",
        cost: 100000,
      },
    ],
  },
  {
    header: "Ślub",
    products: [
      {
        icon: <PruIcon type="wedding-moderate" />,
        desc: "Skromny",
        cost: 30000,
      },
      {
        icon: <PruIcon type="wedding-average" />,
        desc: "Średni",
        cost: 50000,
      },
      {
        icon: <PruIcon type="wedding-sumptuous" />,
        desc: "Wystawny",
        cost: 100000,
      },
    ],
  },
  {
    header: "Wkład własny na zakup mieszkania",
    products: [
      {
        icon: <PruIcon type="place-to-fifty-thousand-residents" />,
        desc: "Miejscowość do 500 tysięcy mieszkańców",
        cost: 50000,
      },
      {
        icon: <PruIcon type="place-above-fifty-thousand-residents" />,
        desc: "Aglomeracja powyżej 500 tysięcy mieszkańców",
        cost: 60000,
      },
      {
        icon: <PruIcon type="place-above-two-milion-residents" />,
        desc: "Aglomeracja powyżej 2 milionów mieszkańców",
        cost: 100000,
      },
    ],
  },
];
