import { expect, describe, test } from "@jest/globals";
import FluentSQLBuilder from "./src/fluentesql";

const data = [
  {
    id: 0,
    name: "thiagoturim",
    category: "developer",
  },
  {
    id: 1,
    name: "francisco",
    category: "developer",
  },
  {
    id: 2,
    name: "isabel",
    category: "manager",
  },
];

describe("Test suite for FlentSQL Builder", () => {
  test("#for should return a FluentBuilder instance", () => {
    const result = FluentSQLBuilder.for(data);
    const expected = new FluentSQLBuilder({ database: data });
    expect(result).toStrictEqual(expected);
  });

  test("#build should return the empty object instance", () => {
    const result = FluentSQLBuilder.for(data).build();
    const expected = data;
    expect(result).toStrictEqual(expected);
  });
  test("#limit given a collection if should limiit results", () => {
    const result = FluentSQLBuilder.for(data).limit(1).build();
    const expected = [data[0]];
    expect(result).toStrictEqual(expected);
  });
  test("#where given a collection if should filter data", () => {
    const result = FluentSQLBuilder.for(data)
      .where({ category: /ˆdev/ })
      .build();
    const expected = data.filter(
      ({ category }) => category.slice(3, 0) === "dev"
    );
    expect(result).toStrictEqual(expected);
  });
  test("#select given a collection if should return only scpecific fields", () => {
    const result = FluentSQLBuilder.for(data)
      .select(["name", "category"])
      .build();
    const expected = data.map(({ name, category }) => ({ name, category }));
    expect(result).toStrictEqual(expected);
  });
  test("#orderBy given a collection it should order results by field", () => {
    const result = FluentSQLBuilder.for(data).orderBy("name").build();

    const expected = [
      {
        id: 1,
        name: "francisco",
        category: "developer",
      },
      {
        id: 2,
        name: "isabel",
        category: "manager",
      },
      {
        id: 0,
        name: "thiagoturim",
        category: "developer",
      },
    ];

    expect(result).toStrictEqual(expected);
  });
  test.todo("pipeline");
});
