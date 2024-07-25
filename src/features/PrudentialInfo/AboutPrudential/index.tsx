import React, { FC } from "react";
import Slider from "../commons/Slider";
import { aboutPrudentialSlides } from "./aboutPrudentialSlides";

const AboutPrudential: FC = () => {
  return <Slider slides={aboutPrudentialSlides} />;
};

export default AboutPrudential;
