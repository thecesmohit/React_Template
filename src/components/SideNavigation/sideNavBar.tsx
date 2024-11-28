import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider, Navigation,type Session, Router } from '@toolpad/core/AppProvider';
import {type SidebarFooterProps, DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

import CustomToolbarActions from './CustomToolbarActions';
import { Button } from '@mui/material';
import BasicCard from '../ErrorPage/BaiscCard';
import { Outlet } from 'react-router';



const NAVIGATION: Navigation = [
//   {
//     kind: 'header',
//     title: 'Main items',
//   },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
//   {
//     kind: 'header',
//     title: 'Analytics',
//   },
  {
    segment: 'Card',
    title: 'Card',
    icon: <DashboardIcon />,
  },
  {
    segment: 'screen2',
    title: 'Screen2',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'leave',
        title: 'Leave',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'vaccation',
        title: 'Vaccation',
        icon: <DescriptionIcon />,
      },
    ],
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}


export default function DashboardLayoutBasic(props: any) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');
  
  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;
  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: 'Bharat Kashyap',
      email: 'bharatkashyap@outlook.com',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'Bharat Kashyap',
            email: 'bharatkashyap@outlook.com',
            image: 'https://avatars.githubusercontent.com/u/19550456',
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);
     
  // function SidebarFooter({ mini }: SidebarFooterProps) {
  //   return (
  //     <Typography
  //       variant="caption"
  //       sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
  //     >
  //       {mini ? '© MUI' : `© ${new Date().getFullYear()} Made with love by MUI`}
  //     </Typography>
  //   );
  // }
  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      branding={{
        logo: (<div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%", // Adjust as needed
            height: "100%", // Adjust as needed
          }}
        >
          <img
            src="GenericTemplateLogo.jpg"
            alt="Gen logo"
            style={{
              width:"30px",
              height:"30px",
            }}
          />
        </div>),
        title: 'Generic Template',
      }}
      //router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      {/* <Notification /> */}
      <DashboardLayout pathname={router.pathname}
        slots={{
          toolbarActions: CustomToolbarActions,
          //sidebarFooter: SidebarFooter,
        }}
      >
        <Outlet/>
      </DashboardLayout>
    </AppProvider>
  );
}

/**
 <MuiBox sx={{ display: "flex", minHeight: "100vh" }}>
        <AppBar position="fixed" >
            <MuiToolbar
            variant="dense"
            //className="tw-bg-slate-800"
            style={{ "padding": "8", "backgroundColor": "white"}}
            >
            <MuiIconButton
                color="inherit"
                aria-label="open drawer"
                //onClick={handleDrawerOpen}
                edge="start"
                sx={{ ml: 0.2 }}
            >
                <MenuIcon style={{"color":"black"}}/>
            </MuiIconButton>
            <MuiTypography variant="h6" style={{ flexGrow: 1 }}>
                <img
                alt="Logo"
                style={{ height: "12px", marginRight: "8px" }}
                />
            </MuiTypography>
            <MuiBox sx={{ display: "flex" }}>
                <Notification path={location.pathname} />
                <MuiIconButton disabled>
                    <AccountCircle/>
                </MuiIconButton>
            </MuiBox>
            </MuiToolbar>
        </AppBar>
    </MuiBox>
 */