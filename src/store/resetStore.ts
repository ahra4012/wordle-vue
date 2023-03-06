import { cloneDeep } from "lodash";
import type { StoreGeneric } from "pinia";

// export default function resetStore({ store }: { store: StoreGeneric }) {
//   const initialState = structuredClone(store.$state);
//   store.$reset = () => store.$patch(structuredClone(initialState));
// }
export default function resetStore({ store }: { store: StoreGeneric }) {
  const initialState = cloneDeep(store.$state);
  store.$reset = () => store.$patch(cloneDeep(initialState));
}
