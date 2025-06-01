import { Button, Drawer, useMediaQuery } from "@mui/material";
import { useState } from "react";
import React from "react";

import styles from "./DrawerMenu.module.css";
import { useDrawer } from "@/context/DrawerContext";
import MenuButton from "../menuButton/MenuButton";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ReceiptIcon from "@mui/icons-material/Receipt";

interface DrawerMenuProps {
  data?: any;
  drawerWidth: number;
}

const DrawerMenu = ({ data, drawerWidth }: DrawerMenuProps) => {
  const { isOpen, closeDrawer } = useDrawer();

  const isCollapsible = useMediaQuery("(max-width: 768px)");

  const handleDrawerClose = () => {
    closeDrawer();
  };

  const RenderMenuContent = () => (
    <div className={styles.menuContent}>
      <MenuButton
        icon={<FolderSharedIcon />}
        text="Editar Perfil"
        redirectTo={"/"}
      ></MenuButton>
      <MenuButton
        icon={<PersonAddAltIcon />}
        text="Contas"
        redirectTo={"/accounts"}
      ></MenuButton>
      <MenuButton
        icon={<CurrencyExchangeIcon />}
        text="Transação"
        redirectTo={"/"}
      ></MenuButton>
      <MenuButton
        icon={<ReceiptIcon />}
        text="Extrato"
        redirectTo={"/"}
      ></MenuButton>
    </div>
  );

  const RenderTemporaryMenuContent = () => (
    <div className={styles.menuContent}>
      <Button onClick={handleDrawerClose}>Fechar</Button>
      <MenuButton
        icon={<FolderSharedIcon />}
        text="Edfitar Perfil"
        redirectTo={"/"}
      ></MenuButton>
      <MenuButton
        icon={<PersonAddAltIcon />}
        text="Contas"
        redirectTo={"/accounts"}
      ></MenuButton>
      <MenuButton
        icon={<CurrencyExchangeIcon />}
        text="Transação"
        redirectTo={"/"}
      ></MenuButton>
      <MenuButton
        icon={<ReceiptIcon />}
        text="Extrato"
        redirectTo={"/"}
      ></MenuButton>
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
