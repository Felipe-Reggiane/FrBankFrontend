import { Button } from "@mui/material";
import styles from "./header.module.css";
import { useDrawer } from "@/context/DrawerContext";

const Header = () => {
  const { toggleDrawer } = useDrawer();
  return (
    <div className={styles.container}>
      <h1>Header</h1>
      <Button onClick={toggleDrawer}>abrir modal</Button>
    </div>
  );
};

export default Header;
