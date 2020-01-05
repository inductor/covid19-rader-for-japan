import React, { useState, useEffect } from "react";
import { Divider, Drawer, createStyles, Theme } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import { useLoading } from "../../../common/hooks/useLoading";
import { LoadingState } from "../../../types";
import { useDispatch } from "react-redux";
import { signActions } from "../../../redux/saga/sign";
import { withRouter, RouteComponentProps, match } from "react-router";
import * as H from "history";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";

import SidebarNav from "../sidebar-nav";
import Profile from "../profile";
import { makeStyles } from "@material-ui/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex"
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            width: drawerWidth
        },
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3)
        }
    })
);

const DrawerContainer = styled(props => <div {...props} />)({
    width: props => (props.isHome === true ? 0 : drawerWidth)
});

interface Props {
    history: H.History;
    location: H.Location;
    match: match;
    isHome: boolean;
    onClose: () => void;
    open: boolean;
    variant: "permanent" | "persistent" | "temporary" | undefined;
}

const Sidebar: React.FC<Props> = props => {
    const { open, variant, onClose, history, isHome } = props;

    const mainPages = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: <DashboardIcon />
        },
        {
            title: "Create Trade",
            href: "/entry/new",
            icon: <PeopleIcon />
        },
        {
            title: "Calendar",
            href: "/calendar",
            icon: <PeopleIcon />
        },
        {
            title: "Report",
            href: "/report",
            icon: <PeopleIcon />
        },
        {
            title: "History",
            href: "/history",
            icon: <PeopleIcon />
        },
        {
            title: "Account",
            href: "/account",
            icon: <AccountBoxIcon />
        },
        {
            title: "Settings",
            href: "/settings",
            icon: <SettingsIcon />
        }
    ];

    const homePages = [
        {
            title: "Sign In",
            href: "/sign-in",
            icon: <SettingsIcon />
        },
        {
            title: "Sign Up",
            href: "/sign-up",
            icon: <SettingsIcon />
        }
    ];

    const dispatch = useDispatch();

    const callback = (nowLoading: boolean, finishLoading: boolean) => {
        if (nowLoading) {
            console.log("loading now");
        } else if (finishLoading) {
            console.log("finish loading");
            history.push("/");
        }
    };

    useLoading(LoadingState.SIGN_OUT, callback);

    const handleSignOut = () => {
        dispatch(signActions.signOutAction());
    };

    const signout = {
        title: "Sign Out",
        icon: <SettingsIcon />,
        handleSignOut: handleSignOut
    };

    return (
        <Drawer anchor="left" onClose={onClose} open={open} variant={variant}>
            {isHome ? (
                <DrawerContainer isHome={isHome}>
                    <Divider />
                    <SidebarNav
                        pages={homePages}
                        isHome={true}
                        signout={signout}
                        onClose={onClose}
                    />
                </DrawerContainer>
            ) : (
                <DrawerContainer isHome={isHome}>
                    <Profile />
                    <Divider />
                    <SidebarNav
                        isHome={false}
                        pages={mainPages}
                        signout={signout}
                        onClose={onClose}
                    />
                </DrawerContainer>
            )}
        </Drawer>
    );
};

export default withRouter(Sidebar);