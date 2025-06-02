import { Button, IconButton, Typography, useMediaQuery } from "@mui/material";
import styles from "./header.module.css";
import { useDrawer } from "@/context/DrawerContext";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const { toggleDrawer } = useDrawer();
  const [clientName, setClientName] = useState<string>("");

  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setClientName(decoded.nome || "Cliente");
      } catch {
        setClientName("Cliente");
      }
    }
  }, []);

  const handleHomeClick = () => {
    router.push("/home");
  };

  const renderHeaderDesktok = () => {
    return (
      <>
        <IconButton onClick={handleHomeClick}>
          <HomeIcon sx={{ color: "var(--color-primary-dark)" }} />
        </IconButton>
        <Typography
          color="var(--color-primary-dark)"
          fontWeight={600}
          variant="h6"
        >
          Cliente: {clientName}
        </Typography>
      </>
    );
  };

  const renderHeaderMobile = () => {
    return (
      <>
        <IconButton onClick={handleHomeClick}>
          <HomeIcon sx={{ color: "var(--color-primary-dark)" }} />
        </IconButton>
        <Typography
          color="var(--color-primary-dark)"
          fontWeight={600}
          variant="h6"
        >
          Cliente: {clientName}
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <MenuIcon sx={{ color: "var(--color-primary-dark)" }} />
        </IconButton>
      </>
    );
  };

  return (
    <div className={styles.container}>
      {isMobile ? renderHeaderMobile() : renderHeaderDesktok()}
    </div>
  );
};

export default Header;
