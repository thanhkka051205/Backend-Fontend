const buttonChangStatus = document.querySelectorAll("[button-change-status]");

if (buttonChangStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonChangStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      let statusChange = statusCurrent === "active" ? "inactive" : "active";

      const action = path + `/${statusChange}/${id}`;
      console.log(action);
      console.log(id);
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}
