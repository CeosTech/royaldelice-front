import { createSlice } from "@reduxjs/toolkit";

// *  Writing the Slices

//+ createSlice returns a "slice" object that contains the generated reducer function as a field named reducer,
//+ and the generated action creators inside an object called actions.
export const basketsSlice = createSlice({
  name: "baskets",
  initialState: [],
  reducers: {
    incrementQauntite: (state, action) => {
      const productIdx = state.findIndex(
        (product) => product.nom === action.payload.nom
      );
      if (productIdx !== -1) {
        for (let i = 0; i < state[productIdx]?.supplementSelected.length; i++) {
          let obj = JSON.parse(state[productIdx].supplementSelected[i])
          console.log((obj.prix_supplement / state[productIdx].quantite) * (state[productIdx].quantite + 1))
          obj.prix_supplement = (obj.prix_supplement / state[productIdx].quantite) * (state[productIdx].quantite + 1)
          state[productIdx].supplementSelected[i] = JSON.stringify(obj)
        }
        state[productIdx].quantite++;
      }
    },
    decrementQauntite: (state, action) => {
      const productIdx = state.findIndex(
        (product) => product.nom === action.payload.nom
      );

      if (productIdx !== -1) {
        if (state[productIdx].quantite === 1) {
          state.splice(productIdx, 1);
        } else {
          for(let i = 0; i < state[productIdx].supplementSelected.length ; i++){
            let obj =  JSON.parse(state[productIdx].supplementSelected[i])
            console.log(obj.prix_supplement * (state[productIdx].quantite - 1) /(state[productIdx].quantite))
            obj.prix_supplement = (obj.prix_supplement * (state[productIdx].quantite - 1) /(state[productIdx].quantite))
            state[productIdx].supplementSelected[i] = JSON.stringify(obj)
          }
          state[productIdx].quantite--;
        }
      }
    },

    deleteProduct: (state, action) => {
      const productIdx = state.findIndex(
        (product) => product.nom === action.payload.nom
      );
      state.splice(productIdx, 1);
    },

    addProduct: (state, action) => {
      state.push(action.payload);
      // const productIdx = state.findIndex(
      //   (product) => product.nom === action.payload.nom
      // );
      // if (productIdx !== -1) {
      //   // const quantite = state[productIdx].quantite + action.payload.quantite;
      //   // state.splice(productIdx, 1, {
      //   //   ...action.payload,
      //   //   quantite,
      //   // });
      //   const product = state[productIdx];
      //   product.quantite += action.payload.quantite;
      // } else {
      //   state.push(action.payload);
      // }
    },

    addMenu: (state, action) => {
      state.push(action.payload)
    },

    emptyBasket: (state) => {
      state.length = 0;
    },
  },
});

//+ generated action creator functions :return an object with payload and type
export const {
  addMenu,
  incrementQauntite,
  decrementQauntite,
  incrementByAmount,
  deleteProduct,
  addProduct,
  emptyBasket,
} = basketsSlice.actions;

// useSelector(state => state.baskets) :returns the state for baskets
export const selectBaskets = (state) => state.baskets;

// + the generated reducer function
export default basketsSlice.reducer;