import "./Board.scss";

export interface BoardProps {
  text?: string;
}

const Board = (props: BoardProps) => {
  return <>{props.text}</>;
};

export default Board;
