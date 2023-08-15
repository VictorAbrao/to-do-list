import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Filter from "./Filter"; // Ajuste o caminho de importação conforme necessário

describe("Filter", () => {
  const users = [
    { google_id: "123", first_name: "John", last_name: "Doe" },
    { google_id: "456", first_name: "Jane", last_name: "Smith" },
  ];

  const onFilterChange = jest.fn();

  it("renderiza corretamente", () => {
    const { getByLabelText, getByTestId } = render(
      <Filter onFilterChange={onFilterChange} users={users} />
    );

    expect(getByLabelText("Description:")).toBeInTheDocument();
    // Utilize getByTestId com um atributo data-testid que deve ser adicionado no componente
    expect(getByTestId("responsible-select")).toBeInTheDocument();
    expect(getByLabelText("Date:")).toBeInTheDocument();
    expect(getByLabelText("State:")).toBeInTheDocument();
  });

  it("chama onFilterChange na alteração do campo description", () => {
    const { getByLabelText } = render(
      <Filter onFilterChange={onFilterChange} users={users} />
    );
    fireEvent.change(getByLabelText("Description:"), {
      target: { value: "test description" },
    });

    expect(onFilterChange).toHaveBeenCalledWith(
      "description",
      "test description"
    );
  });

  // Você pode adicionar testes semelhantes para outros campos, se necessário
});
