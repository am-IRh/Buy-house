import { Router } from "express";
import { login, logout, register } from "../controller/auth.controller.js";

/*
  Auth API Routes Documentation
  
  This file defines the API routes related to authentication.
*/
const router = Router();


/*
  POST /api/auth/register
    - Description: Registers a new user.
    - Request Body: (JSON)
        username, email, password
    - Response: 
      - Success: 201 Created
        {
          "message": "User registered successfully."
        }
      - Error: 400 Bad Request
        { "message": "invalid Credentials!" }
      - Error: 500 Internal Server
      {
        "message": "Failed to register User!" 
      }
*/
router.post("/register", register);

router.post("/login", login);
router.post("/logout", logout);

export default router;
