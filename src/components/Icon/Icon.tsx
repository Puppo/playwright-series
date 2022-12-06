
import style from "./Icon.module.scss";

interface IconProps {
  title: string;
  src: string;
}

export default function Icon({
  src, title
}: IconProps) {
  return (
    <img className={style.Icon} src={src} title={title} />
  )
}
