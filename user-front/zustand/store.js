import fetchData from "@/config/http";
import create from "zustand";
import { devtools } from "zustand/middleware";
// import { API_URL } from "../config";

// // const initialState = {
// //    users: null,
// //    selected: null,
// //    loading: true,
// //    error: null,
// // };

// // export const initStore = (initialState) => {
// //    return create((set) => ({
// //       ...initialState,
// //       fetch: () =>
// //          fetchData
// //             .getData("getusers")
// //             .then((result) => {
// //                set({ users: result });
// //             })
// //             .then(() => set({ loading: false }))
// //             .catch((err) => set({ error: err })),
// //    }));
// // };

// const store = create((set) => ({
//    // create your zustand store here
//    users: null,
//    selected: null,
//    loading: true,
//    error: null,

//    fetch: () =>
//       fetchData
//          .getData("getusers")
//          .then((result) => {
//             console.log("result: ", result);
//             set({ users: result });
//          })
//          .then(() => set({ loading: false }))
//          .catch((err) => set({ error: err })),

//    fetchSelectUserID: (id) => set({ selected: id }),
// }));

// export default store;

const store = devtools(
   (set) => ({
      // create your zustand store here
      users: null,
      selected: null,
      loading: true,
      error: null,

      fetch: () =>
         fetchData
            .getData("getusers")
            .then((result) => {
               console.log("result: ", result);
               set({ users: result });
            })
            .then(() => set({ loading: false }))
            .catch((err) => set({ error: err })),

      fetchSelectUserID: (id) => set({ selected: id }),
   }),
   "defaultStore"
);
const useDefaultStore = create(store);
export default useDefaultStore;
