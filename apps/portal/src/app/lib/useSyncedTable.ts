import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "./supabase";
import { deleteRow, fetchTable, insertRow, updateRow } from "./db";

/**
 * Loads a table from Supabase, keeps it in sync via realtime, and exposes a
 * useState-style setter — inserts/updates/deletes are inferred by diffing
 * the previous and next arrays and written back to Supabase.
 */
export function useSyncedTable<T extends { id: string }>(
  table: string,
  mapRow: (row: any) => T,
  toRow: (item: T) => Record<string, any>,
  enabled: boolean,
) {
  const [rows, setRowsState] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const rowsRef = useRef<T[]>([]);
  rowsRef.current = rows;

  const reload = useCallback(async () => {
    try {
      const data = await fetchTable(table, mapRow);
      setRowsState(data);
    } catch (err) {
      console.error(`load ${table} failed`, err);
    } finally {
      setLoading(false);
    }
  }, [table]);

  useEffect(() => {
    if (!enabled) return;
    setLoading(true);
    reload();
    const channel = supabase
      .channel(`sync-${table}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, () => reload())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, enabled, reload]);

  const setRows = useCallback(
    (updater: T[] | ((current: T[]) => T[])) => {
      setRowsState((current) => {
        const next = typeof updater === "function" ? (updater as (c: T[]) => T[])(current) : updater;
        // diff and persist
        const prevById = new Map(current.map((r) => [r.id, r]));
        const nextIds = new Set(next.map((r) => r.id));
        for (const item of next) {
          const before = prevById.get(item.id);
          if (!before) {
            insertRow(table, toRow(item));
          } else if (JSON.stringify(before) !== JSON.stringify(item)) {
            updateRow(table, item.id, toRow(item));
          }
        }
        for (const item of current) {
          if (!nextIds.has(item.id)) deleteRow(table, item.id);
        }
        return next;
      });
    },
    [table, toRow],
  );

  return { rows, setRows, loading, reload };
}
