import { z } from "zod";

export default interface ApiResponse {
    issue: string;
    symptom: string;
    medication: string;
    others: string;
    severity: number;
  }

  