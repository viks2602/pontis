import { Box, Grid, Typography } from '@mui/material'
import CustomCard from '../../../../../components/UI/card/Card'
import { globalCss } from "../../../../../styles/muiCss";
import WifiIcon from '@mui/icons-material/Wifi';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PowerIcon from '@mui/icons-material/Power';
import ErrorsServerDataTable from '../../../../../components/tables/ErrorsServerDataTable';
import { BorderLinearProgress } from '../../../../../components/progressbar/BorderLinearProgressBar';
const commonTitleTypographyStyle = {
    fontSize: { xl: "14px" },
    color: "#979797",
  };
  const commonValueTypographyStyle = {
    fontSize: { xl: "16px" },
    color: "black",
  };
const ServerData = ({singleserverData}) => {
    console.log(singleserverData, "singleServerData in server data component");
   const  PingIconColor = singleserverData?.data?.status?.ping?.responding == true ? "#49C354" : "#FD6162" ;
   const PortsIconColor ="";
   const TransactionsIconColor = "";


   const averageRespondingPing_Ports = (singleserverData?.data?.status?.ping_port?.reduce((acc, item) => acc + (item.responding ? 1 : 0), 0) / singleserverData?.data?.status?.ping_port?.length) * 100;
   const averageRespondingPercentage = `${averageRespondingPing_Ports}%`;

   console.log(averageRespondingPercentage, "averageResponding");
   
  return (
     <CustomCard
            sx={[
              {
                ...globalCss.widgetCardContainer,
                ...globalCss.cardBorderColorCss,
                ...globalCss.hideScrollBarCss,
              },
              { p: "10px", height: "640px", overflow: "auto" },
            ]}
          >
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              <Box>
                <Box>
                  <Typography
                    fontSize={{ xl: "20px", sm: "18px" }}
                    fontWeight={500}
                  >
                    CPU
                  </Typography>
                </Box>
                <Box>
                  <Grid container spacing={2} mt={0}>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}> Percent Used </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                       {singleserverData?.data?.cpu?.percent_used ? singleserverData?.data?.cpu?.percent_used : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Data Collection Interval</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.cpu?.data_collection?.interval ? singleserverData?.data?.cpu?.data_collection?.interval : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Collection Health </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.cpu?.data_collection?.collection_health ? singleserverData?.data?.cpu?.data_collection?.collection_health : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Total Success </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.cpu?.data_collection?.total_success ? singleserverData?.data?.cpu?.data_collection?.total_success : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}> Total Errors </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.cpu?.data_collection?.total_errors ? singleserverData?.data?.cpu?.data_collection?.total_errors : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Last Response Received </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.cpu?.data_collection?.last_response ? singleserverData?.data?.cpu?.data_collection?.last_response : "NA"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              <Box>
                <Box>
                  <Typography
                    fontSize={{ xl: "20px", sm: "18px" }}
                    fontWeight={500}
                  >
                    RAM
                  </Typography>
                </Box>
                <Box>
                  <Grid container spacing={2} mt={0}>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Percent Used</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.memory?.percent_used ? singleserverData?.data?.memory?.percent_used : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Data Collection Interval</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.memory?.data_collection?.interval ? singleserverData?.data?.memory?.data_collection?.interval : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Collection Health </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.memory?.data_collection?.collection_health ? singleserverData?.data?.memory?.data_collection?.collection_health : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Total Success</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.memory?.data_collection?.total_success ? singleserverData?.data?.memory?.data_collection?.total_success : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Total Errors</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.memory?.data_collection?.total_errors ? singleserverData?.data?.memory?.data_collection?.total_errors : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Last Response Received</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.memory?.data_collection?.last_response ? singleserverData?.data?.memory?.data_collection?.last_response : "NA"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              <Box>
                <Box>
                  <Typography
                    fontSize={{ xl: "20px", sm: "18px" }}
                    fontWeight={500}
                  >
                    Storage
                  </Typography>
                </Box>
                <Box>
                  <Grid container spacing={2} mt={0}>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}> Percent Used</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.disk?.percent_used ? singleserverData?.data?.disk?.percent_used : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}> Data Collection Interval</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.disk?.data_collection?.interval ? singleserverData?.data?.disk?.data_collection?.interval : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}> Collection Health</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.disk?.data_collection?.collection_health ? singleserverData?.data?.disk?.data_collection?.collection_health : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Total Success</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.disk?.data_collection?.total_success ? singleserverData?.data?.disk?.data_collection?.total_success : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Total Errors</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.disk?.data_collection?.total_errors ? singleserverData?.data?.disk?.data_collection?.total_errors : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Last Response Received</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.disk?.data_collection?.last_response ? singleserverData?.data?.disk?.data_collection?.last_response : "NA"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                
                <Box>
                  <Typography sx={commonTitleTypographyStyle}> Disks</Typography>
                  <Grid container spacing={2} mt={0}>

                   { singleserverData?.data?.disk?.items && singleserverData?.data?.disk?.items.map((data , index)=>{
                    return (
                      <Grid item xs={12} md={3} key={index}>
                        <Box display={'flex'} alignItems={'center'}>
                         <Typography sx={commonValueTypographyStyle}> {data.label}</Typography>{data.percent_used}
                        </Box>
                      <BorderLinearProgress 
                      variant="determinate"
                      value={data.percent_used}/>
                    </Grid>
                    )
                   })
                  }

                  </Grid>
                </Box>
              </Box>

              <Box>
                <Box>
                  <Typography
                    fontSize={{ xl: "20px", sm: "18px" }}
                    fontWeight={500}
                  >
                    Status
                  </Typography>
                </Box>
                <Box>
                  <Grid container spacing={2} mt={0}>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Percent Used</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.status?.percent_used ? singleserverData?.data?.status?.percent_used : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}> Data Collection Interval </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.status?.data_collection?.interval ? singleserverData?.data?.status?.data_collection?.interval : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Collection Health</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.status?.data_collection?.collection_health ? singleserverData?.data?.status?.data_collection?.collection_health : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Total Errors</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.status?.data_collection?.total_errors ? singleserverData?.data?.status?.data_collection?.total_errors : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Last Response Received</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.status?.data_collection?.last_response ? singleserverData?.data?.status?.data_collection?.last_response : "NA"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
             
             <CustomCard
                sx={[
                  {
                    ...globalCss.widgetCardContainer,
                    ...globalCss.cardBorderColorCss,
                    ...globalCss.hideScrollBarCss,
                  },
                  { p: "10px", height: "auto", overflow: "auto" },
                ]}
                >
                    <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            fontSize={{ xl: "20px", sm: "18px" }}
                            fontWeight={500}
                          >
                            Ping
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={2}><WifiIcon style={{color:`${PingIconColor}` ,height:80 , width:80}}/></Grid>
                                <Grid item xs={10}>
                                    <Grid container>
                                       <Grid item xs={12} md={6}>
                                        <Typography sx={commonTitleTypographyStyle}>Message </Typography>
                                        <Typography sx={commonValueTypographyStyle}>
                                        {singleserverData?.data?.status?.ping?.message ? singleserverData?.data?.status?.ping?.message : "NA"}
                                        </Typography>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                        <Typography sx={commonTitleTypographyStyle}>Response Code</Typography>
                                        <Typography sx={commonValueTypographyStyle}> 
                                        {singleserverData?.data?.status?.ping?.response_code ? singleserverData?.data?.status?.ping?.response_code : "NA"}
                                        </Typography>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                        <Typography sx={commonTitleTypographyStyle}>Response Message</Typography>
                                        <Typography sx={commonValueTypographyStyle}>
                                        {singleserverData?.data?.status?.ping?.response_message ? singleserverData?.data?.status?.ping?.response_message : "NA"}
                                        </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
              </CustomCard>


              <CustomCard
                sx={[
                  {
                    ...globalCss.widgetCardContainer,
                    ...globalCss.cardBorderColorCss,
                    ...globalCss.hideScrollBarCss,
                  },
                  { p: "10px", height: "auto", overflow: "auto" },
                ]}
                >
                    <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            fontSize={{ xl: "20px", sm: "18px" }}
                            fontWeight={500}
                          >
                            Ports
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={2}><PowerIcon style={{color:'red' ,height:80 , width:80}}/></Grid>
                               <Grid item xs={10}>
                               { singleserverData?.data?.status?.ping_port ? singleserverData?.data?.status?.ping_port.map((data,index)=>{ 
                                return (
                                 
                                  <Grid container key={index}>
                                  <Grid item xs={12} md={4}>
                                   <Typography sx={commonTitleTypographyStyle}>{data.name}</Typography>
                                   </Grid>
                                   <Grid item xs={12} md={4}>
                                   <Typography sx={commonTitleTypographyStyle}>Response Code</Typography>
                                   <Typography sx={commonValueTypographyStyle}>{data.response_code}  
                                   </Typography>
                                   </Grid>
                                   <Grid item xs={12} md={4}>
                                   <Typography sx={commonTitleTypographyStyle}>Message</Typography>
                                   <Typography sx={commonValueTypographyStyle}> 
                                   {data.message} </Typography>
                                   </Grid>
                                 </Grid> 
                                )
                               }) : <Grid container >
                               <Grid item xs={12} md={4}>
                                <Typography sx={commonTitleTypographyStyle}>Name</Typography>
                                <Typography sx={commonValueTypographyStyle}>NA
                                </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                <Typography sx={commonTitleTypographyStyle}>Response Code</Typography>
                                <Typography sx={commonValueTypographyStyle}>NA
                                </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                <Typography sx={commonTitleTypographyStyle}>Message</Typography>
                                <Typography sx={commonValueTypographyStyle}> 
                                NA </Typography>
                                </Grid>
                              </Grid>  }
                                  
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
              </CustomCard>


             <CustomCard
                sx={[
                  {
                    ...globalCss.widgetCardContainer,
                    ...globalCss.cardBorderColorCss,
                    ...globalCss.hideScrollBarCss,
                  },
                  { p: "10px", height: "auto", overflow: "auto" },
                ]}
                >
                    <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            fontSize={{ xl: "20px", sm: "18px" }}
                            fontWeight={500}
                          >
                            Transactions
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={2}><AccountBalanceIcon style={{color:'red' ,height:80 , width:80}}/></Grid>
                                 <Grid item xs={10}>
                                { singleserverData?.data?.status?.synthetic_transactions ? singleserverData?.data?.status?.synthetic_transactions.map((data,index)=>{
                                return (
                                  <Grid container key={index}>
                                  <Grid item xs={12} md={4}>
                                   <Typography sx={commonTitleTypographyStyle}>{data.name}</Typography>
                                   </Grid>
                                   <Grid item xs={12} md={4}>
                                   <Typography sx={commonTitleTypographyStyle}>Response Code</Typography>
                                   <Typography sx={commonValueTypographyStyle}>{data.response_code}  
                                   </Typography>
                                   </Grid>
                                   <Grid item xs={12} md={4}>
                                   <Typography sx={commonTitleTypographyStyle}>Message</Typography>
                                   <Typography sx={commonValueTypographyStyle}> 
                                   {data.message} </Typography>
                                   </Grid>
                               </Grid> 
                                )
                               }): 
                               <Grid container >
                               <Grid item xs={12} md={4}>
                                <Typography sx={commonTitleTypographyStyle}>Name</Typography>
                                <Typography sx={commonValueTypographyStyle}>NA  
                                </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                <Typography sx={commonTitleTypographyStyle}>Response Code</Typography>
                                <Typography sx={commonValueTypographyStyle}>NA  
                                </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                <Typography sx={commonTitleTypographyStyle}>Message</Typography>
                                <Typography sx={commonValueTypographyStyle}> NA </Typography>
                                </Grid>
                            </Grid> }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
              </CustomCard>


              <Box>
                <Box>
                  <Typography
                    fontSize={{ xl: "20px", sm: "18px" }}
                    fontWeight={500}
                  >
                    Errors
                  </Typography>
                </Box>
                <Box>
                  <Grid container spacing={2} mt={0}>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}> Collection Health</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.errors?.data_collection?.collection_health ? singleserverData?.data?.errors?.data_collection?.collection_health : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Data Collection Interval</Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.errors?.data_collection?.interval ? singleserverData?.data?.errors?.data_collection?.interval : 0}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Total Success </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.errors?.data_collection?.total_success ? singleserverData?.data?.errors?.data_collection?.total_success : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}> Total Errors </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.errors?.data_collection?.total_errors ? singleserverData?.data?.errors?.data_collection?.total_errors : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography sx={commonTitleTypographyStyle}>Last Response Received </Typography>
                      <Typography sx={commonValueTypographyStyle}>
                      {singleserverData?.data?.errors?.data_collection?.last_response ? singleserverData?.data?.errors?.data_collection?.last_response : "NA"}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography sx={commonTitleTypographyStyle}> Errors recieved</Typography>
                      <ErrorsServerDataTable errorsArray={singleserverData?.data?.errors?.items ? singleserverData?.data?.errors?.items : [] }/>
                    </Grid>
                  </Grid>
                </Box>
              </Box> 

            </Box>
          </CustomCard>
  )
}

export default ServerData