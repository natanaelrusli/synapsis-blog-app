import { defineConfig } from "cypress";
import dotenv from 'dotenv'

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      config.env.API_KEY = process.env.API_KEY;
      return config;
    },
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});