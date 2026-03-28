import CallImg from "../Media/Contact Icons/Call.jpg";
import WhatsappImg from "../Media/Contact Icons/Whatsaap.jpg";
import LinkdInImg from "../Media/Contact Icons/LinkdIn.png";
import FacebookImg from "../Media/Contact Icons/Facebook.png";
import InstagramImg from "../Media/Contact Icons/Instagram.jpg";
import MailImg from "../Media/Contact Icons/Mail.jpg";
import ArattaiImg from "../Media/Contact Icons/Arattai.png";
import HomeImg from "../Media/Fiancial(Horizontal).png";
import PlayImg from "../Media/Contact Icons/PlayStore.jpg";
import IstoreImg from "../Media/Contact Icons/Istore.jpg";

const CallIcon = ({ size = 32 }) => {
  return (
    <img
      src={CallImg}
      alt="Call Icon"
      width={size}
      height={size}
      style={{ borderRadius: "2px" }}
    />
  );
};

const WhatsappIcon = ({ size = 32 }) => {
  return (
    <img
      src={WhatsappImg}
      alt="Whatsapp Icon"
      width={size}
      height={size}
      style={{ borderRadius: "2px" }}
    />
  );
};

const LinkdInIcon = ({ size = 32 }) => {
  return (
    <img
      src={LinkdInImg}
      alt="LinkdIn Icon"
      width={size}
      height={size}
      style={{ borderRadius: "2px" }}
    />
  );
};
const FacebookIcon = ({ size = 32 }) => {
  return (
    <img
      src={FacebookImg}
      alt="Facebook Icon"
      width={size}
      height={size}
      style={{ borderRadius: "2px" }}
    />
  );
};

const InstagramIcon = ({ size = 32 }) => {
  return (
    <img
      src={InstagramImg}
      alt="Instagram Icon"
      width={size}
      height={size}
      style={{ borderRadius: "2px" }}
    />
  );
};

const MailIcon = ({ size = 32 }) => {
  return (
    <img
      src={MailImg}
      alt="Mail Icon"
      width={size}
      height={size}
      style={{ borderRadius: "2px" }}
    />
  );
};

const ArattaiIcon = ({ size = 32 }) => {
  return (
    <img
      src={ArattaiImg}
      alt="Arattai Icon"
      width={size}
      height={size}
      style={{ borderRadius: "2px" }}
    />
  );
};

const HomeIcon = ({ size = 32 }) => {
  return (
    <img
      src={HomeImg}
      alt="Home Icon"
      width={size*2}
      height={size/2}
      style={{ borderRadius: "2px" }}
    />
  );
};

const PlayIcon = ({ size = 32 }) => {
  return (
    <img
      src={PlayImg}
      alt="Play Icon"
      width={size * 5}
      height={size * 1.5}
      style={{ borderRadius: "7px" }}
    />
  );
};

const IstoreIcon = ({ size = 32 }) => {
  return (
    <img
      src={IstoreImg}
      alt="Istore Icon"
      width={size * 5}
      height={size * 1.5}
      style={{ borderRadius: "7px" }}
    />
  );
};

export {
  CallIcon,
  WhatsappIcon,
  LinkdInIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  ArattaiIcon,
  HomeIcon,
  PlayIcon,
  IstoreIcon,
};
