import { useEffect, useState, type FormEvent } from "react";
import { CloseIcon } from "./icons";

type AuthModalProps = {
  mode: "login" | "signup";
  onClose: () => void;
  onSwitch: () => void;
};

function AuthModal({ mode, onClose, onSwitch }: AuthModalProps) {
  const isLogin = mode === "login";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-labelledby="auth-title"
      >
        <div className="relative h-32 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=600&q=80"
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-navy-900/60" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="p-8">
          <h2 id="auth-title" className="font-display text-2xl font-bold text-navy-900">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h2>
          <p className="mt-1 text-sm text-navy-600">
            {isLogin
              ? "Log in to manage your projects and track progress."
              : "Join thousands of homeowners building with confidence."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="auth-name" className="block text-sm font-medium text-navy-700">
                  Full Name
                </label>
                <input
                  id="auth-name"
                  type="text"
                  required
                  className="mt-1.5 w-full rounded-lg border border-navy-200 px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            )}
            <div>
              <label htmlFor="auth-email" className="block text-sm font-medium text-navy-700">
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                required
                className="mt-1.5 w-full rounded-lg border border-navy-200 px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label htmlFor="auth-password" className="block text-sm font-medium text-navy-700">
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                required
                minLength={8}
                className="mt-1.5 w-full rounded-lg border border-navy-200 px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-sm font-medium text-brand-600 hover:text-brand-500">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-500 py-3 font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-400"
            >
              {isLogin ? "Log In" : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-navy-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={onSwitch}
              className="font-semibold text-brand-600 hover:text-brand-500"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function hashToMode(hash: string): "login" | "signup" | null {
  if (hash === "#login") return "login";
  if (hash === "#signup") return "signup";
  return null;
}

export default function AuthSection() {
  const [modal, setModal] = useState<"login" | "signup" | null>(() =>
    hashToMode(window.location.hash),
  );

  useEffect(() => {
    function onHashChange() {
      setModal(hashToMode(window.location.hash));
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function closeModal() {
    setModal(null);
    if (window.location.hash === "#login" || window.location.hash === "#signup") {
      history.replaceState(null, "", window.location.pathname);
    }
  }

  if (!modal) return null;

  return (
    <AuthModal
      mode={modal}
      onClose={closeModal}
      onSwitch={() => setModal(modal === "login" ? "signup" : "login")}
    />
  );
}
