"use client";

import { useState, useEffect } from "react";
import { WaForm } from "./waForm";
import { HistoryList, HistoryItem } from "./historyList";

const STORAGE_KEY = "kirimwa-history";
const MAX_HISTORY = 10;

export function WaLinkGenerator() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error loading history from local storage", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save to local storage whenever history changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error("Error saving history to local storage", e);
    }
  }, [history]);

  const handleSend = (number: string) => {
    // If number already exists in history, remove it (so it can be moved to the top)
    let newHistory = history.filter((item) => item.number !== number);

    const newItem: HistoryItem = {
      id: crypto.randomUUID(),
      number,
      label: "",
      timestamp: Date.now(),
    };

    // Add to top and truncate
    newHistory = [newItem, ...newHistory].slice(0, MAX_HISTORY);
    setHistory(newHistory);
  };

  const updateLabel = (id: string, newLabel: string) => {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, label: newLabel } : item,
      ),
    );
  };

  const deleteItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto w-full">
      <WaForm onSend={handleSend} />
      <HistoryList
        history={history}
        onUpdateLabel={updateLabel}
        onDelete={deleteItem}
      />
    </div>
  );
}
