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

const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    currentPage,
    currentLimit,
    dataCategory,
    isRefetchingCategory,
    refetchCategory,
    isLoadingCategory,
    setURL,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
    selectedId,
    setSelectedId,
  } = useCategory();

  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setURL();
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
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                  <FiEye
                    key="detail-category-button"
                    onClick={() => push(`/admin/category/${category._id}`)}
                  />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete Category">
                <span className="cursor-pointer text-lg text-danger active:opacity-50">
                  <FiDelete
                    key="delete-category-button"
                    className="text-danger-500"
                    onClick={() => {
                      setSelectedId(`${category._id}`);
                      deleteCategoryModal.onOpen();
                    }}
                  />
                </span>
              </Tooltip>
            </div>
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
          currentPage={Number(currentPage)}
          data={dataCategory?.data || []}
          emptyContent="Category is Empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
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
