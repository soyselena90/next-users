import fetchData from "@/config/http";

const initialState = {
   users: null,
   selected: null,
   loading: true,
   error: null,
};

export const initStore = (initialState) => {
   return create((set) => ({
      ...initialState,
      fetch: () =>
         fetchData
            .getData("getusers")
            .then((result) => {
               set({ users: result });
            })
            .then(() => set({ loading: false }))
            .catch((err) => set({ error: err })),
   }));
};

export const ContxtStore = create((set) => ({
   users: null,
   selected: null,
   loading: true,
   error: null,

   fetch: () =>
      fetchData
         .getData("getusers")
         .then((result) => {
            set({ users: result });
         })
         .then(() => set({ loading: false }))
         .catch((err) => set({ error: err })),
}));
