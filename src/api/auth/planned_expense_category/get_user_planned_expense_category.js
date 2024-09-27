import { supabase } from "../../../init.js";

export const get_user_planned_expense_category = async (req, res) => {
  try {
    const planned_id = req.query.planned_id;
    const category_id = req.query.category;

    if (!planned_id || !category_id) {
      res.status(400).json({ error: 'É necessário informar todos os parâmetros' });
      return;
    }

    const { data, error } = await supabase
      .from("planned_expense_category")
      .select("id, value")
      .eq("planned_expense_id", planned_id)
      .eq("category_id", category_id);

    if (error) throw error;

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
