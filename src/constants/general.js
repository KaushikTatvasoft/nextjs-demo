export const StatusCode = {
  BadRequest: 400,
  UnAuthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  AlreadyExists: 409,
  InternalServerError: 500,
};

// Register Page
export const registrationInputFields = [
  { placeholderLeft: "Email", requiredLeft: true, fieldNameLeft: "email", placeholderRight: "Phone", requiredRight: true, inputTypeRight: 'number', fieldNameRight: "phone" },
  { placeholderLeft: "Password", requiredLeft: true, fieldNameLeft: "password", inputTypeLeft: "password", passwordIconLeft: true, requiredRight: true, placeholderRight: "Confirm password", fieldNameRight: "confirmPassword", inputTypeRight: "password", passwordIconRight: true },
  ]

export const SidebarTabs = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    // component: <Dashboard />,
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "ni ni-single-copy-04 text-primary",
    // component: <Orders />,
  },
  {
    path: "/carts",
    name: "Carts",
    icon: "ni ni-cart text-primary",
    // component: <Customers />,
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "ni ni-bullet-list-67 text-primary",
    // component: <Categories />,
  },
  {
    path: "/products",
    name: "Products",
    icon: "ni ni-box-2 text-primary",
    // component: <Products />,
  },
];