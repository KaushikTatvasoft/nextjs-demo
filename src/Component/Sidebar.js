"use client"; // This is a client component 👈🏽"
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FolderIcon from "@mui/icons-material/Folder";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { Store } from "@/redux/configureStore";
import { Actions } from "@/redux/actions";

export default function Sidebar({ activeTab}) {
  const router = useRouter();

  const handleListItemClick = (index) => {
    Store.dispatch({ type : Actions.User.SetActiveTab, payload :index})
  };

  return (
    <>
      <div>
        <div className="text-2xl text-center">Demo</div>
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton
            selected={activeTab === 0}
            onClick={() => handleListItemClick(0)}
          >
            <ListItemIcon>
              <FeedIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
          <ListItemButton
            selected={activeTab === 1}
            onClick={() => handleListItemClick(1)}
          >
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
          <ListItemButton
            selected={activeTab === 2}
            onClick={() => handleListItemClick(2)}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItemButton>
        </List>
      </div>
      <div>
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton
            onClick={() => {
              router.push("/login")
              deleteCookie('token')
              deleteCookie('userData')
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </div>
    </>
  );
}
