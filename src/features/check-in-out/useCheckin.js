import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "check-in",
        isPaid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} succesfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("There was an error while cheked in"),
  });
  return { checkin, isCheckingIn };
}

export default useCheckin;
