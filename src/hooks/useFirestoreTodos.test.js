import { renderHook, act } from "@testing-library/react-hooks";
import { useFirestoreTodos } from "./useFirestoreTodos";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

jest.mock("firebase/firestore");

describe("useFirestoreTodos", () => {
  const user = { uid: "12345" };
  const mockDB = {};
  const mockCollection = {};

  beforeEach(() => {
    getFirestore.mockReturnValue(mockDB);
    collection.mockReturnValue(mockCollection);
    onSnapshot.mockImplementation((_, callback) => callback({ docs: [] }));
    doc.mockReturnValue({});
  });

  it("should initialize todos, onlineUsers, and offlineUsers with empty arrays", () => {
    const { result } = renderHook(() => useFirestoreTodos(user));
    expect(result.current.todos).toEqual([]);
    expect(result.current.onlineUsers).toEqual([]);
    expect(result.current.offlineUsers).toEqual([]);
  });

  it("should handle lockTodo", async () => {
    const { result } = renderHook(() => useFirestoreTodos(user));
    await act(() => result.current.lockTodo("todoId"));
    expect(updateDoc).toHaveBeenCalledWith(
      {},
      { locked: true, lastChangedBy: user.uid }
    );
  });

  it("should handle unlockTodo", async () => {
    const { result } = renderHook(() => useFirestoreTodos(user));
    await act(() => result.current.unlockTodo("todoId"));
    expect(updateDoc).toHaveBeenCalledWith(
      {},
      { locked: false, lastChangedBy: user.uid }
    );
  });

  it("should handle deleteTodo", async () => {
    const { result } = renderHook(() => useFirestoreTodos(user));
    await act(() => result.current.deleteTodo("todoId"));
    expect(deleteDoc).toHaveBeenCalledWith({});
  });

  it("should handle addTodoToDatabase", async () => {
    const { result } = renderHook(() => useFirestoreTodos(user));
    const newTodo = { title: "New Todo" };
    await act(() => result.current.addTodoToDatabase(newTodo));
    expect(addDoc).toHaveBeenCalledWith(mockCollection, newTodo);
  });

  it("should handle updateTodoInDatabase", async () => {
    const { result } = renderHook(() => useFirestoreTodos(user));
    const updatedTodo = { id: "todoId", title: "Updated Todo" };
    await act(() => result.current.updateTodoInDatabase(updatedTodo));
    expect(updateDoc).toHaveBeenCalledWith({}, updatedTodo);
  });

  it("should handle revertState", async () => {
    const { result } = renderHook(() => useFirestoreTodos(user));
    await act(() => result.current.revertState("todoId"));
    expect(updateDoc).toHaveBeenCalledWith({}, { state: "to do" });
  });

  it('should handle updateState for "to do" state', async () => {
    const { result } = renderHook(() => useFirestoreTodos(user));
    await act(() => result.current.updateState("todoId", "to do"));
    expect(updateDoc).toHaveBeenCalledWith({}, { state: "in progress" });
  });

  it('should handle updateState for "in progress" state', async () => {
    const { result } = renderHook(() => useFirestoreTodos(user));
    await act(() => result.current.updateState("todoId", "in progress"));
    expect(updateDoc).toHaveBeenCalledWith({}, { state: "done" });
  });

  it("should handle handleBeforeUnload", async () => {
    const { result } = renderHook(() => useFirestoreTodos(user));
    await act(() => result.current.handleBeforeUnload());
    expect(updateDoc).toHaveBeenCalledWith({}, { online: false });
  });

  it("should handle updateUserStatus for online status", async () => {
    const { result } = renderHook(() => useFirestoreTodos(user));
    await act(() => result.current.updateUserStatus(user, true));
    expect(updateDoc).toHaveBeenCalledWith({}, { online: true });
  });

  it("should handle updateUserStatus for offline status", async () => {
    const { result } = renderHook(() => useFirestoreTodos(user));
    await act(() => result.current.updateUserStatus(user, false));
    expect(updateDoc).toHaveBeenCalledWith({}, { online: false });
  });
});
