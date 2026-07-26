import * as React from "react";

export interface ToastProps {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  type?: "default" | "destructive" | "success" | "warning" | "info";
  variant?: string;
  duration?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const TOAST_LIMIT = 20;
const TOAST_REMOVE_DELAY = 1000;

type ActionType = {
  ADD_TOAST: "ADD_TOAST";
  UPDATE_TOAST: "UPDATE_TOAST";
  DISMISS_TOAST: "DISMISS_TOAST";
  REMOVE_TOAST: "REMOVE_TOAST";
};

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type Action =
  | { type: "ADD_TOAST"; toast: ToastProps }
  | { type: "UPDATE_TOAST"; toast: ToastProps }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string };

interface State {
  toasts: ToastProps[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId === undefined) {
        return {
          ...state,
          toasts: state.toasts.map((t) => ({ ...t, open: false })),
        };
      }
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === toastId ? { ...t, open: false } : t)),
      };
    }
    case "REMOVE_TOAST": {
      const { toastId } = action;
      if (toastId === undefined) {
        return { ...state, toasts: [] };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== toastId),
      };
    }
  }
};

const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

export function toast(props: ToastProps) {
  const id = props.id || genId();

  if (props.duration !== Infinity) {
    const timeout = setTimeout(() => {
      dispatch({ type: "DISMISS_TOAST", toastId: id });
      setTimeout(() => {
        dispatch({ type: "REMOVE_TOAST", toastId: id });
      }, TOAST_REMOVE_DELAY);
      toastTimeouts.delete(id);
    }, props.duration || 5000);
    toastTimeouts.set(id, timeout);
  }

  const update = (updatedProps: ToastProps) => {
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...updatedProps, id },
    });
    return id;
  };

  const dismiss = () => {
    dispatch({ type: "DISMISS_TOAST", toastId: id });
    const timeout = toastTimeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      toastTimeouts.delete(id);
    }
    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", toastId: id });
    }, TOAST_REMOVE_DELAY);
  };

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
        props.onOpenChange?.(open);
      },
    },
  });

  return { id, dismiss, update };
}

toast.default = (props: ToastProps) => toast({ ...props, type: "default" });
toast.destructive = (props: ToastProps) => toast({ ...props, type: "destructive" });
toast.success = (props: ToastProps) => toast({ ...props, type: "success", variant: "success" });
toast.warning = (props: ToastProps) => toast({ ...props, type: "warning" });
toast.info = (props: ToastProps) => toast({ ...props, type: "info" });

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => {
      dispatch({ type: "DISMISS_TOAST", toastId });
      if (toastId) {
        const timeout = toastTimeouts.get(toastId);
        if (timeout) {
          clearTimeout(timeout);
          toastTimeouts.delete(toastId);
        }
        setTimeout(() => {
          dispatch({ type: "REMOVE_TOAST", toastId });
        }, TOAST_REMOVE_DELAY);
      }
    },
  };
}
