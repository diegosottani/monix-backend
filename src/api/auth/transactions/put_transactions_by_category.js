import { supabase } from "../../../init.js";

export const put_transactions_by_category = async (req, res) => {
  try {
    const table = req.query.table;
    const currentCategory = req.query.currentCategory;
    const nextCategory = req.query.nextCategory;
    const currentSubcategory = req.query.currentSubcategory;
    const nextSubcategory = req.query.nextSubcategory;
    const updateObject = { 
      'category_id': nextCategory,
      'subcategory_id': nextSubcategory
    };

    Object.keys(updateObject).forEach(key => {
      if (updateObject[key] === undefined || updateObject[key] === null || updateObject[key] === "") {
        delete updateObject[key];
      }
    });

    let query = supabase
    .from(table)
    .update(updateObject)
    .eq("category_id", currentCategory)
    .eq("user_id", req.user.id);

    if (table === "expenses" && currentSubcategory && nextSubcategory) {
      query = query.eq("subcategory_id", currentSubcategory);
    }

    const { error } = await query;

    if (error) throw error;

    res.status(200).send("Transações atualizadas com sucesso");
  } catch (error) {
    console.error("Erro ao atualizar as transações destas categorias:", error);
    res.status(500).json({ error: "Erro ao atualizar as transações destas categorias" });
  }
};
