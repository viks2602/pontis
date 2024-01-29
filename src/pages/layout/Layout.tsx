import * as React from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import Toolbar from "@mui/material/Toolbar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";

import MenuIcon from "@mui/icons-material/Menu";

import { dashboardData, setDashboardList, setFilteredDashboardList } from "../../redux/slice/dashboardSlice";
import { Colors } from "../../theme/customTheme";
import { getSessionStorageData } from "../../common/helperFunctions";

import { DashboardIcon } from "../../assets/icons/DashboardIcon";
import { nycLogo } from "../../assets/images";

import Profile from "../../components/UI/profile/Profile";
import { configurationSubMenu } from "../../data/constants";

let drawerWidth = 220;

interface Props {
  window?: () => Window;
}

interface IDashboard {
  name: string
  id: string
  icon: string
  show: boolean
  type: string
}

function Layout(props: Props) {
  const { window } = props;
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const {dashboardId} = useParams();

  const dispatch = useDispatch();  
  const { filteredDashboards } = useSelector(dashboardData);

  const isDesktop = useMediaQuery(theme.breakpoints.up('xl'));
  const isLaptop = useMediaQuery(theme.breakpoints.up('md'));

  if(isDesktop){
    drawerWidth = 300
  }else if(isLaptop){
    drawerWidth = 220
  }

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeDashboardItem, setActiveDashboardItem] = React.useState<number>(0);
  const [activeConfigurationItem, setActiveConfigurationItem] = React.useState<number>(-1);
  const [activeCard, setActiveCard] = React.useState('dashboard');

  React.useEffect(()=>{
    
    if((location.pathname.endsWith('/dashboard/') || location.pathname.endsWith('/dashboard')) && filteredDashboards){
      navigate(`/dashboard/${filteredDashboards[0]?.id}`);
    }
  },[filteredDashboards, location]);

  React.useEffect(()=>{

    const activeCard = sessionStorage.getItem('main-card-menu')!;
    const activeSubMenu = sessionStorage.getItem('active-dashboard-menu')!;

    if(filteredDashboards && activeCard === 'dashboard'){

      const activeSubmenuId = dashboardId ?? activeSubMenu?.split('_')[1] ;
      const index = filteredDashboards?.findIndex((item: IDashboard)=>item.id === activeSubmenuId);

      setActiveCard('dashboard'); // active card
      setActiveConfigurationItem(-1); // set configuration sub menu -1
      setActiveDashboardItem(index);

    }else if(activeCard === "configuration"){

      const pathname = location.pathname.split('/')[3];
      const activeSubmenuId = activeSubMenu?.split('_')[1] ?? pathname;
      const index = configurationSubMenu?.findIndex((item)=>item.href === activeSubmenuId);

      setActiveCard('configuration'); // active card
      setActiveDashboardItem(-1);
      setActiveConfigurationItem(index);

    }
  },[filteredDashboards, dashboardId, location.pathname])

  // use effect for set dashboards list in side bar
  React.useEffect(()=>{

    dispatch(setDashboardList(JSON.parse(sessionStorage.getItem('dashboardData')!)))
    dispatch(setFilteredDashboardList(JSON.parse(sessionStorage.getItem('dashboardData')!)));

  },[]);

  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDashboardItemClick = (index: number) => {
    setActiveDashboardItem(index);
  };

  const handleConfigurationItemClick = (index: number) => {
    setActiveConfigurationItem(index);
  };

  const setActiveMenuItem = (cardType:"configuration" | 'dashboard', index: number, data: any ) => {
    if(cardType === 'dashboard'){
      setActiveCard('dashboard'); // active card
      sessionStorage.setItem('active-dashboard-menu', `dashboard_${data.id}`)
      sessionStorage.setItem('main-card-menu', 'dashboard'); // set in local storage active card
      setActiveConfigurationItem(-1); // set configuration sub menu -1
      handleDashboardItemClick(index); // setting dashboard submenu to selected index
      return 0;
    }else if( cardType === 'configuration'){
      setActiveCard('configuration')
      sessionStorage.setItem('active-dashboard-menu', `configuration_${data.href}`)
      sessionStorage.setItem('main-card-menu', 'configuration');
      setActiveDashboardItem(-1);
      handleConfigurationItemClick(index);
      return 1;
    }
  }

  const drawer = (
    <Box>
      <Toolbar sx={{ height: "90px", alignItems: "start" }}>
        <Box pt={2} pl={4}>
          <img src={nycLogo} alt='logo'/>
        </Box>
      </Toolbar>
      <Box
        minHeight="calc(100vh - 112px)"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pb:2
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={{ xl: "40px", xs: "26px" }}
        >
          <Card
            sx={{
              width: "70%",
              display: "flex",
              // bgcolor: "#DCEEFF",
              bgcolor: activeCard === "dashboard" ? "#DCEEFF" : "transparent",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "none",
              transition:'all',
              cursor:'pointer'
            }}
          >
            <Box width="100%" display={'flex'} gap={1} alignItems='start' >
              <Box
                display="flex"
                alignItems="center"
                gap={"12px"}
                sx={{
                  cursor: "pointer",
                }}
              >
                <DashboardIcon sx={{ height: "30px", width: "30px" }} />
              </Box>
              <Box>
                <Typography color={"#369fff"} fontSize={20} fontWeight={500}>
                  Dashboards
                </Typography>
                <Box display="flex" justifyContent="start">
                  <Box
                    mt={2}
                    display='flex' 
                    flexDirection='column'
                    gap={{xl:2, sm:1}}
                  >
                    {filteredDashboards?.map((data: IDashboard, index: number) => {
                      return (
                        <Box
                          className="tab-stack"
                          key={data.id}
                          draggable={false}
                          onClick={() => {
                            setActiveMenuItem('dashboard', index, data);
                          }}
                          sx={{
                            wordWrap:'break-word',
                            padding: 0,
                            color: activeDashboardItem === index ? "#369fff" : "inherit",
                            textDecoration:'none'
                          }}
                          component={Link}
                          to={`${data.id ?? "#"}`}
                        >
                          <Typography fontSize={{xl:'16px', sm:'14px'}}>{data.name}</Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
          <Card
            sx={{
              width: "70%",
              display: "flex",
              // bgcolor: "#DCEEFF",
              bgcolor: activeCard === "configuration" ? "#DCEEFF" : "transparent",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "none",
              transition:'all',
              cursor:'pointer'
            }}
          >
            <Box width="100%" display={'flex'} gap={1} alignItems='start' >
              <Box
                display="flex"
                alignItems="center"
                gap={"12px"}
                sx={{
                  cursor: "pointer",
                }}
              >
                <DashboardIcon sx={{ height: "30px", width: "30px" }} />
              </Box>
              <Box>
                <Typography color={"#369fff"} fontSize={18} fontWeight={500}>
                  Configuration
                </Typography>
                <Box display="flex" justifyContent="start">
                  <Box
                    mt={2}
                    display='flex' 
                    flexDirection='column'
                    gap={{xl:2, sm:1}}
                  >
                    {configurationSubMenu?.map((menuItem, index: number) => {
                      return (
                        <Box
                          className="tab-stack"
                          key={menuItem.href}
                          draggable={false}
                          onClick={() => {
                            setActiveMenuItem('configuration', index, menuItem);
                          }}
                          sx={{
                            wordWrap:'break-word',
                            padding: 0,
                            color: activeConfigurationItem === index ? "#369fff" : "inherit",
                            textDecoration:'none'
                          }}
                          component={Link}
                          to={`configuration/${menuItem.href}`}
                        >
                          <Typography fontSize={{xl:'16px', sm:'14px'}}>{menuItem.label}</Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
          {/* <Box
            width="70%"
            display="flex"
            alignItems="center"
            gap={"12px"}
            sx={{
              cursor: "pointer",
            }}
          >
            <MonitoringIcon />
            <Typography  color={"#369fff"}  fontSize={20} fontWeight={500}>
              Monitoring
            </Typography>
          </Box> */}
        </Box>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
      <Box
        className="layout-container"
        sx={{ display: { xs: "initial", md: "flex" } }}
      >
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            padding: "10px 0px 10px 0px",
            backgroundColor: Colors.white,
            color: "#000",
            boxShadow:'5px 4px 9px 1px rgba(147, 203, 255, 0.14)'
          }}
        >
          <Toolbar
            className="navbar-toolbar"
            sx={{
              height: { xs: "56px", sm: "64px" },
              width: "100%",
            }}
          >
            <Box
              width="100vw"
              paddingX={"30px"}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { md: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Box>
                  <Typography fontSize={{xl:'34px', md:'28px', xs:'24px'}} fontWeight={600} noWrap component="div">
                    Hello! {getSessionStorageData()?.fullName}
                  </Typography>
                  <Typography noWrap fontSize={'16px'} component="div">
                    Welcome Back
                  </Typography>
                </Box>
              </Stack>

              {/* RIGHT OPTIONS */}
              <Box display={"flex"} gap={"8px"} alignItems={'center'}>
                <Profile/>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
          className='drawer-container'
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                backgroundColor: "#F2F9FF",
                border: "none",
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth})` } }}
        >
          <Toolbar
            sx={{
              height: { xs: "76px", sm: "84px" },
            }}
          />
          <Box sx={{minHeight:{xs:`calc(100vh - 76px)`, sm: `calc(100vh - 84px)`}}}>
            <Outlet />
          </Box>
        </Box>
      </Box>
  );
}

export default Layout;
