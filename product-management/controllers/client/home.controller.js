// [GET] /
module.exports.index = {
  index: (req, res) => {
    res.render("client/pages/home/index");
    pageTitle: "Trang chu";
  }
};