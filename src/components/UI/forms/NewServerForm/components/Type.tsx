import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { MuiChipsInput } from "mui-chips-input";
import { getSystemInfraOSTypeData } from "../../../../../redux/slice/systemInfraOSTypesData";
import { useSelector } from "react-redux";
import { getSystemInfraSupportSoftwareData } from "../../../../../redux/slice/systemInfraSupportedSoftwareSlice";

type Props = {};

const ProductsChips = ({
  selectedProducts,
  setSelectedProducts,
  products,
}: any) => {
  const { setFieldValue, errors, touched, setFieldTouched } =
    useFormikContext<any>();
  const handleChipClick = (label, id) => {
    const existingProductIndex = selectedProducts.findIndex(
      (product: any) => product.id === id
    );

    if (existingProductIndex !== -1) {
      // If the product is already selected, remove it
      setSelectedProducts((prevSelected: any) =>
        prevSelected.filter((item: any) => item.id !== id)
      );
    } else {
      // If the product is not selected, add it
      setSelectedProducts((prevSelected: any) => [
        ...prevSelected,
        { id, label },
      ]);
    }
  };

  useEffect(() => {
    setFieldValue("products", selectedProducts);
  }, [selectedProducts]);

  return (
    <Box display={"flex"} gap={2} sx={{ flexWrap: "wrap" }} my={1}>
      {products &&
        products.map((data: any, key: number) => {
          const isSelected = selectedProducts.some(
            (product: any) => product.id === data.id
          );
          return (
            <Chip
              key={key}
              label={data.name}
              clickable
              onClick={() => handleChipClick(data.label, data.id)}
              sx={{
                color: isSelected ? "white" : "#51abff",
                backgroundColor: isSelected ? "primary" : "white",
                border: "1px solid #51abff",
                "&:hover": "none",
              }}
              color={isSelected ? "primary" : "default"}
            />
          );
        })}
    </Box>
  );
};
const Type = (props: Props) => {
  const [chipValue, setChipValue] = useState<string[]>([]);
  const [products, setProducts] = useState([]);
  const [typeData, setTypeData] = useState<any>([]);

  const {
    isLoadingSupportSoftware,
    errorSupportSoftware,
    systemSupportSoftware,
  } = useSelector(getSystemInfraSupportSoftwareData);
  const { handleChange, submitForm, touched, errors, values, setFieldValue } =
    useFormikContext<any>();
  const { isLoadingOSType, errorOSType, systemInfraOSTypeData } = useSelector(
    getSystemInfraOSTypeData
  );
  const [selectedProducts, setSelectedProducts] = React.useState<any[]>(
    values.products
  );

  const [selectedProductsId, setSelectedProductsId] = React.useState<string[]>(
    values.productsId
  );

  const chipHandleChange = (newValue: string[]) => {
    setChipValue(newValue);
  };

  useEffect(() => {
    setFieldValue("products", chipValue);
  }, [chipValue]);

  useEffect(() => {
    setChipValue(values.products.length > 0 ? values.products : []);

    console.log(values.type)
    console.log(systemInfraOSTypeData)
    if (values.type && systemInfraOSTypeData) {
      const typeData = systemInfraOSTypeData.infrastructure_os_types.filter(
        (data: any) => data.label === values.type
      );
      setTypeData({
        id: typeData[0].id,
        label: typeData[0].label,
        type: typeData[0].type,
      });
      setFieldValue("serverTypeId", typeData[0].id);
      setFieldValue("serverTypeType", typeData[0].type);

    }
  }, [systemInfraOSTypeData,values.type]);

  useEffect(() => {
    if (systemSupportSoftware.infrastructure_supported_software) {
      const filteredProducts =
        systemSupportSoftware.infrastructure_supported_software.filter(
          (data: any) =>
            data.id === typeData.id ||
            (data.appliances && data.appliances.includes(typeData.id)) ||
            (data.os_types && data.os_types.includes(typeData.id))
        );

      setProducts(filteredProducts);
    }
  }, [typeData]);

  return (
    <>
      {!isLoadingOSType && !isLoadingSupportSoftware && (
        <Box display={"flex"} flexDirection={"column"} gap={3}>
          <FormControl sx={{ mt: 2 }}>
            <label style={{ color: "#979797" }}>Type</label>
            <Select
              name="type"
              value={values.type}
              onChange={handleChange}
              displayEmpty
              error={Boolean(errors.type && touched.type)}
              variant="outlined"
            >
              {systemInfraOSTypeData &&
                systemInfraOSTypeData.infrastructure_os_types.map(
                  (data: any, key: number) => (
                    <MenuItem
                      onClick={() => {
                        setTypeData({
                          id: data.id,
                          label: data.label,
                          type: data.type,
                        });
                      }}
                      key={key}
                      value={`${data.label}`}
                    >{`${data.type} (${data.label})`}</MenuItem>
                  )
                )}
            </Select>
            <FormHelperText sx={{ color: "error.main" }}>
              {errors.type && touched.type && String(errors.type)}
            </FormHelperText>
          </FormControl>

          {products && products.length > 0 && (
            <FormControl>
              <label style={{ color: "#979797" }}>Products</label>
              <ProductsChips
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                products={products}
              />

              <FormHelperText sx={{ color: "error.main" }}>
                {errors.products && touched.products && String(errors.products)}
              </FormHelperText>

              <label style={{ color: "#979797" }}>
                This Determines the how system details will be displayed
              </label>
            </FormControl>
          )}

          <FormControl>
            <label style={{ color: "#979797" }}>Server Role</label>
            <TextField
              name="serverRole"
              value={values.serverRole}
              onChange={handleChange}
              error={Boolean(errors.serverRole && touched.serverRole)}
              helperText={
                errors.serverRole &&
                touched.serverRole &&
                String(errors.serverRole)
              }
              type="text"
              size="small"
            />

            <label style={{ color: "#979797" }}>
              When there are multiple load balanced or clustered servers for a
              specific product, only s single “Primary” server will be queried
              for data. Be sure to set other servers as “Secondary” to avoid
              redundant queries.
            </label>
          </FormControl>
        </Box>
      )}
    </>
  );
};
export default Type;
