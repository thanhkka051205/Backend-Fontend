import ProductTable from "../components/products/product.table";
import { useEffect, useState } from "react";
import { fetchAllProductAPI } from "../services/api.service";

const ProductPage = (props) => {
  const [dataProducts, setDataProducts] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadProduct();
  }, [current, pageSize]);

  const loadProduct = async () => {
    try {
      const res = await fetchAllProductAPI(
        `/api/v1/product?current=${current}&pageSize=${pageSize}`,
      );

      if (res && res.data) {
        setDataProducts(res.data.data || res.data.result || []);
        setTotal(res.data.total || res.meta?.total || 0);
      }
    } catch (error) {
      console.log("Lỗi khi load product:", error);
    }
  };

  return (
    <ProductTable
      dataProducts={dataProducts}
      current={current}
      pageSize={pageSize}
      total={total}
      setCurrent={setCurrent}
      setPageSize={setPageSize}
      loadProduct={loadProduct}
    />
  );
};

export default ProductPage;
