import { ToasterContext } from "@/contexts/ToasterContexts";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import useIconTab from "./IconTab/useIconTab";
import useInfoTab from "./InfoTab/useInfoTab";

const useDetailCategory = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);
  const { resetUpdateIcon } = useIconTab();
  const { resetUpdateInfo } = useInfoTab();

  const updateCategory = async (payload: ICategory) => {
    const { data } = await categoryServices.updateCategory(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateCategory,
    isPending: isPendingMutateUpdateCategory,
    isSuccess: isSuccessMutateUpdateCategory,
  } = useMutation({
    mutationFn: (payload: ICategory) => updateCategory(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchCategory();
      resetUpdateIcon();
      resetUpdateInfo();
      setToaster({
        type: "success",
        message: "Success Update Category",
      });
    },
  });

  const handleUpdateCategory = (data: ICategory) => mutateUpdateCategory(data);

  const getCategoryById = async (id: string) => {
    const { data } = await categoryServices.getCategoryById(id);
    return data.data;
  };

  const { data: dataCategory, refetch: refetchCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: () => getCategoryById(`${query.id}`),
    enabled: isReady,
  });

  return {
    dataCategory,

    handleUpdateCategory,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  };
};

export default useDetailCategory;
