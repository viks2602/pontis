import {
  number_of_application_img,
  number_of_roles_img,
  roles_added_img,
  roles_removed_img,
  blueEllipseImage,
  de_provisionIcon,
  greenEllipseImage,
  provisionIcon,
  purpleEllipseImage,
  reactivationIcon,
  resetIcon,
  suspensionIcon,
} from "../assets/images";

export const mapIconToImageSource = (icon: string): string => {
  switch (icon) {
    case "provisions":
      return provisionIcon;
    case "deprovisions":
      return de_provisionIcon;
    case "suspensions":
      return suspensionIcon;
    case "reactivations":
      return reactivationIcon;
    case "resets":
      return resetIcon;
    default:
      return "defaultImage";
  }
};

export const mapImageToPAMSCard = (index: number): string => {
  switch (index) {
    case 0:
      return greenEllipseImage;
    case 1:
      return blueEllipseImage;
    case 2:
      return purpleEllipseImage;
    default:
      return purpleEllipseImage;
  }
};

export const mapColorToPAMSCard = (index: number): string => {
  switch (index) {
    case 0:
      return "rgba(147, 203, 255, 0.14)";
    case 1:
      return "rgba(119, 210, 127, 0.1)";
    case 2:
      return "#F7F7FF";
    default:
      return "#mapColorToPAMSCard";
  }
};

export const mapIconToRoleAndApplicationImage = (id: string): string => {
  switch (id) {
    case "numbers_of_applications":
      return number_of_application_img;
    case "numbers_of_roles":
      return number_of_roles_img;
    case "roles_added":
      return roles_added_img;
    case "roles_removed":
      return roles_removed_img;
    default:
      return "defaultImage";
  }
};

export const checkIsLessThan24hrs = (date1, date2) => {
  const differenceInMilliseconds = Math.abs(date2 - date1);
  const millisecondsIn24Hours = 24 * 60 * 60 * 1000;

  if (differenceInMilliseconds < millisecondsIn24Hours) {
    return true;
  } else {
    return false;
  }
};

interface DataItem {
  name: string;
  down_time: string;
  reason: string;
  status: string;
}

export const sortDownTimeArrayByStatus = (data: DataItem[]): DataItem[] => {
  const dataCopy = [...data];
  const sortedData = dataCopy.sort((a, b) => {
    const statusOrder: Record<string, number> = { down: 0, slow: 1, up: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return sortedData.slice(0, 6);
};

interface SessionStorageData {
  fullName: string;
  accessToken: string | null;
  userName: string;
}

export const getSessionStorageData = () => {
  const userDetails: SessionStorageData | null = JSON.parse(
    sessionStorage.getItem("userdetails")!
  );
  return userDetails;
};

export const getDownTimeCardColor = (color: string) => {
  if (color === "error") {
    return "error";
  } else if (color === "warning") {
    return "warning";
  } else if (color === "success") {
    return "success";
  } else {
    return "primary";
  }
};

export function templateAppliesToServer(serverObj: any, templateObj: any) {
  for (let i = 0; i < templateObj.software.length; i++) {
    if (serverObj.server_type) {
      for (
        let j = 0;
        j < serverObj.server_type.products_installed.length;
        j++
      ) {
        if (
          serverObj.server_type.products_installed[j].id.replaceAll("-", "_") ==
          templateObj.software[i]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

export  function groupAlertsByCategory(alerts) {
  return alerts.reduce((acc, alert) => {
    const { alertCategory } = alert;
    acc[alertCategory] = acc[alertCategory] || [];
    acc[alertCategory].push(alert);
    return acc;
  }, {});
}

export const constructUsersDoughnutChartData = (
  userGroupsCounts: any,
  labels: string[],
  totalGroups: number
) => {
  const backgroundColors = [
    "#b7b1f9",
    "#4cd4ff",
    "#76d27f",
    "#face60",
    "#f46240",
  ];
  const borderColor = backgroundColors;

  const datasets = [
    {
      label: "",
      data: labels.map((label) => userGroupsCounts[label]),
      backgroundColor: backgroundColors,
      borderColor: borderColor,
      cutout: "85%",
    },
  ];

  return {
    text_1: "Groups",
    text_2: "",
    totalTypes: totalGroups.toString(),
    labels: labels,
    datasets: datasets,
  };
};

export const constructServersDoughnutChartData = (
  serverTypes: any,
  labels: string[],
  backgroundColors: string[],
  text1: string
) => {
  const borderColor = backgroundColors;

  const datasets = [
    {
      label: "",
      data: serverTypes.map((server: any) => server.count),
      backgroundColor: backgroundColors,
      borderColor: borderColor,
      cutout: "85%",
    },
  ];

  return {
    text_1: text1,
    text_2: "",
    totalTypes: labels.length.toString(),
    labels: labels,
    datasets: datasets,
  };
};

export const constructKeyStoresServersDoughnutChartData = (
  keystoresData:any,
  labels: string[],
  backgroundColors: string[],
  text1: string
) =>{
  const borderColor = backgroundColors;
  const datasets = [
    {
      label: "",
      data: keystoresData.map((server: any) => server?.count),
      backgroundColor: backgroundColors,
      borderColor: borderColor,
      cutout: "85%",
    },
  ];

  return {
    text_1: text1,
    text_2: "",
    totalTypes: labels.length.toString(),
    labels: labels,
    datasets: datasets,
  };
}

export const customSearchTable = ( data : any, query : any) => {
  if (!query) {
    return data;
  }
 
  return data?.filter((item:any ) =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(query.toLowerCase())
    )
  );
}

export const isAllRespondingPingPort = (singleServerData:any) => {
  const respondingPortValues = singleServerData?.data?.status?.ping_port?.map(
    (pingPort: any) => pingPort?.responding
  );

  return respondingPortValues?.every((value) => value === true);
};

export const isAllRespondingTransactions = (singleServerData:any) => {
  const respondingValues =
    singleServerData?.data?.status?.synthetic_transactions?.map(
      (transactions: any) => transactions?.responding
    );

  return respondingValues?.every((value) => value === true);
};
export const constructDashboartTypeDoughnutChartData = (
  keystoresData:any,
  labels: string[],
  backgroundColors: string[],
  text1: string,
  text2: string
) =>{
  const borderColor = backgroundColors;
  const datasets = [
    {
      label: "",
      data: keystoresData.map((server: any) => server?.count),
      backgroundColor: backgroundColors,
      borderColor: borderColor,
      cutout: "85%",
    },
  ];

  return {
    text_1: text1,
    text_2: text2,
    totalTypes: labels.length.toString(),
    labels: labels,
    datasets: datasets,
  };
}