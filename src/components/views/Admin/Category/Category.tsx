import DataTable from "@/components/ui/DataTable";
import { Tooltip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import { FiDelete, FiEye } from "react-icons/fi";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import Actions from "@/components/commons/Actions";

const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataCategory,
    isRefetchingCategory,
    refetchCategory,
    isLoadingCategory,
    selectedId,
    setSelectedId,
  } = useCategory();

  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];
      switch (columnKey) {
        case "icon":
          return (
            <Image
              src={`${cellValue}`}
              alt="icon"
              className="rounded-2xl"
              width={100}
              height={200}
            />
          );
        case "actions":
          return (
            <Actions onClickDetail={() => {}} onClickDelete={() => {}} />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section className="rounded-xl bg-foreground-100 p-5">
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Category"
          columns={COLUMN_LIST_CATEGORY}
          data={dataCategory?.data || []}
          emptyContent="Category is Empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
          renderCell={renderCell}
          onClickButtonTopContent={addCategoryModal.onOpen}
          totalPages={dataCategory?.pagination.totalPages}
        />
      )}
      <AddCategoryModal
        refetchCategory={refetchCategory}
        {...addCategoryModal}
      />
      <DeleteCategoryModal
        refetchCategory={refetchCategory}
        {...deleteCategoryModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default Category;
