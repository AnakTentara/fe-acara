import DataTable from "@/components/ui/DataTable";
import { Tooltip } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import { FiDelete, FiEye } from "react-icons/fi";
import LIMIT_LISTS from "@/constants/list.constants";

const Category = () => {
  const { push } = useRouter();
  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];
      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
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
    <section>
      <DataTable
        buttonTopContentLabel="Create Category"
        columns={COLUMN_LIST_CATEGORY}
        currentPage={1}
        data={[
          {
            _id: "123",
            name: "Category 1",
            description: "Description 1",
            icon: "/images/general/logo-black.png",
          },
        ]}
        emptyContent="Category is Empty"
        limit={LIMIT_LISTS[0].label}
        onChangeLimit={() => {}}
        onChangePage={() => {}}
        onChangeSearch={() => {}}
        onClearSearch={() => {}}
        renderCell={renderCell}
        onClickButtonTopContent={() => {}}
        totalPages={2}
      />
    </section>
  );
};

export default Category;
