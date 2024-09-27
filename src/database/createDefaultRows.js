import { supabase } from "../init.js";

export const createTypeExpenses = async (userID) => {
  try {
    const { data, error } = await supabase.from("type_expenses").insert({ user_id: userID });
    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error createTypeExpenses", err);
    throw err;
  }
};

export const createOtherIncomings = async (userID) => {
  try {
    const { data, error } = await supabase.from("categories").insert([
      { user_id: userID, type_category: "incoming", name: "Outras entradas" },
      { user_id: userID, type_category: "incoming", name: "Salário" },
      { user_id: userID, type_category: "incoming", name: "Receitas extras" },
      { user_id: userID, type_category: "incoming", name: "Diversos" },
    ]);
    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error createOtherIncomings", err);
    throw err;
  }
};

export const createOtherExpenses = async (userID) => {
  try {
    const { data: categories, error: categoryError } = await supabase
      .from("categories")
      .insert([
        { user_id: userID, type_category: "expense", name: "Outras despesas" },
        { user_id: userID, type_category: "expense", name: "Alimentação" },
        { user_id: userID, type_category: "expense", name: "Lazer" },
        { user_id: userID, type_category: "expense", name: "Transporte" },
        { user_id: userID, type_category: "expense", name: "Moradia" },
        { user_id: userID, type_category: "expense", name: "Pessoal" },
        { user_id: userID, type_category: "expense", name: "Saúde" },
      ])
      .select();

    if (categoryError) {
      throw categoryError;
    }

    const subcategories = categories
      .map((category) => {
        switch (category.name) {
          case "Outras despesas":
            return [
              { name: "Outras subcategorias de despesas", category_id: category.id }
            ];
          case "Alimentação":
            return [
              { name: "Mercado", category_id: category.id },
              { name: "Lanches", category_id: category.id },
              { name: "Delivery", category_id: category.id },
              { name: "Diversos", category_id: category.id },
            ];
          case "Lazer":
            return [
              { name: "Saídas", category_id: category.id },
              { name: "Restaurantes", category_id: category.id },
              { name: "Diversos", category_id: category.id },
            ];
          case "Transporte":
            return [
              { name: "Gasolina", category_id: category.id },
              { name: "Uber", category_id: category.id },
              { name: "Seguro", category_id: category.id },
              { name: "IPVA", category_id: category.id },
              { name: "Diversos", category_id: category.id },
            ];
          case "Moradia":
            return [
              { name: "Aluguel", category_id: category.id },
              { name: "Condomínio", category_id: category.id },
              { name: "Energia", category_id: category.id },
              { name: "Gás", category_id: category.id },
              { name: "Água", category_id: category.id },
              { name: "Internet", category_id: category.id },
            ];
          case "Pessoal":
            return [
              { name: "Assinaturas", category_id: category.id },
              { name: "Educação", category_id: category.id },
              { name: "Vestuário", category_id: category.id },
              { name: "Celular", category_id: category.id },
              { name: "Seguros", category_id: category.id },
              { name: "Diversos", category_id: category.id },
            ];
          case "Saúde":
            return [
              { name: "Farmácia", category_id: category.id },
              { name: "Esportes", category_id: category.id },
              { name: "Plano de saúde", category_id: category.id },
              { name: "Diversos", category_id: category.id },
            ];
          default:
            return null;
        }
      })
      .filter(subcategory => subcategory !== null)
      .flat();

    const { data: subcategoryData, error: subcategoryError } = await supabase
      .from("subcategories")
      .insert(subcategories);

    if (subcategoryError) {
      throw subcategoryError;
    }

    return { categories, subcategoryData };
  } catch (err) {
    console.error("Error createOtherExpenses", err);
    throw err;
  }
};

export const createOtherInvestments = async (userID) => {
  try {
    const { data: categories, error: categoryError } = await supabase
      .from("categories")
      .insert([
        { user_id: userID, type_category: "investment", name: "Outros investimentos" },
        { user_id: userID, type_category: "investment", name: "Curto Prazo" },
        { user_id: userID, type_category: "investment", name: "Médio Prazo" },
        { user_id: userID, type_category: "investment", name: "Longo Prazo" }
      ])
      .select();

    if (categoryError) {
      throw categoryError;
    }

    const subcategories = categories.map((category) => {
      switch (category.name) {
        case "Outros investimentos":
          return [
            { name: "Outras subcategorias de investimentos", category_id: category.id }
          ];
        case "Curto Prazo":
          return [
            { name: "Reserva de emergência", category_id: category.id },
          ];
        case "Médio Prazo":
          return [
            { name: "Reserva de oportunidade", category_id: category.id }
          ];
        case "Longo Prazo":
          return [
            { name: "Previdência privada", category_id: category.id },
          ];
        default:
          return [];
      }
    })
    .filter(subcategory => subcategory !== null)
    .flat();

    const { data: subcategoryData, error: subcategoryError } = await supabase
      .from("subcategories")
      .insert(subcategories);

    if (subcategoryError) {
      throw subcategoryError;
    }

    return { categories, subcategoryData };
  } catch (err) {
    console.error("Error createOtherInvestments", err);
    throw err;
  }
};

export const createOtherAccounts = async (userID) => {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .insert({ user_id: userID, name: "Outras contas" });
    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error createOtherAccounts", err);
    throw err;
  }
};

export const createOtherMembers = async (userID) => {
  try {
    const { data, error } = await supabase
      .from("members")
      .insert({ user_id: userID, name: "Outros membros" });
    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error createOtherMembers", err);
    throw err;
  }
};

export const createOtherCards = async (userID) => {
  try {
    const { data, error } = await supabase
      .from("cards")
      .insert({ user_id: userID, name: "Outros cartões" });
    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error createOtherCards", err);
    throw err;
  }
};
