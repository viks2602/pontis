import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomCard from "../../../../components/UI/card/Card";
import { globalCss } from "../../../../styles/muiCss";
import CertificatesCard from "../../../../components/UI/card/CertificatesCard";
import SearchIcon from "@mui/icons-material/Search";
import CertificatesTable from "../../../../components/tables/CertificatesTable";
import { certificatesData } from "../../../../redux/slice/certificatesSlice";
import { useSelector } from "react-redux";
import React, { useCallback, useEffect } from "react";
import { constructKeyStoresServersDoughnutChartData } from "../../../../common/helperFunctions";
import DoughnutChart from "../../../../components/charts/doughnutChart/DoughnutChart";

const CertificatesPage = () => {
  const {
    isLoading,
    error,
    certificatesData: certificatesArray,
  } = useSelector(certificatesData);

  const dataServerCertificatesCount = certificatesArray?.certs.filter(
    (cert) => cert.product === "data"
  ).length;

  const productServerCertificatesCount = certificatesArray?.certs.filter(
    (cert) => cert.product !== "data"
  ).length;

  const totalIssuedCertificates = certificatesArray?.certs?.length;

  const [keystoresData, setKeystoresData] = React.useState<any>();
  const [keystoresDoughnutChartData, setKeystoresDoughnutChartData] =
    React.useState<any>();

  const getKeyStoresDataType = useCallback(() => {
    if (certificatesArray) {
      const typeCountMap: { [type: string]: number } = {
        ROOT: 0,
        AuthRoot: 0,
        CA: 0,
        RemoteDesktop: 0,
        Other: 0,
      };

      certificatesArray?.certs?.forEach((data: any) => {
        const keyStoreType = data.kdb;

        if (keyStoreType === "ROOT") {
          typeCountMap.ROOT += 1;
        } else if (keyStoreType === "AuthRoot") {
          typeCountMap.AuthRoot += 1;
        } else if (keyStoreType === "CA") {
          typeCountMap.CA += 1;
        } else if (keyStoreType === "Remote Desktop") {
          typeCountMap.RemoteDesktop += 1;
        } else {
          typeCountMap.Other += 1;
        }
      });
      const typesArray = Object.entries(typeCountMap).map(([type, count]) => ({
        type,
        count,
      }));
      setKeystoresData(typesArray);
    }
  }, [certificatesArray, keystoresData]);


  useEffect(() => {
    getKeyStoresDataType();
  }, [certificatesArray]);

  useEffect(() => {
    if (keystoresData) {
      const labels = keystoresData.map((data: any) => data.type);
      const backgroundColors = [
        "#b7b1f9",
        "#4cd4ff",
        "#76d27f",
        "#face60",
        "#FA6240",
      ];
      const text1 = "Keystores";
      const data = constructKeyStoresServersDoughnutChartData(
        keystoresData,
        labels,
        backgroundColors,
        text1
      );
      setKeystoresDoughnutChartData(data);
    }
  }, [keystoresData, certificatesArray]);

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          fontSize={{ xl: "30px", md: "24px", xs: "22px" }}
          mb={1}
          fontWeight={500}
        >
          Administrator Panel
        </Typography>
      </Box>
      <Grid container columnSpacing={2} direction={"column"}>
        <Grid item>
          <Box>
            <Typography fontSize={{ xl: "24px", sm: "20px", xs: "18px" }}>
              Certificates
            </Typography>
          </Box>
        </Grid>
        <Grid item mt={1}>
          <Grid container columnSpacing={2} height={"auto"}>
            <Grid item xs={12} md={9}>
              <Box>
                <CustomCard
                  sx={[{ ...globalCss.widgetCardContainer }, { p: "10px" }]}
                >
                  <CertificatesTable />
                </CustomCard>
              </Box>
            </Grid>
            <Grid item xs={12} md={3} sx={{ mt: { xs: 2, lg: 0 } }}>
              <Box
                height={"100%"}
                display={"flex"}
                flexDirection={"column"}
                gap={2}
              >
                <Box>
                  <CertificatesCard
                    type="productServer"
                    title="Data Server Certificates"
                    data={
                      dataServerCertificatesCount
                        ? dataServerCertificatesCount
                        : 0
                    }
                  />
                </Box>
                <Box>
                  <CertificatesCard
                    type="clarityServer"
                    title="Product Server Certificates"
                    data={
                      productServerCertificatesCount
                        ? productServerCertificatesCount
                        : 0
                    }
                  />
                </Box>
                <Box>
                  <CertificatesCard
                    type="totalServers"
                    title="Total Issued Certificates"
                    data={totalIssuedCertificates ? totalIssuedCertificates : 0}
                  />
                </Box>
                <Box>
                  <CustomCard
                    sx={[
                      globalCss.widgetCardContainer,
                      {
                        boxShadow: "15px 20px 40px -32px rgba(208,242,254,1)",
                        border: "2px solid #d0f2fe",
                      },
                    ]}
                  >
                    <Box px={2}>
                      <Tooltip title={"Keystores"}>
                        <Typography
                          width={"auto"}
                          className="text-overflow-ellipsis"
                          fontSize={{ xl: "18px", xs: "14px" }}
                          mr="8px"
                          mt={1}
                        >
                          Keystores for Data Servers
                        </Typography>
                      </Tooltip>
                      <Box>
                        {keystoresDoughnutChartData && (
                          <DoughnutChart data={keystoresDoughnutChartData} />
                        )}
                      </Box>
                    </Box>
                  </CustomCard>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CertificatesPage;
