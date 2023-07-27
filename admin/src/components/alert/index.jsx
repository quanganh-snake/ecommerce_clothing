import Swal from "sweetalert2";

function Alert({ name, icon }) {
  return Swal.fire({
    title: name,
    icon: icon,
    position: "top-right",
    toast: true,
    showConfirmButton: false,
  });
}

export { Alert };
