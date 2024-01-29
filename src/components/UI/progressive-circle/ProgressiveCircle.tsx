import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export type Props = {
    value: number;
    title: string;
    primaryColor: string;
    secondaryColor: string;
};
const ProgressiveCircle = ({ value, primaryColor, secondaryColor, title }: Props) => {
  
  const SemiCircleProgress = styled.div`
    --percentage: ${value};
    --primary:${primaryColor};
    --secondary: ${secondaryColor};
    --size: 240px;
    width: 200px;
    animation: progress 1s 0.5s forwards;

    aspect-ratio: 2 / 1; // want it to be 2x wider than height
    position: relative;
    display: flex;
    align-items: flex-end; // text is at the bottom
    justify-content: center;

    @property --percentage {
      syntax: "<number>";
      inherits: true;
      initial-value: 0;
    }

    ::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: conic-gradient(
        from 0.75turn at 50% 100%,
        var(--primary) calc(var(--percentage) * 1% / 2),
        var(--secondary) calc(var(--percentage) * 1% / 2 + 0.1%)
      );
      mask: radial-gradient(at 50% 100%, white 55%, transparent 55.5%);
      mask-mode: alpha;
      -webkit-mask: radial-gradient(at 50% 100%, #0000 55%, #000 55.5%);
      -webkit-mask-mode: alpha;
      overflow: hidden;
      border-radius: 50% / 100% 100% 0 0; // only want the 1st and 4th quadrants
    }

    ::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      mask: radial-gradient(at 50% 100%, white 55%, transparent 55.5%);
      mask-mode: alpha;
      -webkit-mask: radial-gradient(at 50% 100%, #0000 55%, #000 55.5%);
      -webkit-mask-mode: alpha;
      overflow: hidden;
      border-radius: 50% / 100% 100% 0 0; // only want the 1st and 4th quadrants
    }

    @keyframes progress {
      0% {
        --percentage: 0;
      }
      100% {
        --percentage: ${({ value }:{value: number}) => value};
      }
    }
  `;

  return (
    <Box  position='relative'>
      <SemiCircleProgress
        role="progress"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        value={value}
      />
      <Box position={'absolute'} sx={{bottom:0, left:'50%', transform: 'translate(-50%, 0%)'}} >
        <Typography fontSize={'20px'} >{title}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressiveCircle;
