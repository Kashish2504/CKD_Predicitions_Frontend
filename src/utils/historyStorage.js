// Backend has no history endpoint — we persist locally.
const KEY = "nephrosafe_history";

export const getHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

export const saveAssessment = (record) => {
  const history = getHistory();
  const newRecord = {
    id: `NS-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...record,
  };
  history.unshift(newRecord);
  localStorage.setItem(KEY, JSON.stringify(history));
  return newRecord;
};

export const deleteAssessment = (id) => {
  const history = getHistory().filter((r) => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(history));
  return history;
};

export const getLatestAssessment = () => {
  const history = getHistory();
  return history.length > 0 ? history[0] : null;
};

export const clearHistory = () => localStorage.removeItem(KEY);