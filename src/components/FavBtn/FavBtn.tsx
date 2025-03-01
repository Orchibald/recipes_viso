import { FaStar } from "react-icons/fa";
import { Recipe } from "../../types/Recipe";
import './FavBtn.css'

interface FavBtnProps {
  onClick: (meal: Recipe) => void,
  isFavorite: boolean,
  meal: Recipe
}

export const FavBtn: React.FC<FavBtnProps> = ({
  onClick,
  isFavorite,
  meal
}) => {
  return (
    <button
      className={`favorite-btn ${isFavorite ? "active" : ""}`}
      onClick={() => onClick(meal)}
    >
      <FaStar
        color={isFavorite ? "yellow" : "white"}
        size={24}
      />
    </button>
  );
}