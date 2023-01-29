import { TicTacToeValue } from '../../models/TicTacToeValue';
import { Nullable } from '../../utils/Nullable';
import Icon from '../Icon/Icon';
import OIcon from './O.png';
import styles from './Square.module.scss';
import XIcon from './X.png';

interface SquareProps {
  value: Nullable<TicTacToeValue>;
  onSelect: () => void
}

export default function Square(
  { value, onSelect }: SquareProps
) {

  const icon = value === 'X' ? XIcon : OIcon;

  return (
    <button
      type='button'
      className={styles.Square}
      onClick={onSelect}>
      {value && <Icon src={icon} title={value} />}
    </button>
  )
}
