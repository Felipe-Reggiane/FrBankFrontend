import styles from "./ButtonDefault.module.css";
import { Button } from "@mui/material";

interface MenuButtonProps {
  handleClick: () => void;
  text: string;
  icon?: React.ReactNode;
}

const MenuButton = ({ handleClick, text, icon }: MenuButtonProps) => {
  return (
    <div className={styles.buttonContainer}>
      <Button
        startIcon={icon ? icon : undefined}
        onClick={handleClick}
        sx={{
          width: "100%",
          height: "100%",
          color: "var(--color-white)",
          borderRadius: "14px",
          "&:hover": {
            backgroundColor: "var(--color-primary-dark)",
            borderRadius: "14px",
          },
        }}
      >
        {text}
      </Button>
    </div>
  );
};
export default MenuButton;
