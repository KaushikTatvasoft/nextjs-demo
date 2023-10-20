import API, { handleError, handleSuccess } from "@/lib/common";
import { Actions } from "@/redux/actions";
import { Store } from "@/redux/configureStore";
import { getCookie } from "cookies-next";


export const getProducts = () => {
  Store.dispatch({ type: Actions.User.SetLoading, payload: true })
  API('GET', "/api/products")
    .then((res) => {
      handleSuccess(res)
      Store.dispatch({ type: Actions.User.SetLoading, payload: false })
      if (res?.data?.data?.length) {
        Store.dispatch({ type: Actions.User.SetProducts, payload: res.data.data || [] })
      }
    }).catch(err => {
      Store.dispatch({ type: Actions.User.SetLoading, payload: false })
      handleError(err)
    })
}

export const getCart = () => {
  const userId = getCookie('userData') ? JSON.parse(getCookie('userData'))?.userId : null;

  Store.dispatch({ type: Actions.User.SetLoading, payload: true })
  API('GET', `api/carts/${userId}`)
    .then((res) => {
      handleSuccess(res)
      Store.dispatch({ type: Actions.User.SetLoading, payload: false })
      let products = []
      if (res.data.data) {
        products = res.data.data?.products.reduce((result, item) => {
          result[item.productId] = item.quantity;
          return result;
        }, {});
      }
      Store.dispatch({ type: Actions.User.SetSelectedProducts, payload: products })
    }).catch(err => {
      Store.dispatch({ type: Actions.User.SetLoading, payload: false })
      handleError(err)
    })
};

export const updateCart = (previousProducts, productId, quantity) => {
  const userId = getCookie('userData') ? JSON.parse(getCookie('userData'))?.userId : null;
  const products = {
    ...previousProducts,
    [productId]: quantity,
  };

  // Make the API call using the updated state
  Store.dispatch({ type: Actions.User.SetLoading, payload: true })
  API('PUT', `api/carts/${userId}`, {
    date: new Date(),
    products: Object.keys(products).map((key) => ({
      productId: key,
      quantity: products[key],
    })),
  })
    .then(() => getCart()).catch(err => {
      Store.dispatch({ type: Actions.User.SetLoading, payload: false })
      handleError(err)
    })
};

export const createOrder = (products) => {
  const userId = getCookie('userData') ? JSON.parse(getCookie('userData'))?.userId : null;

  // Make the API call using the updated state
  Store.dispatch({ type: Actions.User.SetLoading, payload: true })
  API('POST', `api/orders/${userId}`, {
    date: new Date(), // Fix: Use a string for the date
    products: Object.keys(products).map((key) => ({
      productId: key,
      quantity: products[key],
    })),
  })
    .then(() => getOrder()).catch(err => {
      Store.dispatch({ type: Actions.User.SetLoading, payload: false })
      handleError(err)
    })
};

export const getOrder = () => {
  const userId = getCookie('userData') ? JSON.parse(getCookie('userData'))?.userId : null;

  // Make the API call using the updated state
  Store.dispatch({ type: Actions.User.SetLoading, payload: true })
  API('GET', `api/orders/${userId}`).then((res) => {
    handleSuccess(res)
    Store.dispatch({ type: Actions.User.SetOrders, payload: res.data.data || [] })
    Store.dispatch({ type: Actions.User.SetLoading, payload: false })
  }).catch(err => {
    Store.dispatch({ type: Actions.User.SetLoading, payload: false })
    handleError(err)
  })
};