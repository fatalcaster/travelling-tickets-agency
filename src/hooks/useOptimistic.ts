import { revalidatePath } from "next/cache";
import { useState } from "react";

export function useOptimisticState<T>(initial: T) {
  const [state, setState] = useState(initial);
  const [optimistic, setOptimistic] = useState(initial);

  const updateState = async (
    optimisticValue: (prev: T) => T,
    trueValue: (prev: T) => Promise<T>
  ) => {
    setOptimistic((prev) => {
      trueValue(prev)
        .then((data) => {
          setState(data);
          setOptimistic(data);
        })
        .catch((e) => {
          console.log(e);
          setOptimistic(prev);
        });
      return optimisticValue(prev);
    });
  };

  return [optimistic, updateState] as const;
}
