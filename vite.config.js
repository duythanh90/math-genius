import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow access from any network
    port: 5173, // Change if needed
    allowedHosts: ["beo.motconvit.com"], // Add your domain here
  },
});