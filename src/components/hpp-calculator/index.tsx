"use client";

import { useState } from "react";
import { RecipeInfo } from "./recipeInfo";
import { IngredientsList, Ingredient } from "./ingredientsList";
import { OverheadsList, Overhead } from "./overheadsList";
import { ProfitMargin } from "./profitMargin";
import { ResultsDashboard } from "./resultsDashboard";

export function HppCalculator() {
  const [recipeName, setRecipeName] = useState("");
  const [yieldAmount, setYieldAmount] = useState<number>(1);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [overheads, setOverheads] = useState<Overhead[]>([]);
  const [profitMargin, setProfitMargin] = useState<number>(40);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        id: crypto.randomUUID(),
        name: "",
        price: 0,
        buyAmount: 0,
        unit: "gram",
        usedAmount: 0,
      },
    ]);
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const updateIngredient = (
    id: string,
    field: keyof Ingredient,
    value: string | number,
  ) => {
    setIngredients(
      ingredients.map((ing) => {
        if (ing.id === id) return { ...ing, [field]: value };
        return ing;
      }),
    );
  };

  const addOverhead = () => {
    setOverheads([
      ...overheads,
      {
        id: crypto.randomUUID(),
        name: "",
        cost: 0,
      },
    ]);
  };

  const removeOverhead = (id: string) => {
    setOverheads(overheads.filter((oh) => oh.id !== id));
  };

  const updateOverhead = (
    id: string,
    field: keyof Overhead,
    value: string | number,
  ) => {
    setOverheads(
      overheads.map((oh) => {
        if (oh.id === id) return { ...oh, [field]: value };
        return oh;
      }),
    );
  };

  const resetData = () => {
    if (confirm("Apakah anda yakin ingin mereset semua data?")) {
      setRecipeName("");
      setYieldAmount(1);
      setIngredients([]);
      setOverheads([]);
      setProfitMargin(40);
    }
  };

  const calculateIngredientCost = (ing: Ingredient) => {
    if (ing.buyAmount <= 0) return 0;
    return (ing.price / ing.buyAmount) * ing.usedAmount;
  };

  const totalIngredientsCost = ingredients.reduce(
    (sum, ing) => sum + calculateIngredientCost(ing),
    0,
  );
  const totalOverheadCost = overheads.reduce((sum, oh) => sum + oh.cost, 0);

  const totalRecipeCost = totalIngredientsCost + totalOverheadCost;
  const cogsPerPortion = yieldAmount > 0 ? totalRecipeCost / yieldAmount : 0;
  const profitTarget = cogsPerPortion * (profitMargin / 100);
  const suggestedSellingPrice = cogsPerPortion + profitTarget;

  const formatRp = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start relative pb-32 lg:pb-0">
      <div className="w-full lg:w-2/3 space-y-6">
        <RecipeInfo
          recipeName={recipeName}
          setRecipeName={setRecipeName}
          yieldAmount={yieldAmount}
          setYieldAmount={setYieldAmount}
        />
        <IngredientsList
          ingredients={ingredients}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          updateIngredient={updateIngredient}
          calculateIngredientCost={calculateIngredientCost}
          totalIngredientsCost={totalIngredientsCost}
          formatRp={formatRp}
        />
        <OverheadsList
          overheads={overheads}
          addOverhead={addOverhead}
          removeOverhead={removeOverhead}
          updateOverhead={updateOverhead}
          totalOverheadCost={totalOverheadCost}
          formatRp={formatRp}
        />
        <ProfitMargin
          profitMargin={profitMargin}
          setProfitMargin={setProfitMargin}
        />
      </div>

      <ResultsDashboard
        resetData={resetData}
        totalRecipeCost={totalRecipeCost}
        yieldAmount={yieldAmount}
        cogsPerPortion={cogsPerPortion}
        profitMargin={profitMargin}
        profitTarget={profitTarget}
        suggestedSellingPrice={suggestedSellingPrice}
        formatRp={formatRp}
      />
    </div>
  );
}
