import { deleteCookie, getCookie } from "cookies-next";
import axios from 'axios';
import { toast } from "react-toastify";
import { StatusCode } from "@/constants/general";

export default async function API(method, endPoint, data) {
  return await axios({
    method: method,
    url: endPoint,
    headers: {
      Authorization: `Bearer ${getCookie('token')}`
    },
    data: data,
    params: data && data.params ? data.params : null
  })
}

export function handleError(error) {
  const status = error?.response?.status;
  const message = error?.response?.data?.message ? JSON.stringify(error.response.data.message).replaceAll('"', '').replaceAll('\\', '') : error?.message ? JSON.stringify(error?.message).replaceAll('"', '').replaceAll('\\', '') : null;

  if (status) {
    if (status === StatusCode.UnAuthorized) {
      if (message) {
        toast.error(message);
      } else {
        toast.error('Session expired.');
      }
      deleteCookie('token')
      deleteCookie('userData')
      window.location.href = '/login';
    } else if (message) {
      toast.error(message);
    } else {
      toast.error('Something went wrong.');
    }
  } else {
    toast.error('Something went wrong.');
  }
}

export function handleSuccess(response) {
  if ((response?.status === 200 || response?.status === 201 || response?.status === 202) && response?.data?.message) {
    toast.success(response?.data?.message);
  }
}