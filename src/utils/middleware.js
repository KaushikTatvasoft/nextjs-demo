import { pageSize } from "@/constants/general";
import API, { handleError, handleSuccess } from "@/lib/common";
import { Actions } from "@/redux/actions";
import { Store } from "@/redux/configureStore";
import { getCookie } from "cookies-next";
import { faChevronDown, faChevronUp, faSort } from '@fortawesome/free-solid-svg-icons';

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

export const getCart = (page, activeSort, sortOrder, search) => {
  const userId = getCookie('userData') ? JSON.parse(getCookie('userData'))?.userId : null;

  Store.dispatch({ type: Actions.User.SetLoading, payload: true })
  const params = {
    ...(!!search ? { search } : {}),
    ...(!!activeSort ? { activeSort } : {}),
    ...(!!sortOrder ? { sortOrder } : {}),
    ...(!!page ? { page, 'pageSize': pageSize } : {}),
  }
  API('GET', `api/carts/${userId}`, { params })
    .then((res) => {
      handleSuccess(res)
      Store.dispatch({ type: Actions.User.SetLoading, payload: false })
      Store.dispatch({ type: Actions.Carts.SetCarts, payload: res.data.data || [] })
      Store.dispatch({ type: Actions.Carts.SetTotalPage, payload: res.data.count || 0 })
      let products = []
      if (res.data.data?.length) {
        res.data.data.forEach(cart => {
          if (!cart.completed) {
            products = cart?.products.reduce((result, item) => {
              result[item.productId] = item.quantity;
              return result;
            }, {});
          }
        })
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

export const createOrder = (products, page) => {
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
    .then(() => getCart(page)).catch(err => {
      Store.dispatch({ type: Actions.User.SetLoading, payload: false })
      handleError(err)
    })
};

export const getOrder = (page, activeSort, sortOrder, search) => {
  const userId = getCookie('userData') ? JSON.parse(getCookie('userData'))?.userId : null;

  // Make the API call using the updated state
  Store.dispatch({ type: Actions.User.SetLoading, payload: true })
  const params = {
    ...(!!search ? { search } : {}),
    ...(!!activeSort ? { activeSort } : {}),
    ...(!!sortOrder ? { sortOrder } : {}),
    ...(!!page ? { page, 'pageSize': pageSize } : {}),
  }
  API('GET', `api/orders/${userId}`, { params }).then((res) => {
    handleSuccess(res)
    Store.dispatch({ type: Actions.User.SetLoading, payload: false })
    Store.dispatch({ type: Actions.Orders.SetOrders, payload: res.data.data || [] })
    Store.dispatch({ type: Actions.Orders.SetTotalPage, payload: res.data.count || 0 })
  }).catch(err => {
    Store.dispatch({ type: Actions.User.SetLoading, payload: false })
    handleError(err)
  })
};

export const getCategories = (page, activeSort, sortOrder, search) => {
  Store.dispatch({ type: Actions.User.SetLoading, payload: true })
  const params = {
    ...(!!search ? { search } : {}),
    ...(!!activeSort ? { activeSort } : {}),
    ...(!!sortOrder ? { sortOrder } : {}),
    ...(!!page ? { page, 'pageSize': pageSize } : {}),
  }
  API('GET', "/api/categories", { params })
    .then((res) => {
      handleSuccess(res)
      Store.dispatch({ type: Actions.User.SetLoading, payload: false })
      if (res?.data?.data?.length) {
        Store.dispatch({ type: Actions.Categories.SetCategories, payload: res.data.data || [] })
        Store.dispatch({ type: Actions.Categories.SetTotalPage, payload: res.data.count || 0 })
      }
    }).catch(err => {
      Store.dispatch({ type: Actions.User.SetLoading, payload: false })
      handleError(err)
    })
}

export const handleSortColumn = (param, activeSort, sortOrder, route) => {
  let paramSortOrder = ''
  if (param) {
    if (activeSort !== param) {
      paramSortOrder = 'ASC';
    } else {
      paramSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
    }
  }
  Store.dispatch({ type: Actions[route].SetActiveSort, payload: param });
  Store.dispatch({ type: Actions[route].SetSortOrder, payload: paramSortOrder });
}

export const sortIcon = (activeSort, currentSort, sortOrder) => {
  return activeSort === currentSort ? sortOrder === "ASC" ? faChevronDown : faChevronUp : faSort
}