export const BASE_URL = "http://127.0.0.1:8000";
export const TASK_BASE = `${BASE_URL}/api/task`;
export const TASK_ID = (id: string) => `${TASK_BASE}/${id}`;
