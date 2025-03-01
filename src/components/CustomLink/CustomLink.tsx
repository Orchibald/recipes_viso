import { Link } from "react-router-dom";
import './CustomLink.css'

interface CustomLinkProps {
  title: string,
  route: string
};

export const CustomLink: React.FC<CustomLinkProps> = ({
  route,
  title
}) => {
  return (
    <Link to={route} className="custom-link">
      {title}
    </Link>
  );
}