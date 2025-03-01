import { Link } from "react-router-dom";

interface CustomLinkProps {
  title: string,
  route: string
};

export const CustomLink: React.FC<CustomLinkProps> = ({
  route,
  title
}) => {
  return (
    <Link to={route} className="fav-link">
      {title}
    </Link>
  );
}