import { Button, Drawer, useMediaQuery } from "@mui/material";
import { useState } from "react";
import React from "react";

import styles from "./DrawerMenu.module.css";
import { useDrawer } from "@/context/DrawerContext";
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
      <h1>Menu</h1>
    </div>
  );

  const RenderTemporaryMenuContent = () => (
    <div className={styles.menuContent}>
      <h1>Menu</h1>
      <Button onClick={handleDrawerClose}>Fechar</Button>
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
