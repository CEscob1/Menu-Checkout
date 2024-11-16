import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
    confirmedOrders: [] // Aquí almacenamos las órdenes confirmadas
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      state.totalAmount += newItem.price;
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalAmount += existingItem.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalAmount -= existingItem.price;
      } else if (existingItem && existingItem.quantity === 1) {
        state.totalAmount -= existingItem.price;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
    // Nueva acción para agregar una orden confirmada con un timestamp
    confirmOrder: (state, action) => {
      const order = {
        ...action.payload,
        timestamp: new Date().toISOString(),  // Se agrega un timestamp al momento de confirmar la orden
      };
      state.confirmedOrders.push(order);
    },
    // Acción para actualizar una orden
    updateOrder: (state, action) => {
      const updatedOrder = action.payload;
      const index = state.confirmedOrders.findIndex(order => order.orderID === updatedOrder.orderID);
      if (index !== -1) {
        state.confirmedOrders[index] = updatedOrder;  // Actualizamos la orden en el arreglo
      }
    }
  }
});

export const { 
  addItem, 
  removeItem, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart, 
  confirmOrder, 
  updateOrder 
} = cartSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  },
});