import { createOpenAI } from '@ai-sdk/openai';

export const WORKER_BASE_URL = "https://davagent.personaldolor.workers.dev/v1";
export const DEFAULT_MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

export const cloudflareBrain = createOpenAI({
  baseURL: WORKER_BASE_URL,
  apiKey: "none", // Keyless authentication via Worker backend
});

export const getTravelerModel = (modelOverride?: string) => {
  return cloudflareBrain(modelOverride || DEFAULT_MODEL);
};
