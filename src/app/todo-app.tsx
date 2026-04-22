"use client";

import { useEffect, useState } from "react";
import { insforge } from "./insforge-client";

interface Todo {
  id: string;
  text: string;
  created_at: string;
  is_completed: boolean;
}

export function TodoApp({ dashboardUrl }: { dashboardUrl: string }) {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [desktopInfo, setDesktopInfo] = useState<{
    isDesktop: boolean;
    isPackaged: boolean;
    version: string;
    updateState: DesktopUpdateState;
  } | null>(null);
  const [desktopMessage, setDesktopMessage] = useState("");
  const [isWorkingOnUpdate, setIsWorkingOnUpdate] = useState(false);

  const commandText =
    "npx @insforge/cli link --project-id 09edd8a4-b86f-4ca5-9205-8b82ba4e95db --template todo";
  const devText = "cd Newmaker && npm run dev";
  const localUrl = "http://localhost:3001";

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (!window.newmakerDesktop) {
      return;
    }

    let unsubscribe = () => {};

    window.newmakerDesktop.getAppInfo().then((info) => {
      setDesktopInfo(info);
    });

    unsubscribe = window.newmakerDesktop.onUpdateStatus((payload) => {
      setDesktopInfo((current) =>
        current
          ? { ...current, updateState: payload, version: current.version }
          : {
              isDesktop: true,
              isPackaged: false,
              version: payload.version,
              updateState: payload,
            }
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function fetchTodos() {
    setErrorMessage("");
    const { data, error } = await insforge.database
      .from("todo")
      .select()
      .order("created_at", { ascending: false });
    if (error) {
      setErrorMessage("Could not load tasks from InsForge.");
      return;
    }
    if (data) {
      setTodos(data as Todo[]);
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSaving) return;
    setErrorMessage("");
    setIsSaving(true);
    setInput("");
    const optimistic: Todo = {
      id: crypto.randomUUID(),
      text: trimmed,
      created_at: new Date().toISOString(),
      is_completed: false,
    };
    setTodos((prev) => [optimistic, ...prev]);

    const { data, error } = await insforge.database
      .from("todo")
      .insert([{ text: trimmed }])
      .select();

    if (error) {
      setErrorMessage("Task saved locally, but the database request failed.");
      setTodos((prev) => prev.filter((todo) => todo.id !== optimistic.id));
      setInput(trimmed);
      setIsSaving(false);
      return;
    }

    if (data?.length) {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === optimistic.id ? (data[0] as Todo) : todo))
      );
    }

    setIsSaving(false);
  }

  async function handleToggle(id: string, currentValue: boolean) {
    setErrorMessage("");
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, is_completed: !currentValue } : t
      )
    );

    const { error } = await insforge.database
      .from("todo")
      .update({ is_completed: !currentValue })
      .eq("id", id);

    if (error) {
      setErrorMessage("Could not update the task status.");
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, is_completed: currentValue } : todo
        )
      );
    }
  }

  async function handleCheckForUpdates() {
    if (!window.newmakerDesktop) {
      return;
    }
    setIsWorkingOnUpdate(true);
    const result = await window.newmakerDesktop.checkForUpdates();
    setDesktopMessage(result.message);
    if (result.updateState) {
      setDesktopInfo((current) =>
        current ? { ...current, updateState: result.updateState! } : current
      );
    }
    setIsWorkingOnUpdate(false);
  }

  async function handleDownloadUpdate() {
    if (!window.newmakerDesktop) {
      return;
    }
    setIsWorkingOnUpdate(true);
    const result = await window.newmakerDesktop.downloadUpdate();
    setDesktopMessage(result.message);
    if (result.updateState) {
      setDesktopInfo((current) =>
        current ? { ...current, updateState: result.updateState! } : current
      );
    }
    setIsWorkingOnUpdate(false);
  }

  async function handleInstallUpdate() {
    if (!window.newmakerDesktop) {
      return;
    }
    setIsWorkingOnUpdate(true);
    const result = await window.newmakerDesktop.installUpdate();
    setDesktopMessage(result.message);
    setIsWorkingOnUpdate(false);
  }

  return (
    <div className="min-h-screen bg-[#121212] px-5 py-10 text-white sm:px-8 lg:px-10">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-[#7dd3fc]">
            InsForge Backend Ready
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Get Started
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-[#a3a3a3] sm:text-base">
            Your `Newmaker` project is linked, the database is migrated, and this page
            is connected to the live `todo` table in InsForge.
          </p>
        </header>

        <DesktopUpdateCard
          desktopInfo={desktopInfo}
          desktopMessage={desktopMessage}
          isWorkingOnUpdate={isWorkingOnUpdate}
          onCheckForUpdates={handleCheckForUpdates}
          onDownloadUpdate={handleDownloadUpdate}
          onInstallUpdate={handleInstallUpdate}
        />

        <section className="rounded-[28px] border border-white/10 bg-[#1c1c1c] px-5 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:px-8 sm:py-8">
          <div className="grid gap-8 lg:grid-cols-[100px_minmax(0,1fr)]">
            <div className="hidden lg:block">
              <div className="mx-auto flex min-h-full w-px flex-col items-center bg-white/10">
                {[1, 2, 3, 4].map((step, index) => (
                  <div
                    key={step}
                    className={`relative flex w-0 grow items-start justify-center ${
                      index === 3 ? "grow-0" : ""
                    }`}
                  >
                    <span className="absolute top-0 flex h-12 w-12 -translate-y-1/4 items-center justify-center rounded-full border border-white/20 bg-[#2b2b2b] text-lg font-medium text-white">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <StepBlock
                step="1"
                title="Build With Your Agent"
                description="Connect your agent and scaffold a Next.js app with backend and database wiring already configured."
              >
                <CodeRow code={commandText} />
              </StepBlock>

              <StepBlock
                step="2"
                title="Start the Dev Server"
                description="Navigate into the generated project and run the local development server."
              >
                <CodeRow code={devText} />
              </StepBlock>

              <StepBlock
                step="3"
                title="View Your App"
                description="Open the app locally, then jump into the InsForge dashboard when you want to inspect the database."
              >
                <div className="space-y-3">
                  <a
                    href={localUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex text-lg text-[#86efac] underline underline-offset-4"
                  >
                    {localUrl}
                  </a>
                  <div>
                    <a
                      href={dashboardUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex text-sm text-[#7dd3fc] underline underline-offset-4"
                    >
                      Open InsForge database dashboard
                    </a>
                  </div>
                </div>
              </StepBlock>

              <StepBlock
                step="4"
                title="Add A To Do To Your App"
                description="This section writes directly to your InsForge `todo` table and reads the newest rows back into the UI."
              >
                <div className="space-y-4">
                  <form onSubmit={handleAdd} className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Add a new task..."
                      className="h-12 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#86efac]/40"
                    />
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black transition hover:bg-[#e5e5e5] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSaving ? "Saving..." : "Add Todo"}
                    </button>
                  </form>

                  {errorMessage ? (
                    <p className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                      {errorMessage}
                    </p>
                  ) : null}

                  <ul className="space-y-3">
                    {todos.length ? (
                      todos.map((todo) => (
                        <li
                          key={todo.id}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white px-4 py-3 text-black"
                        >
                          <button
                            type="button"
                            onClick={() => handleToggle(todo.id, todo.is_completed)}
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition ${
                              todo.is_completed
                                ? "bg-emerald-500"
                                : "border-2 border-[#d4d4d4] hover:border-emerald-500/50"
                            }`}
                          >
                            {todo.is_completed ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : null}
                          </button>
                          <div className="min-w-0 flex-1">
                            <p
                              className={`text-sm ${
                                todo.is_completed ? "text-[#8a8a8a] line-through" : "text-black"
                              }`}
                            >
                              {todo.text}
                            </p>
                            <p className="mt-1 text-xs text-[#737373]">
                              {new Date(todo.created_at).toLocaleString()}
                            </p>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="rounded-2xl border border-dashed border-white/12 bg-black/10 px-4 py-6 text-sm text-[#a3a3a3]">
                        No todos yet. Add the first item and it will be stored in your
                        InsForge database.
                      </li>
                    )}
                  </ul>
                </div>
              </StepBlock>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function StepBlock({
  step,
  title,
  description,
  children,
}: {
  step: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4 lg:hidden">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#2b2b2b] text-base font-medium">
          {step}
        </span>
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="max-w-3xl text-base text-[#a3a3a3]">{description}</p>
        </div>
      </div>

      <div className="hidden space-y-1 lg:block">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="max-w-3xl text-base text-[#a3a3a3]">{description}</p>
      </div>

      {children}
    </div>
  );
}

function DesktopUpdateCard({
  desktopInfo,
  desktopMessage,
  isWorkingOnUpdate,
  onCheckForUpdates,
  onDownloadUpdate,
  onInstallUpdate,
}: {
  desktopInfo: {
    isDesktop: boolean;
    isPackaged: boolean;
    version: string;
    updateState: DesktopUpdateState;
  } | null;
  desktopMessage: string;
  isWorkingOnUpdate: boolean;
  onCheckForUpdates: () => Promise<void>;
  onDownloadUpdate: () => Promise<void>;
  onInstallUpdate: () => Promise<void>;
}) {
  const updateState = desktopInfo?.updateState;
  const releaseNotes = updateState?.releaseNotes?.trim();

  return (
    <section className="rounded-[24px] border border-white/10 bg-[#171717] px-5 py-5 shadow-[0_16px_60px_rgba(0,0,0,0.25)] sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-[#f5c96b]">
            Desktop Updates
          </p>
          <h2 className="text-2xl font-semibold text-white">
            Install once, then update in place
          </h2>
          <p className="max-w-3xl text-sm text-[#a3a3a3]">
            The desktop build is configured for GitHub release updates. Users install the
            app one time, then future releases can be downloaded and installed from inside
            the app without removing the old version first.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-[#d4d4d4]">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              Current version: {desktopInfo?.version ?? "web mode"}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              Mode: {desktopInfo?.isPackaged ? "desktop package" : "web/dev"}
            </span>
            {updateState?.releaseName ? (
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-emerald-200">
                Latest release: {updateState.releaseName}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onCheckForUpdates}
            disabled={isWorkingOnUpdate || !desktopInfo?.isDesktop}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {updateState?.checking ? "Checking..." : "Check updates"}
          </button>
          <button
            type="button"
            onClick={onDownloadUpdate}
            disabled={
              isWorkingOnUpdate ||
              !desktopInfo?.isDesktop ||
              !updateState?.available ||
              updateState.downloaded
            }
            className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-black transition hover:bg-[#e5e5e5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {updateState?.downloaded ? "Downloaded" : "Download update"}
          </button>
          <button
            type="button"
            onClick={onInstallUpdate}
            disabled={isWorkingOnUpdate || !desktopInfo?.isDesktop || !updateState?.downloaded}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#86efac] px-4 text-sm font-semibold text-black transition hover:bg-[#6ee7b7] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Install update
          </button>
        </div>
      </div>

      {desktopMessage ? (
        <p className="mt-4 rounded-xl border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm text-sky-100">
          {desktopMessage}
        </p>
      ) : null}

      {updateState?.error ? (
        <p className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
          {updateState.error}
        </p>
      ) : null}

      {releaseNotes && updateState ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-white">What&apos;s updated</h3>
            {updateState.releaseDate ? (
              <span className="text-xs text-[#a3a3a3]">
                {new Date(updateState.releaseDate).toLocaleString()}
              </span>
            ) : null}
          </div>
          <pre className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#d4d4d4]">
            {releaseNotes}
          </pre>
        </div>
      ) : (
        <p className="mt-4 text-sm text-[#8a8a8a]">
          Publish a desktop release on GitHub and the release notes will appear here before installation.
        </p>
      )}
    </section>
  );
}

function CodeRow({ code }: { code: string }) {
  async function handleCopy() {
    await navigator.clipboard.writeText(code);
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/8 bg-[#111111] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <code className="overflow-x-auto text-sm text-white">{code}</code>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/6 px-4 text-sm text-white transition hover:bg-white/10"
      >
        Copy
      </button>
    </div>
  );
}
