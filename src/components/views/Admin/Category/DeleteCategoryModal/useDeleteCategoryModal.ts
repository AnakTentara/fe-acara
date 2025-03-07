import { ToasterContext } from "@/contexts/ToasterContexts";
import categoryServices from "@/services/category.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteCategoryModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteCategory = async (id: string) => {
    const res = await categoryServices.deleteCategory(id);
    return res;
  };

  const {
    mutate: mutateDeleteCategory,
    isPending: isPendingMutateDeleteCategory,
    isSuccess: isSuccessMutateDeleteCategory,
  } = useMutation({
    mutationFn: deleteCategory,
    onError: (error) => {
      setToaster({
        message: "Error Deleting Category",
        type: "error",
      });
    },
    onSuccess: () => {
      setToaster({
        message: "Success Deleting Category",
        type: "success",
      });
    },
  });

  return {
    mutateDeleteCategory,
    isPendingMutateDeleteCategory,
    isSuccessMutateDeleteCategory,
  };
};

export default useDeleteCategoryModal;
