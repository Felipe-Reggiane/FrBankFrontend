"use client";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const Home = () => {
  useAuthGuard(true);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of the application.</p>
    </div>
  );
};

export default Home;
