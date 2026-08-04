const Product = require("../../models/product.model");
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelpers(req.query);
  const ojectSearch = searchHelpers(req.query);

  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  if (ojectSearch.regex) {
    find.title = ojectSearch.regex;
  }

  // Pagination
  const countProducts = await Product.countDocuments(find);

  let ojectPagination = paginationHelpers(
    {
      currentPage: 1,
      limitItem: 10,
    },
    req.query,
    countProducts,
  );

  // End Pagination

  const products = await Product.find(find)
    .limit(ojectPagination.limitItem)
    .skip(ojectPagination.skip);

  // 4. Render dữ liệu ra file Pug
  res.render("admin/pages/products/index", {
    pageTitle: "Quản Lý Sản Phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: ojectSearch.keyword,
    pagination: ojectPagination,
  });
};

// [GET] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  res.redirect("/admin/products");
};
