import { Drawer, IconButton, useMediaQuery } from "@mui/material";
import React from "react";

import styles from "./DrawerMenu.module.css";
import { useDrawer } from "@/context/DrawerContext";
import MenuButton from "../menuButton/MenuButton";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import ButtonDefault from "../buttonDefault/ButtonDefault";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface DrawerMenuProps {
  data?: any;
  drawerWidth: number;
}

const DrawerMenu = ({ data, drawerWidth }: DrawerMenuProps) => {
  const router = useRouter();
  const { logoutDeleteToken } = useAuth();

  const { isOpen, closeDrawer } = useDrawer();

  const isCollapsible = useMediaQuery("(max-width: 768px)");

  const handleDrawerClose = () => {
    closeDrawer();
  };

  const handleLogout = () => {
    logoutDeleteToken();
    router.push("/");
  };

  const renderButtons = () => {
    return (
      <>
        <MenuButton
          icon={<FolderSharedIcon />}
          text="Editar Perfil"
          redirectTo={"/profile"}
        ></MenuButton>
        <MenuButton
          icon={<PersonAddAltIcon />}
          text="Contas"
          redirectTo={"/accounts"}
        ></MenuButton>
        <MenuButton
          icon={<CurrencyExchangeIcon />}
          text="Transação"
          redirectTo={"/transactions"}
        ></MenuButton>
        <MenuButton
          icon={<ReceiptIcon />}
          text="Extrato"
          redirectTo={"/extract"}
        ></MenuButton>
        <div className={styles.menuFooter}>
          <ButtonDefault
            icon={<LogoutIcon />}
            text="Sair"
            handleClick={handleLogout}
          ></ButtonDefault>
        </div>
      </>
    );
  };

  const RenderMenuContent = () => (
    <div className={styles.menuContent}>{renderButtons()}</div>
  );

  const RenderTemporaryMenuContent = () => (
    <div className={styles.menuContent}>
      <div className={styles.closeButton}>
        <IconButton
          onClick={handleDrawerClose}
          sx={{
            color: "var(--color-white)",
            "&:hover": {
              backgroundColor: "var(--color-primary-dark)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      {renderButtons()}
    </div>
  );

  return isCollapsible ? (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isOpen}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true,
      }}
      classes={{
        paper: styles.drawerPaperMobile,
      }}
      sx={{
        "& .MuiDrawer-paper": { width: "100%" },
      }}
    >
      <RenderTemporaryMenuContent />
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      open
      classes={{
        paper: styles.drawerPaper,
      }}
      sx={{
        "& .MuiDrawer-paper": { width: drawerWidth },
      }}
    >
      <RenderMenuContent />
    </Drawer>
  );
};

export default DrawerMenu;
