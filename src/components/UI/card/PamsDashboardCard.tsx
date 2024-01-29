import { Box, Typography } from '@mui/material'

import { globalCss } from '../../../styles/muiCss'

import { mapColorToPAMSCard, mapImageToPAMSCard } from '../../../common/helperFunctions'

import { downTrendImage, grayEllipseImage, upTrendImage } from '../../../assets/images'
import { UserCardIcon } from '../../../assets/icons/UserCardIcon'
import { RightArrowIcon } from '../../../assets/icons/RightArrowIcon'
import { SettingsIcon } from '../../../assets/icons/SettingIcon'

const PamsDashboardCard = ({cardData, index}: any) => {

    const renderIcon = (index: number) => {
        if( index === 0 ) {
            return <UserCardIcon sx={{fontSize:'5rem'}}/>
        }else if( index === 1 ) {
            return <RightArrowIcon sx={{fontSize:'5rem'}}/>
        }else if( index === 2 ) {
            return <SettingsIcon sx={{fontSize:'5rem'}}/>
        }
    }
  return (
    <Box 
        flex={1} 
        padding={2} 
        sx={globalCss.widgetCardContainer}
        position='relative'
        overflow='hidden'
        borderRadius={'12px'}
    >
        <Box display='flex' alignItems='center' position='relative' columnGap={2} height={'100%'} >
            <Box minWidth={'25%'} display={'flex'} alignItems='center' justifyContent='center' height={'100%'} bgcolor={mapColorToPAMSCard(index)} borderRadius={'0.9375rem 0rem 0rem 0.9375rem'}>
                {renderIcon(index)}
            </Box>
            <Box>
                <Typography color={'#374151'}>{cardData.name}</Typography>
                <Typography fontSize={'2.125rem'} fontWeight={600}>{cardData.number}</Typography>
                <Typography sx={{color: cardData.percent < 0 ? 'red' : 'green'}}>{cardData.percent}%</Typography>
            </Box>
            <Box component='img' src={ cardData.percent < 0 ? downTrendImage :upTrendImage} position='absolute' zIndex={10} top={0} right={0}/>
        </Box>
        <Box component='img' src={mapImageToPAMSCard(index)} position='absolute' zIndex={-1} bottom={0} right={0}/>
        <Box component='img' src={grayEllipseImage} position='absolute' zIndex={-1} top={8} right={0}/>
    </Box>
  )
}

export default PamsDashboardCard