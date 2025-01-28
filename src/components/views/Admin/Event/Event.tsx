import DataTable from "@/components/ui/DataTable";
import { Chip, Tooltip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_EVENT } from "./Event.constants";
import { FiDelete, FiEye } from "react-icons/fi";
import useEvent from "./useEvent";
import useChangeUrl from "@/hooks/useChangeUrl";
import Actions from "@/components/commons/Actions";

const Event = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    refetchEvent,
    selectedId,
    setSelectedId,
  } = useEvent();

  const addEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];
      switch (columnKey) {
        case "banner":
          return (
            <Image
              className="aspect-video w-36 rounded-2xl object-cover"
              src={`${cellValue}`}
              alt="banner"
              width={200}
              height={100}
            />
          );
          case "isPublish":
            return (
              <Chip color={cellValue ? "success" : "warning"} size="sm" variant="flat">
                {cellValue === true ? "Published" : "Not Published"}
              </Chip>
            );
        case "actions":
          return (
            <Actions
              onClickDetail={() => push(`/admin/event/${event._id}`)}
              onClickDelete={() => {
                setSelectedId(`${event._id}`);
                deleteEventModal.onOpen();
              }}
            />
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
          buttonTopContentLabel="Create Event"
          columns={COLUMN_LIST_EVENT}
          data={dataEvents?.data || []}
          emptyContent="Event is Empty"
          isLoading={isLoadingEvents || isRefetchingEvents}
          renderCell={renderCell}
          //onClickButtonTopContent={addCategoryModal.onOpen}
          totalPages={dataEvents?.pagination.totalPages}
        />
      )}
    </section>
  );
};

export default Event;
