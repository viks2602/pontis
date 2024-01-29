import { SvgIcon, SvgIconProps } from "@mui/material";

export const BellOutlinedIcon: React.FunctionComponent<SvgIconProps> = (props) => {
    return (
      <SvgIcon {...props}>
       <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="mdi:bell-outline">
            <path id="Vector" d="M10.5718 20.1251H14.6329C14.6329 21.1792 13.7192 22.0417 12.6024 22.0417C11.4856 22.0417 10.5718 21.1792 10.5718 20.1251ZM21.7399 18.2084V19.1667H3.46484V18.2084L5.49541 16.2917V10.5417C5.49541 7.57091 7.52597 4.98341 10.5718 4.12091V3.83341C10.5718 2.77925 11.4856 1.91675 12.6024 1.91675C13.7192 1.91675 14.6329 2.77925 14.6329 3.83341V4.12091C17.6788 4.98341 19.7094 7.57091 19.7094 10.5417V16.2917L21.7399 18.2084ZM17.6788 10.5417C17.6788 7.85841 15.4452 5.75008 12.6024 5.75008C9.75959 5.75008 7.52597 7.85841 7.52597 10.5417V17.2501H17.6788V10.5417Z" fill="#374151"/>
            </g>
        </svg>
      </SvgIcon>
    );
  };