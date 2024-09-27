import { supabase } from "../../../init.js";

export const get_transactions_by_category = async (req, res) => {
  try {
    const table = req.query.table;
    const category = req.query.category;
    const subcategory = req.query.subcategory;

    let query = supabase.from(table).select('*', { count: 'exact', head: true });
    query = query.eq("user_id", req.user.id).eq("category_id", category);

    if (table === 'expenses' && subcategory) {
      query = query.eq("subcategory_id", subcategory);
    }

    const { count, error } = await query;

    if (error) throw error;

    res.status(200).send({ total: count });
  } catch (error) {
    console.error("Erro ao recuperar quantidade de transações:", error);
    res.status(500).json({ error: "Erro ao recuperar quantidade de transações" });
  }
};
