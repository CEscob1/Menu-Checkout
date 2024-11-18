import { configureStore, createSlice } from '@reduxjs/toolkit';

// Slice del carrito
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Ítems actuales en el carrito
    totalAmount: 0, // Total a pagar en el carrito
    confirmedOrders: [], // Órdenes confirmadas
    orderToEdit: null, // Orden seleccionada para editar
  },
  reducers: {
    // Acción para agregar un ítem al carrito
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      state.totalAmount += newItem.price;
    },
    // Acción para remover un ítem del carrito
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    // Acción para aumentar la cantidad de un ítem en el carrito
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalAmount += existingItem.price;
      }
    },
    // Acción para disminuir la cantidad de un ítem en el carrito
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalAmount -= existingItem.price;
      } else if (existingItem && existingItem.quantity === 1) {
        state.totalAmount -= existingItem.price;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    // Acción para limpiar el carrito
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
    // Acción para confirmar una orden
    confirmOrder: (state, action) => {
      const order = {
        ...action.payload,
        timestamp: new Date().toISOString(),
      };
      state.confirmedOrders.push(order);
    },
    // Acción para editar una orden confirmada
    updateOrder: (state, action) => {
      const updatedOrder = action.payload;
      const index = state.confirmedOrders.findIndex(
        (order) => order.orderID === updatedOrder.orderID
      );
      if (index !== -1) {
        state.confirmedOrders[index] = updatedOrder;
      }
    },
    // Acción para seleccionar una orden para editar
    setOrderToEdit: (state, action) => {
      const orderId = action.payload; // ID de la orden que se va a editar
      // Buscar la orden en confirmedOrders con el id proporcionado
      const orderToEdit = state.confirmedOrders.find(
        (order) => order.orderID === orderId
      );
      if (orderToEdit) {
        state.orderToEdit = orderToEdit; // Asigna la orden seleccionada para editar
      } else {
        state.orderToEdit = null; // Si no se encuentra la orden, se limpia el estado
      }
    },
    // Acción para aplicar los cambios a la orden editada
    applyEditToOrder: (state, action) => {
      const { orderID, updatedDetails } = action.payload;
      const index = state.confirmedOrders.findIndex(
        (order) => order.orderID === orderID
      );
      if (index !== -1) {
        // Actualiza los detalles de la orden
        state.confirmedOrders[index] = {
          ...state.confirmedOrders[index],
          ...updatedDetails,
        };
      }
      // Limpia la orden en edición después de aplicar los cambios
      state.orderToEdit = null;
    },
    // Acción para aumentar la cantidad de un ítem dentro de una orden editada
    increaseQuantityInOrder: (state, action) => {
      const { orderID, itemID } = action.payload;
      const order = state.confirmedOrders.find(order => order.orderID === orderID);
      if (order) {
        const item = order.items.find(item => item.id === itemID);
        if (item) {
          item.quantity += 1;
          order.totalAmount += item.price; // Ajustar el total de la orden
        }
      }
    },
    // Acción para disminuir la cantidad de un ítem dentro de una orden editada
    decreaseQuantityInOrder: (state, action) => {
      const { orderID, itemID } = action.payload;
      const order = state.confirmedOrders.find(order => order.orderID === orderID);
      if (order) {
        const item = order.items.find(item => item.id === itemID);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
          order.totalAmount -= item.price; // Ajustar el total de la orden
        } else if (item && item.quantity === 1) {
          order.items = order.items.filter(item => item.id !== itemID);
          order.totalAmount -= item.price; // Ajustar el total de la orden
        }
      }
    },
    // Acción para establecer los ítems del carrito desde un arreglo
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.totalAmount = action.payload.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    // Acción para limpiar la orden en edición
    clearOrderToEdit: (state) => {
      state.orderToEdit = null; // Limpia la orden seleccionada
    },
  },
});

// Exporta las acciones del slice
export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  confirmOrder,
  updateOrder,
  setCartItems,
  setOrderToEdit,
  clearOrderToEdit,
  applyEditToOrder,
  increaseQuantityInOrder,
  decreaseQuantityInOrder,
} = cartSlice.actions;

// Configuración del store
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});