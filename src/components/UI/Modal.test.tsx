import { Modal } from "./Modal";
import { ConfigureStoreOptions } from "@reduxjs/toolkit";
import { createModalData, render, screen, fireEvent } from "testUtils";
import { configureStore, rootReducer as reducer } from "AppStore";
import { showModal } from "slices/modal";
import { ModalTypes } from "models/Modal";

const middleware: ConfigureStoreOptions["middleware"] = (
  getDefaultMiddleware
) =>
  getDefaultMiddleware({
    serializableCheck: false,
  });

let store = configureStore({
  reducer,
  middleware,
});

const setup = () => render(<Modal />, {}, { store, renderModal: false });

describe("Modal", () => {
  beforeEach(() => {
    store = configureStore({ reducer, middleware });
  });

  it("should render the component", () => {
    store.dispatch(showModal(createModalData()));
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should close modal when clicking on mask", async () => {
    store.dispatch(showModal(createModalData()));
    setup();
    fireEvent.click(screen.getByTestId("modal-mask"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shouldn't close modal when clicking on mask when maskClosable is false", () => {
    store.dispatch(
      showModal(
        createModalData({
          maskClosable: false,
        })
      )
    );
    setup();
    fireEvent.click(screen.getByTestId("modal-mask"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("shouldn't close modal when clicking on modal", () => {
    store.dispatch(showModal(createModalData()));
    setup();
    fireEvent.click(screen.getByRole("dialog"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should handle nested array of modalContentTrKeys", () => {
    store.dispatch(
      showModal(
        createModalData({
          modalContentTrKey: ["modalContentTrKey1", ["modalContentTrKey2"]],
        })
      )
    );
    setup();
    expect(screen.getByText("modalContentTrKey1")).toBeInTheDocument();
    expect(screen.getByText("modalContentTrKey2")).toBeInTheDocument();
  });

  it("should render custom modal component", () => {
    const CustomComponent = () => <div>CustomComponent</div>;
    store.dispatch(
      showModal(
        createModalData({
          ModalComponent: CustomComponent,
        })
      )
    );
    setup();
    expect(screen.getByText("CustomComponent")).toBeInTheDocument();
  });

  it("should render modal with html content", () => {
    store.dispatch(
      showModal(
        createModalData({
          modalHtml: "<div>modalHtml</div>",
        })
      )
    );
    setup();
    expect(screen.getByText("modalHtml")).toBeInTheDocument();
  });

  it("should show cancel button and close modal when clicked", () => {
    const onCancel = jest.fn();

    store.dispatch(
      showModal(
        createModalData({
          modalButtons: {
            confirm: { textTrKey: "OK" },
            cancel: { textTrKey: "cancel", onClick: onCancel },
          },
        })
      )
    );
    setup();
    fireEvent.click(screen.getByText("cancel"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should show confirm button and close modal when clicked", () => {
    const onConfirm = jest.fn();

    store.dispatch(
      showModal(
        createModalData({
          modalButtons: {
            confirm: { textTrKey: "OK", onClick: onConfirm },
            cancel: { textTrKey: "cancel" },
          },
        })
      )
    );
    setup();
    fireEvent.click(screen.getByText("OK"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("should render error modal type", () => {
    store.dispatch(
      showModal(
        createModalData({
          modalType: ModalTypes.danger,
        })
      )
    );
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
