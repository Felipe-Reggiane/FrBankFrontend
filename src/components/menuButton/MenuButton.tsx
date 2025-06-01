import styles from "./MenuButton.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface MenuButtonProps {
  redirectTo: string;
  text: string;
  icon: React.ReactNode;
}

const MenuButton = ({ redirectTo, text, icon }: MenuButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    console.log(`Redirecting to: ${redirectTo}`);
    router.push(redirectTo);
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
