import Swal from "sweetalert2";

function getAccent() {
  if (typeof window === "undefined") return "#59839d";
  return getComputedStyle(document.documentElement)
    .getPropertyValue("--color-accent").trim() || "#59839d";
}

function base() {
  return {
    confirmButtonColor: getAccent(),
    cancelButtonColor:  "#6b7280",
    customClass: {
      confirmButton: "!font-semibold !rounded-full !px-6 !text-sm !text-white",
      cancelButton:  "!font-semibold !rounded-full !px-6 !text-sm",
      popup:         "!rounded-2xl",
      title:         "!text-lg !font-bold !text-black",
      htmlContainer: "!text-sm !text-gray-500",
    },
  };
}

export const swal = {
  async confirmDelete(itemName = "this item") {
    const result = await Swal.fire({
      ...base(),
      title:             "Delete?",
      html:              `Permanently delete <strong>${itemName}</strong>? This cannot be undone.`,
      icon:              "warning",
      showCancelButton:  true,
      confirmButtonText: "Delete",
      cancelButtonText:  "Cancel",
      reverseButtons:    true,
    });
    return result.isConfirmed;
  },

  success(message) {
    Swal.fire({
      ...base(),
      toast:             true,
      position:          "top-end",
      icon:              "success",
      title:             message,
      showConfirmButton: false,
      timer:             2500,
      timerProgressBar:  true,
    });
  },

  error(message) {
    Swal.fire({
      ...base(),
      toast:             true,
      position:          "top-end",
      icon:              "error",
      title:             message,
      showConfirmButton: false,
      timer:             3000,
      timerProgressBar:  true,
    });
  },
};
