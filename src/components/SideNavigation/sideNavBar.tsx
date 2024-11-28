import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
<<<<<<< Updated upstream
import { AppProvider, Navigation, Router} from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
=======
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation,type Session, Router } from '@toolpad/core/AppProvider';
import {ThemeSwitcher,type SidebarFooterProps, DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import Notification from './Notification';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { createTheme, useColorScheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Popover from '@mui/material/Popover';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CustomToolbarActions from './CustomToolbarActions';

>>>>>>> Stashed changes


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
     
  function SidebarFooter({ mini }: SidebarFooterProps) {
    return (
      <Typography
        variant="caption"
        sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
      >
        {mini ? '© MUI' : `© ${new Date().getFullYear()} Made with love by MUI`}
      </Typography>
    );
  }
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
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
<<<<<<< Updated upstream
      <DashboardLayout>
=======
      {/* <Notification /> */}
      <DashboardLayout pathname={router.pathname}
      slots={{
        toolbarActions: CustomToolbarActions,
        sidebarFooter: SidebarFooter,
      }}
      >
      
        {/* <PageContainer>
          <Grid container spacing={1}>
            <Grid size={5} />
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={4}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={8}>
              <Skeleton height={100} />
            </Grid>

            <Grid size={12}>
              <Skeleton height={150} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>

            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
          </Grid>
        </PageContainer> */}
        
>>>>>>> Stashed changes
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