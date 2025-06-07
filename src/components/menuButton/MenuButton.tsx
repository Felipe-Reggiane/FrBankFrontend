import styles from "./MenuButton.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface MenuButtonProps {
  redirectTo: string;
  text: string;
  icon: React.ReactNode;
  customOnClick?: () => void;
}

const MenuButton = ({
  redirectTo,
  text,
  icon,
  customOnClick,
}: MenuButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(redirectTo);
    if (customOnClick) {
      setTimeout(() => {
        customOnClick();
      }, 150);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button
          startIcon={icon}
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
    </div>
  );
};
export default MenuButton;
