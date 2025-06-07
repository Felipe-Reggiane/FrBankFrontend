import styles from "./ButtonDefault.module.css";
import { Button } from "@mui/material";

interface ButtonDefaultProps {
  handleClick: () => void;
  text: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  smallButton?: boolean;
}

const ButtonDefault = ({
  handleClick,
  text,
  icon,
  disabled,
  smallButton,
}: ButtonDefaultProps) => {
  return (
    <div
      className={
        smallButton ? styles.smallButtonContainer : styles.buttonContainer
      }
    >
      <Button
        startIcon={icon ? icon : undefined}
        onClick={handleClick}
        disabled={disabled}
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
export default ButtonDefault;
