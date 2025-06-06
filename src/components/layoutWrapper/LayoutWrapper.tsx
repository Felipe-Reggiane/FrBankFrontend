import styles from "./LayoutWrapper.module.css";
import { DrawerMenu, Header } from "..";
import { useMediaQuery } from "@mui/material";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const isCollapsible = useMediaQuery("(max-width: 768px)");
  const drawerWidth = 300;

  return (
    <div className={styles.container}>
      <DrawerMenu drawerWidth={drawerWidth} />
      <div
        className={styles.mainContent}
        style={{
          marginLeft: isCollapsible ? 0 : `${drawerWidth}px`,
        }}
      >
        <Header />
        <div className={styles.pageContent}>{children}</div>
      </div>
    </div>
  );
};

export default LayoutWrapper;
