import styles from "./LayoutWrapper.module.css";
import { DrawerMenu, Header } from "..";
import { useMediaQuery } from "@mui/material";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const isCollapsible = useMediaQuery("(max-width: 768px)"); // Verifica se o DrawerMenu é colapsável
  const drawerWidth = 300; // Largura do DrawerMenu quando permanente

  return (
    <div className={styles.container}>
      <DrawerMenu drawerWidth={drawerWidth} />
      <div
        className={styles.mainContent}
        style={{
          marginLeft: isCollapsible ? 0 : `${drawerWidth}px`, // Ajusta o espaço ao lado do DrawerMenu
        }}
      >
        <Header />
        <div className={styles.pageContent}>{children}</div>
      </div>
    </div>
  );
};

export default LayoutWrapper;
