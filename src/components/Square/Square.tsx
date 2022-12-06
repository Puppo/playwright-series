import { TicTacToeValue } from '../../models/TicTacToeValue';
import { Nullable } from '../../utils/Nullable';
import Icon from '../Icon/Icon';
import styles from './Square.module.scss';

interface SquareProps {
  value: Nullable<TicTacToeValue>;
  onSelect: () => void
}

export default function Square(
  { value, onSelect }: SquareProps
) {
  return (
    <button
      type='button'
      className={styles.Square}
      onClick={onSelect}>
      {value && <Icon src={`/${value}.png`} title={value} />}
    </button>
  )
}
