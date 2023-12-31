import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddTodoModal from "../../components//AddTodoModal";

jest.mock("../../hooks/useFirestoreTodos.js", () => ({
  useFirestoreTodos: () => ({
    addTodoToDatabase: jest.fn(),
    updateTodoInDatabase: jest.fn(),
  }),
}));

describe("AddTodoModal", () => {
  const props = {
    show: true,
    handleClose: jest.fn(),
    onlineUsers: [],
    offlineUsers: [],
    user: { uid: "123" },
    editing: false,
    todoToEdit: null,
  };

  it("should render correctly", () => {
    render(<AddTodoModal {...props} />);
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
  });

  it("should handle description change", () => {
    render(<AddTodoModal {...props} />);
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "New To Do" },
    });
    expect(screen.getByPlaceholderText("Description").value).toBe("New To Do");
  });
});
